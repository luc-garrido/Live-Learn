from src.infra.db.supabase import Supabase
from src.infra.security.security import Security
from src.data.use_cases.refresh_token_use_case import RefreshTokenUseCase

def refresh_token_composer():
    db = Supabase()
    security = Security()
    use_case = RefreshTokenUseCase(db, security)
    return use_case.execute
