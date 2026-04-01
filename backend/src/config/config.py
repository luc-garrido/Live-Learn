from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class SupaBaseSettings(BaseSettings):
    model_config = SettingsConfigDict(
    env_file=".env", env_prefix="SUPABASE_", case_sensitive=False, extra="allow")
    url: str
    key: str

class GroqSettings(BaseSettings):
    model_config = SettingsConfigDict(
    env_file=".env", env_prefix="GROQ_", case_sensitive=False, extra="allow")
    api_key: str


class JWTSettings(BaseSettings):
    model_config = SettingsConfigDict(
    env_file=".env", env_prefix="JWT_", case_sensitive=False, extra="allow")
    secret_key: str
    algorithm: str
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

class Settings(BaseSettings):

    database: Optional[SupaBaseSettings] = SupaBaseSettings()
    groq: Optional[GroqSettings] = GroqSettings()
    jwt: Optional[JWTSettings] = JWTSettings()

settings = Settings()

class JWTSettings(BaseSettings):
    # O Pydantic usará estes valores se não encontrar nada no .env ou na Vercel
    secret_key: str = "574da575-5bda-4efe-bffa-474036620334" 
    algorithm: str = "HS256"

    class Config:
        env_file = ".env"
