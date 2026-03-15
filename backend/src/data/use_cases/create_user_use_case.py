from uuid import uuid4
from typing import Optional
import re

from src.infra.encryptor.interface.encryptor import Encryptor
from src.errors import *
from src.errors.enums.errors_enums import ErrorEnum
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.user import User
from src.models.base_response import BaseResponse


class CreateUserUseCase:
    def __init__(self, db: SupabaseInterface, encryptor: Encryptor):
        self.__db = db
        self.__encryptor = encryptor

    def execute(self, email: str, password: str):
        if not self._is_valid_email(email):
            raise EmailException(ErrorEnum.EM0001.message, ErrorEnum.EM0001.code)

        existing_user = self.__db.get_user_by_email(email)
        if existing_user:
            raise EmailException(ErrorEnum.EM0002.message, ErrorEnum.EM0002.code)

        hashed_password = self.__encryptor.hash_password(password)
        user_id = uuid4()
        user = User(id=user_id, email=email, password=hashed_password, name="Usuário")

        inserted = self.__db.insert_user(user)
        inserted_id = self._extract_first_id(inserted)

        if not inserted_id:
            raise InternalServerError(ErrorEnum.DB0001.message, ErrorEnum.DB0001.code)

        return BaseResponse(
            success=True,
            message="Usuário criado com sucesso",
        )

    def _is_valid_email(self, email: str) -> bool:
        email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        return re.match(email_regex, email) is not None

    def _extract_first_id(self, insert_result) -> Optional[int]:
        if not insert_result:
            return None
        if isinstance(insert_result, list) and len(insert_result) > 0:
            return insert_result[0].get("id")
        if isinstance(insert_result, dict):
            return insert_result.get("id")
        return None
