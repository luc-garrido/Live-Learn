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


class Settings(BaseSettings):

    database: Optional[SupaBaseSettings] = SupaBaseSettings()
    groq: Optional[GroqSettings] = GroqSettings()

settings = Settings()
