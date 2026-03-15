from src.data.use_cases.get_contents_use_case import GetContentsUseCase
from src.infra.db.supabase import Supabase

def get_contents_composer():
    db = Supabase()
    use_case = GetContentsUseCase(db)
    return use_case.execute
