from typing import Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class SupaBaseSettings(BaseSettings):
    model_config = SettingsConfigDict(
    env_file=".env", env_prefix="SUPABASE_", case_sensitive=False, extra="allow")
    url: str
    password: str

class Settings(BaseSettings):

    database: Optional[SupaBaseSettings] = SupaBaseSettings()

settings = Settings()
