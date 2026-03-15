from typing import List
from src.errors import BadRequestException
from src.errors.enums.errors_enums import ErrorEnum
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.module import Module
from src.models.base_response import BaseResponse

class GetModulesUseCase:
    def __init__(self, db: SupabaseInterface):
        self.__db = db

    def execute(self, track_id: int, user_id: str) -> BaseResponse:
        track = self.__db.get_track_by_id(track_id)
        if not track:
            raise BadRequestException("Trilha não encontrada", 404)

        if str(track.user_id) != str(user_id):
            raise BadRequestException("Acesso negado", 403)

        modules = self.__db.get_modules_by_track_id(track_id)
        return BaseResponse(data=modules)
