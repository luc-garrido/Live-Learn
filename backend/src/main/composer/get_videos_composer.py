from src.data.use_cases.get_videos_use_case import GetVideosUseCase
from src.infra.db.supabase import Supabase

def get_videos_composer():
    db = Supabase()
    use_case = GetVideosUseCase(db)
    return use_case.execute
