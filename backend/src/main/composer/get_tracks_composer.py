from src.data.use_cases.get_tracks_use_case import GetTracksUseCase
from src.infra.db.supabase import Supabase

def get_tracks_composer():
    db = Supabase()
    use_case = GetTracksUseCase(db)
    return use_case.execute
