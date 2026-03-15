from datetime import datetime, timedelta, UTC
from jose import JWTError, jwt

from src.config.config import settings
from src.infra.security.interface.security import Security as SecurityInterface

class Security(SecurityInterface):

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.now(UTC) + timedelta(minutes=settings.jwt.access_token_expire_minutes)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.jwt.secret_key, algorithm=settings.jwt.algorithm)
        return encoded_jwt

    def create_refresh_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.now(UTC) + timedelta(days=settings.jwt.refresh_token_expire_days)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.jwt.secret_key, algorithm=settings.jwt.algorithm)
        return encoded_jwt

    def decode_token(self, token: str):
        try:
            payload = jwt.decode(token, settings.jwt.secret_key, algorithms=[settings.jwt.algorithm])
            return payload
        except JWTError:
            raise JWTError("Token inválido")
