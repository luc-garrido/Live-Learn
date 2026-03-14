from uuid import uuid4

from src.infra.ai.trail_generator import TrailGeneratorService
from src.infra.db.supabase import Supabase
from src.models.user import User
from src.data.use_cases.create_trail_use_case import CreateTrailUseCase


if __name__ == "__main__":
    tema = "Inteligência Artificial"
    db = Supabase()
    user_email = "test@livelearn.local"
    user = db.get_user_by_email(user_email)
    if not user:
        user = User(id=uuid4(), email=user_email, name="Test User")
        db.insert_user(user)

    trail_service = TrailGeneratorService()
    use_case = CreateTrailUseCase(db=db, trail_generator=trail_service)

    result = use_case.execute(user_id=user.id, theme=tema)
    # BaseResponse is a Pydantic model
    print(result.json(ensure_ascii=False, indent=2))
