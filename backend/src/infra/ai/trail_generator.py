import json
from groq import Groq
from youtube_search import YoutubeSearch
from src.config.config import settings
from src.infra.ai.interface.trail_generator import TrailGeneratorInterface

class TrailGeneratorService(TrailGeneratorInterface):
    def __init__(self):
        self.client = Groq(api_key=settings.groq.api_key)
        # self.model = "llama3-70b-8192"
        self.model = "llama-3.1-8b-instant"

    def generate_trail(self, theme: str) -> dict:
        system_prompt = f"""
        Você é um Arquiteto Pedagógico da plataforma 'Live & Learn'.
        Crie a uma trilha com 3 módulos de ensino sobre '{theme}'.

        REGRA: Retorne APENAS JSON. SEM texto explicativo nas aulas, apenas TÍTULOS.

        Estrutura OBRIGATÓRIA:
        {{
          "descricao_curta": "Trilha de ensino sobre {theme}",
          "modulos": [
            {{
              "order_index": 1,
              "titulo_modulo": INICIANDO COM O NOME DO TEMA, depois algo mais específico,",

            }},
            {{
              "order_index": 2,
              "titulo_modulo": INTERMEDIÁRIO COM O NOME DO TEMA, depois algo mais específico"
            }},
            {{
              "order_index": 3,
              "titulo_modulo": AVANÇADO COM O NOME DO TEMA, depois algo mais específico"
            }}
          ]
        }}
        """

        try:
            response = self.client.chat.completions.create(
                messages=[{"role": "system", "content": system_prompt}],
                model=self.model,
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"[ERRO ESQUELETO] {e}")
            return {"erro": "Falha ao gerar esqueleto do curso."}

    def generate_contents(self, course_theme: str, module_title: str) -> dict:
        """
        Generates contents (text and PDF suggestions) related to the theme and module.
        """
        system_prompt = f"""
        Você é um Professor Expert da plataforma 'Live & Learn'.
        Tema do Curso: {course_theme}
        Módulo Atual: {module_title}

        Sua missão é gerar o CONTEÚDO DENSO e DIDÁTICO exclusivamente para esta aula, incluindo sugestões de PDFs relacionados.

        REGRA: Retorne APENAS JSON.

        Estrutura OBRIGATÓRIA:
        {{
          "conteudo_texto": "O texto completo da aula. Use formatação Markdown (negrito, listas) para ficar bonito na tela. Explique os conceitos profundamente.",
          "pdfs": [
            {{
              "titulo": "Título do PDF sugerido",
              "url": "Link para o PDF (ou descrição se não houver link direto)"
            }}
          ]
        }}
        Sugira exatamente 3 PDFs relevantes.
        """

        try:
            response = self.client.chat.completions.create(
                messages=[{"role": "system", "content": system_prompt}],
                model=self.model,
                temperature=0.5,
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"[ERRO CONTEUDO] {e}")
            return {"erro": "Falha ao gerar conteúdos."}

    def find_videos(self, course_theme: str, module_title: str) -> dict:
        """
        Finds videos related to the theme and module on YouTube.
        """
        query = f"{course_theme} {module_title} aula em português"
        try:
            busca = YoutubeSearch(query, max_results=3).to_dict()
            videos = []
            if busca:
                for video in busca:
                    videos.append({
                        "url": f"https://www.youtube.com{video['url_suffix']}",
                        "titulo": video['title'],
                    })
            return {"videos": videos}
        except Exception as e:
            print(f"[ERRO VIDEOS] {e}")
            return {"erro": "Falha ao encontrar vídeos."}

    def generate_questions_answers(self, course_theme: str, module_title: str) -> dict:
        """
        Generates questions and answers (exercises) related to the theme and module.
        """
        system_prompt = f"""
        Você é um Professor Expert da plataforma 'Live & Learn'.
        Tema do Curso: {course_theme}
        Módulo Atual: {module_title}

        Sua missão é gerar exercícios práticos para testar o conhecimento do aluno.

        REGRA: Retorne APENAS JSON.

        Estrutura OBRIGATÓRIA:
        {{
          "exercicios": [
            {{
              "pergunta": "Pergunta de múltipla escolha para testar o aluno.",
              "opcoes": {{
                "A": {{"conteudo": "Opção A", "correta": false}},
                "B": {{"conteudo": "Opção B", "correta": false}},
                "C": {{"conteudo": "Opção C", "correta": false}},
                "D": {{"conteudo": "Opção D", "correta": true}}
              }},
              "resposta_correta": "Letra correta e explicação rápida."
            }}
          ]
        }}
        Gere exatamente 5 exercícios práticos.
        """

        try:
            response = self.client.chat.completions.create(
                messages=[{"role": "system", "content": system_prompt}],
                model=self.model,
                temperature=0.5,
                response_format={"type": "json_object"}
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"[ERRO EXERCICIOS] {e}")
            return {"erro": "Falha ao gerar perguntas e respostas."}
