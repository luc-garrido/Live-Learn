# Live-Learn

## Sobre o Projeto

Live & Learn é uma plataforma de trilhas de aprendizagem interativas, com geração automática de módulos, conteúdos, vídeos e exercícios usando IA. O sistema integra frontend (React/Vite), backend (FastAPI), Supabase (banco de dados), e Groq API para geração de trilhas.

## Equipe

- **Isaque Charles** — FullStack & Conexões
- **Santiago Santos** — UI/UX Design
- **Victor Tavares** — BackEnd, Banco de Dados
- **Lucas** — IA & Dados

## Instalação e Configuração

### Pré-requisitos
- Node.js (>= 16)
- Python (>= 3.10)
- Supabase account
- Groq API Key

### Backend
1. Instale dependências:
   ```bash
   cd Live-Learn/backend
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```
2. Configure variáveis de ambiente em `.env`:
   - `DATABASE_URL` e `DATABASE_KEY` do Supabase
   - `GROQ_API_KEY` da Groq
   - `JWT_SECRET_KEY`
3. Inicie o backend:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend
1. Instale dependências:
   ```bash
   cd Live-Learn/frontend
   npm install
   ```
2. Inicie o frontend:
   ```bash
   npm run dev
   ```

### Banco de Dados
- Execute o script `database/init.sql` no Supabase para criar as tabelas.

## Uso
- Acesse o frontend em `http://localhost:5174`
- Crie trilhas, módulos e navegue pelos conteúdos gerados pela IA.

## Licença

Este projeto está sob licença de código aberto [MIT License](https://opensource.org/licenses/MIT).

---

Contribuições são bem-vindas! Para dúvidas ou sugestões, entre em contato com qualquer membro da equipe.// teste
