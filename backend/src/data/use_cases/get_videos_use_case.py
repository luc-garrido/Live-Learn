from typing import List
from src.errors import BadRequestException
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.video import Video
from src.models.base_response import BaseResponse

class GetVideosUseCase:
    def __init__(self, db: SupabaseInterface):
        self.__db = db

    def execute(self, module_id: int, user_id: str) -> BaseResponse:
        module = self.__db.get_module_by_id(module_id)
        if not module:
            raise BadRequestException("Módulo não encontrado", 404)

        if str(module.user_id) != str(user_id):
            raise BadRequestException("Acesso negado", 403)

        videos = self.__db.get_videos_by_module_id(module_id)
        return BaseResponse(data=videos)
