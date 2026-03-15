from src.data.use_cases.respond_activity_use_case import RespondActivityUseCase
from src.infra.db.supabase import Supabase

def respond_activity_composer():
    db = Supabase()
    use_case = RespondActivityUseCase(db)
    return lambda activity_id, selected_option, user_id: use_case.execute(activity_id, selected_option, user_id)
