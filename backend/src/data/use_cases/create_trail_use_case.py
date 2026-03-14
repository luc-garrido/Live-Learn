import json
from typing import Any, Dict, List, Optional
from uuid import UUID

from src.errors import *
from src.errors.enums.errors_enums import ErrorEnum
from src.infra.ai.interface.trail_generator import TrailGeneratorInterface
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.base_response import BaseResponse
from src.models.track import Track
from src.models.module import Module
from src.models.content import Content
from src.models.video import Video
from src.models.activity import Activity


class CreateTrailUseCase:
    def __init__(self,db: SupabaseInterface, trail_generator: TrailGeneratorInterface,):
        self.db = db
        self.trail_generator = trail_generator

    def execute(self, user_id: UUID, theme: str) -> BaseResponse:

        trail = self._generate_trail(theme)
        track_summary = self._create_track(user_id, theme, trail)
        modules_summary = self._process_modules(user_id, theme, trail.get("modulos"), track_summary["id"])

        return BaseResponse(
            success=True,
            message="Trail created successfully.",
            data={"track": track_summary, "modules": modules_summary},
        )

    def _generate_trail(self, theme: str) -> Dict[str, Any]:
        trail = self.trail_generator.generate_trail(theme)
        if not isinstance(trail, dict) or  trail.get("modulos", []) is None:
            raise IaGenerationError(ErrorEnum.IA0001.message, ErrorEnum.IA0001.code)
        return trail

    def _create_track(self, user_id: UUID, theme: str, trail: Dict[str, Any]) -> Dict[str, Any]:
        track_name = trail.get("descricao_curta") or theme
        track = Track(name=track_name, user_id=user_id, conteudo=theme)
        inserted = self.db.insert_track(track)
        track_id = self._extract_first_id(inserted)

        if not track_id:
            raise DatabaseError(ErrorEnum.DB0001.message, ErrorEnum.DB0001.code)

        return {"id": track_id, "raw": inserted}

    def _process_modules(
        self,
        user_id: UUID,
        theme: str,
        modulos: List[Dict[str, Any]],
        track_id: int,
    ) -> List[Dict[str, Any]]:
        modules_summary: List[Dict[str, Any]] = []
        for modulo in modulos:
            module_title = modulo.get("titulo_modulo")
            order_index = modulo.get("order_index")
            module_summary = self._create_module(user_id, track_id, theme, module_title, order_index)
            modules_summary.append(module_summary)

        return modules_summary

    def _create_module(
        self,
        user_id: UUID,
        track_id: int,
        theme: str,
        module_title: str,
        order_index: Optional[int],
    ) -> Dict[str, Any]:

        module_obj = Module(name=module_title, track_id=track_id, user_id=user_id, order_index=order_index)
        inserted = self.db.insert_module(module_obj)
        module_id = self._extract_first_id(inserted)

        if not module_id:
            raise DatabaseError(ErrorEnum.DB0001.message, ErrorEnum.DB0001.code)

        module_summary: Dict[str, Any] = {
            "module": {"id": module_id, "raw": inserted},
            "contents": [],
            "videos": [],
            "activities": [],
        }

        self._append_contents(module_summary, theme, module_title, module_id)
        self._append_videos(module_summary, theme, module_title, module_id)
        self._append_activities(module_summary, theme, module_title, module_id)

        return module_summary

    def _append_contents(
        self,
        module_summary: Dict[str, Any],
        theme: str,
        module_title: str,
        module_id: int,
    ) -> None:
        contents_payload = self.trail_generator.generate_contents(theme, module_title)
        if not isinstance(contents_payload, dict):
            return

        module_summary["contents"].append(contents_payload)

        content_record = Content(
            path=json.dumps(contents_payload, ensure_ascii=False),
            title=module_title,
            module_id=module_id,
        )
        self.db.insert_content(content_record)

    def _append_videos(
        self,
        module_summary: Dict[str, Any],
        theme: str,
        module_title: str,
        module_id: int,
    ) -> None:
        videos_payload = self.trail_generator.find_videos(theme, module_title)
        if not isinstance(videos_payload, dict):
            return

        for v in videos_payload.get("videos", []):
            module_summary["videos"].append(v)
            video_record = Video(
                url=v.get("url"),
                title=v.get("titulo"),
                module_id=module_id,
            )
            self.db.insert_video(video_record)

    def _append_activities(
        self,
        module_summary: Dict[str, Any],
        theme: str,
        module_title: str,
        module_id: int,
    ) -> None:
        exercises_payload = self.trail_generator.generate_questions_answers(theme, module_title)
        if not isinstance(exercises_payload, dict):
            return

        for e in exercises_payload.get("exercicios", []):
            module_summary["activities"].append(e)
            activity_record = Activity(
                question=e.get("pergunta"),
                module_id=module_id,
                answers=e,
            )
            self.db.insert_activity(activity_record)

    def _extract_first_id(self, insert_result: Any) -> Optional[int]:
        if not insert_result:
            return None
        if isinstance(insert_result, list) and len(insert_result) > 0:
            return insert_result[0].get("id")
        if isinstance(insert_result, dict):
            return insert_result.get("id")
        return None
