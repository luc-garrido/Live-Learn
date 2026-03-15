from src.errors import BadRequestException
from src.errors.enums.errors_enums import ErrorEnum
from src.infra.db.interface.supabase import SupabaseInterface
from src.models.base_response import BaseResponse
from src.infra.security.interface.security import Security

class RefreshTokenUseCase:
    def __init__(self, db: SupabaseInterface, security: Security):
        self.__db = db
        self.__security = security

    def execute(self, refresh_token: str):
        try:
            payload = self.__security.decode_token(refresh_token)
            user_id: str = payload.get("sub")
            if user_id is None:
                raise BadRequestException("Token inválido", 400)
        except Exception:
            raise BadRequestException("Token inválido", 400)

        user = self.__db.get_user_by_id(user_id)
        if not user:
            raise BadRequestException("Usuário não encontrado", 404)

        access_token = self.__security.create_access_token(data={"sub": str(user.id)})
        new_refresh_token = self.__security.create_refresh_token(data={"sub": str(user.id)})

        return BaseResponse(
            success=True,
            message="Token renovado com sucesso",
            data={
                "access_token": access_token,
                "refresh_token": new_refresh_token,
            }
        )
