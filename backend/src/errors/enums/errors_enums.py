from dataclasses import dataclass

@dataclass(frozen=True)
class Error:
    code: int
    message: str


class ErrorEnum:

    IA0001 = Error(500, "Falha na geração da trilha")
    IA0002 = Error(500, "Houve um erro ao gerar os exercícios do módulo")
    IA0003 = Error(500, "Houve um erro ao gerar os vídeos do módulo")
    IA0004 = Error(500, "Houve um erro ao gerar os conteúdos do módulo")

    US0001 = Error(404, "Usuário não encontrado")

    DB0001 = Error(500, "Operação de banco de dados falhou")
    DB0002 = Error(404, "Erro ao criar usuário")

    VD0001 = Error(400, "Erro de validação")

    EM0001 = Error(400, "Formato de email inválido")
    EM0002 = Error(400, "O Email já está em uso")

    AU0001 = Error(401, "Credenciais inválidas")
