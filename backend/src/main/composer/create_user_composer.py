from src.infra.db.supabase import Supabase
from src.data.use_cases.create_user_use_case import CreateUserUseCase
from src.infra.encryptor.encryptor import Encryptor


def create_user_composer():
    db = Supabase()
    encryptor = Encryptor()
    use_case = CreateUserUseCase(db, encryptor)

    def execute(email, password):
        return use_case.execute(email, password)

    return execute
