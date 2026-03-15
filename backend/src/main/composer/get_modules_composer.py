from src.data.use_cases.get_modules_use_case import GetModulesUseCase
from src.infra.db.supabase import Supabase

def get_modules_composer():
    db = Supabase()
    use_case = GetModulesUseCase(db)
    return use_case.execute
