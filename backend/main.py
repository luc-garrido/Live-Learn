import sys
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# --- ADICIONE ESTAS LINHAS AQUI ---
# Pega o caminho da pasta onde este main.py está e avisa ao Python
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.append(current_dir)
# ---------------------------------

# MANTENHA as importações originais da IA
try:
    from src.main.app import app as ia_app
    app = ia_app  # O Vercel vai usar esse 'app' que já tem a IA
except ImportError:
    # Caso rode isolado, ele cria um app novo para não dar erro
    app = FastAPI()

# MANTENHA ou ADICIONE o middleware de CORS para o frontend funcionar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rota de teste
@app.get("/api/v1/health")
def health_check():
    return {"status": "online", "projeto": "Live-Learn"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8010)