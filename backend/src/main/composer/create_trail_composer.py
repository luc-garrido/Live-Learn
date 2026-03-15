from src.infra.db.supabase import Supabase
from src.infra.ai.trail_generator import TrailGeneratorService
from src.data.use_cases.create_trail_use_case import CreateTrailUseCase


def create_trail_composer():
    db = Supabase()
    trail_generator = TrailGeneratorService()
    use_case = CreateTrailUseCase(db, trail_generator)
    return use_case.execute
