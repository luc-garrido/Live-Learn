from src.errors import BadRequestException
from src.infra.db.interface.supabase import SupabaseInterface
from src.dtos.respond_activity_response import RespondActivityResponse

class RespondActivityUseCase:
    def __init__(self, db: SupabaseInterface):
        self.__db = db

    def execute(self, activity_id: int, selected_option: str, user_id: str) -> RespondActivityResponse:
        activity = self.__db.get_activity_by_id(activity_id)

        if not activity:
            raise BadRequestException("Atividade não encontrada", 404)

        module = self.__db.get_module_by_id(activity.module_id)
        if not module:
            raise BadRequestException("Módulo não encontrado", 404)

        if str(module.user_id) != str(user_id):
            raise BadRequestException("Acesso negado", 403)

        answers = activity.answers
        if not answers:
            raise BadRequestException("Não há respostas disponíveis", 400)

        is_correct = False
        explanation = answers.get("resposta_correta", "")

        for key, value in answers.get("opcoes", {}).items():
            if value.get("correta", False):
                if key == selected_option:
                    is_correct = True
                break

        if is_correct:
            self.__db.mark_activity_answered(activity_id)

        return RespondActivityResponse(is_correct=is_correct, explanation=explanation)
