from src.data.use_cases.get_activities_use_case import GetActivitiesUseCase
from src.infra.db.supabase import Supabase

def get_activities_composer():
    db = Supabase()
    use_case = GetActivitiesUseCase(db)
    return use_case.execute
