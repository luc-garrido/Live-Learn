from src.infra.db.supabase import Supabase
from src.data.use_cases.auth_use_case import AuthUseCase
from src.infra.encryptor.encryptor import Encryptor
from src.infra.security.security import Security


def auth_composer():
    db = Supabase()
    encryptor = Encryptor()
    security = Security()
    use_case = AuthUseCase(db, encryptor, security)
    return use_case.execute
