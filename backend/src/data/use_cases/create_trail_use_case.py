import json
from typing import Any, Dict, List, Optional
from uuid import UUID

from src.errors import *
from src.models import *
from src.models.base_response import BaseResponse
from src.errors.enums.errors_enums import ErrorEnum
from src.infra.ai.interface.trail_generator import TrailGeneratorInterface
from src.infra.db.interface.supabase import SupabaseInterface


class CreateTrailUseCase:
    def __init__(
        self,
        db: SupabaseInterface,
        trail_generator: TrailGeneratorInterface,
    ):
        self.__db = db
        self.__trail_generator = trail_generator

    def execute(self, user_id: UUID, theme: str):
        print(f"[CREATE_TRAIL] Iniciando criação de trilha para o tema: {theme}")
        trail = self._generate_trail(theme)
        # Salva a resposta da IA em um arquivo para debug
        try:
            with open("ia_trail_response.log", "a", encoding="utf-8") as f:
                f.write(f"TEMA: {theme}\n{json.dumps(trail, ensure_ascii=False)}\n\n")
        except Exception as e:
            print(f"[CREATE_TRAIL][ERRO] Falha ao salvar log da IA: {e}")

        print(f"[CREATE_TRAIL] Resposta da IA (Groq) para o tema '{theme}': {trail}")
        if (
            not trail
            or not isinstance(trail, dict)
            or not trail.get("modulos")
            or not isinstance(trail.get("modulos"), list)
            or len(trail.get("modulos")) == 0
        ):
            print(
                f"[CREATE_TRAIL][ERRO] IA não retornou módulos válidos para o tema '{theme}'. Resposta: {trail}"
            )
            raise InternalServerError(
                "A IA não retornou módulos válidos para a trilha.", 500
            )
        track_id = self._create_track(user_id, theme, trail)
        print(f"[CREATE_TRAIL] Track criada com id: {track_id}")
        self._process_modules(user_id, theme, trail.get("modulos"), track_id)
        print(
            f"[CREATE_TRAIL] Processamento de módulos finalizado para track_id: {track_id}"
        )
        return BaseResponse(
            success=True,
            message="Trilha criada com sucesso",
            data={
                "track_id": track_id,
            },
        )

    def _generate_trail(self, theme: str) -> Dict[str, Any]:
        trail = self.__trail_generator.generate_trail(theme)
        if trail.get("modulos", []) is None:
            raise InternalServerError(ErrorEnum.IA0001.message, ErrorEnum.IA0001.code)
        return trail

    def _create_track(
        self, user_id: UUID, theme: str, trail: Dict[str, Any]
    ) -> Dict[str, Any]:
        track_name = trail.get("descricao_curta") or theme
        track = Track(name=track_name, user_id=user_id, conteudo=theme)

        inserted = self.__db.insert_track(track)
        track_id = self._extract_first_id(inserted)

        if not track_id:
            raise InternalServerError(ErrorEnum.DB0001.message, ErrorEnum.DB0001.code)

        return track_id

    def _process_modules(
        self,
        user_id: UUID,
        theme: str,
        modulos: List[Dict[str, Any]],
        track_id: int,
    ):
        print(f"[CREATE_TRAIL] Iniciando processamento de módulos: {modulos}")
        for modulo in modulos or []:
            module_title = modulo.get("titulo_modulo")
            order_index = modulo.get("order_index")
            print(
                f"[CREATE_TRAIL] Criando módulo: {module_title} (order_index={order_index})"
            )
            self._create_module(user_id, track_id, theme, module_title, order_index)

    def _create_module(
        self,
        user_id: UUID,
        track_id: int,
        theme: str,
        module_title: str,
        order_index: Optional[int],
    ) -> Dict[str, Any]:
        print(f"[CREATE_TRAIL] Salvando módulo no banco: {module_title}")
        module_obj = Module(
            name=module_title,
            track_id=track_id,
            user_id=user_id,
            order_index=order_index,
        )
        inserted = self.__db.insert_module(module_obj)
        module_id = self._extract_first_id(inserted)
        print(f"[CREATE_TRAIL] Módulo salvo com id: {module_id}")
        if not module_id:
            raise InternalServerError(ErrorEnum.DB0001.message, ErrorEnum.DB0001.code)
        print(f"[CREATE_TRAIL] Gerando conteúdo para módulo: {module_title}")
        self._append_contents(theme, module_title, module_id)
        print(f"[CREATE_TRAIL] Gerando vídeos para módulo: {module_title}")
        self._append_videos(theme, module_title, module_id)
        print(f"[CREATE_TRAIL] Gerando exercícios para módulo: {module_title}")
        self._append_activities(theme, module_title, module_id)

    def _append_contents(
        self,
        theme: str,
        module_title: str,
        module_id: int,
    ) -> None:

        contents_payload = self.__trail_generator.generate_contents(theme, module_title)

        if not isinstance(contents_payload, dict):
            raise InternalServerError(ErrorEnum.IA0004.message, ErrorEnum.IA0004.code)

        content_record = Content(
            path=json.dumps(contents_payload, ensure_ascii=False),
            title=module_title,
            module_id=module_id,
        )
        self.__db.insert_content(content_record)

    def _append_videos(
        self,
        theme: str,
        module_title: str,
        module_id: int,
    ) -> None:

        videos_payload = self.__trail_generator.find_videos(theme, module_title)

        if not isinstance(videos_payload, dict):
            raise InternalServerError(ErrorEnum.IA0003.message, ErrorEnum.IA0003.code)

        for v in videos_payload.get("videos", []):
            video_record = Video(
                url=v.get("url"),
                title=v.get("titulo"),
                module_id=module_id,
            )
            self.__db.insert_video(video_record)

    def _append_activities(
        self,
        theme: str,
        module_title: str,
        module_id: int,
    ) -> None:

        exercises_payload = self.__trail_generator.generate_questions_answers(
            theme, module_title
        )

        if not isinstance(exercises_payload, dict):
            raise InternalServerError(ErrorEnum.IA0002.message, ErrorEnum.IA0002.code)

        for e in exercises_payload.get("exercicios", []):
            activity_record = Activity(
                question=e.get("pergunta"),
                module_id=module_id,
                answers=e,
            )
            self.__db.insert_activity(activity_record)

    def _extract_first_id(self, insert_result: Any) -> Optional[int]:
        if not insert_result:
            return None
        if isinstance(insert_result, list) and len(insert_result) > 0:
            return insert_result[0].get("id")
        if isinstance(insert_result, dict):
            return insert_result.get("id")
        return None
