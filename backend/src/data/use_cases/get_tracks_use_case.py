from typing import List
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.track import Track
from src.models.base_response import BaseResponse

class GetTracksUseCase:
    def __init__(self, db: SupabaseInterface):
        self.__db = db

    def execute(self, user_id: str) -> BaseResponse:
        tracks = self.__db.get_tracks_by_user_id(user_id)
        return BaseResponse(data=tracks)
