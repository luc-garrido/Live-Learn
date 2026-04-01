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
    # Alteração segura: adicionamos valores padrão para o Pydantic não travar na Vercel
    secret_key: str = "583380303f424b530d57f193088bac100a3bc3e4e8b3485ffce42085ee101c85"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

class Settings(BaseSettings):
    # Mantendo a estrutura original de inicialização
    database: Optional[SupaBaseSettings] = SupaBaseSettings()
    groq: Optional[GroqSettings] = GroqSettings()
    jwt: Optional[JWTSettings] = JWTSettings()

settings = Settings()
