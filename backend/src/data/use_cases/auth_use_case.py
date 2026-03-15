import re

from src.infra.encryptor.interface.encryptor import Encryptor
from src.errors import *
from src.errors.enums.errors_enums import ErrorEnum
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.base_response import BaseResponse
from src.infra.security.interface.security import Security


class AuthUseCase:
    def __init__(self, db: SupabaseInterface, encryptor: Encryptor, security: Security):
        self.__db = db
        self.__encryptor = encryptor
        self.__security = security

    def execute(self, email: str, password: str):
        print(f"[LOGIN] Email recebido: {email}")
        if not self._is_valid_email(email):
            print("[LOGIN] Email inválido")
            raise EmailException(ErrorEnum.EM0001.message, ErrorEnum.EM0001.code)

        user = self.__db.get_user_by_email(email)
        print(f"[LOGIN] Usuário encontrado: {user}")
        if not user:
            print("[LOGIN] Usuário não encontrado")
            raise UserAuthenticateException(
                ErrorEnum.AU0001.message, ErrorEnum.AU0001.code
            )

        print(f"[LOGIN] Hash da senha salva: {user.password}")
        senha_ok = self.__encryptor.verify_password(password, user.password)
        print(f"[LOGIN] Resultado verificação bcrypt: {senha_ok}")
        if not senha_ok:
            print("[LOGIN] Senha incorreta")
            raise UserAuthenticateException(
                ErrorEnum.AU0001.message, ErrorEnum.AU0001.code
            )

        access_token = self.__security.create_access_token(data={"sub": str(user.id)})
        refresh_token = self.__security.create_refresh_token(data={"sub": str(user.id)})

        print("[LOGIN] Login bem-sucedido!")
        return BaseResponse(
            success=True,
            message="Autenticação realizada com sucesso",
            data={
                "access_token": access_token,
                "refresh_token": refresh_token,
            },
        )

    def _is_valid_email(self, email: str) -> bool:
        email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
        return re.match(email_regex, email) is not None
