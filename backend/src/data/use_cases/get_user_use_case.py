from uuid import uuid4

from src.infra.encryptor.interface.encryptor import Encryptor
from src.errors import *
from src.errors.enums.errors_enums import ErrorEnum
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.user import User
from src.models.base_response import BaseResponse


class GetUserUseCase:
    def __init__(self, db: SupabaseInterface):
        self.__db = db

    def execute(self, user_id: uuid4):

        user = self.__db.get_user_by_id(user_id)
        if not user:
            raise UserNotFoundException(ErrorEnum.US0001.message, ErrorEnum.US0001.code)

        return user
