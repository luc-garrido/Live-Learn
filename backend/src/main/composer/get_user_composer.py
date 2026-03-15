from src.data.use_cases.get_user_use_case import GetUserUseCase
from src.infra.db.supabase import Supabase

def get_user_composer():
    db = Supabase()
    use_case = GetUserUseCase(db)
    return use_case.execute
