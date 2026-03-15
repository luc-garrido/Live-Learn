import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateTrack } from "../services/aiService";
import { getTracks } from "../services/trackService";
import Layout from "../components/Layout";
import "./Dashboard.css";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [loadingTrilhas, setLoadingTrilhas] = useState(true);
  const navigate = useNavigate();

  // const trilhas = [ ... ] // Removido: trilhas mockadas
  const [trilhas, setTrilhas] = useState<any[]>([]);


  const fetchTrilhas = useCallback(() => {
    setLoadingTrilhas(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingTrilhas(false);
      return;
    }
    getTracks(token).then((res) => {
      if (Array.isArray(res)) {
        setTrilhas(res);
      } else if (res?.data && Array.isArray(res.data)) {
        setTrilhas(res.data);
      } else {
        setTrilhas([]);
      }
      setLoadingTrilhas(false);
    }).catch(() => setLoadingTrilhas(false));
  }, []);

  useEffect(() => {
    fetchTrilhas();
  }, [fetchTrilhas]);

  async function handleGenerate() {
    const theme = prompt("Digite o tema que quer aprender:");
    if (!theme) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await generateTrack(theme, token || undefined);
      // Espera-se: { success, message, data: { track_id } }
      const trackId = response?.data?.track_id;
      if (!trackId) throw new Error("ID da trilha não retornado");

      // Tentar buscar detalhes da trilha criada (incluindo módulos), com até 5 tentativas
      let trackData = null;
      let tentativas = 0;
      while (tentativas < 5) {
        const res = await fetch(`http://127.0.0.1:8000/tracks/${trackId}`, {
          credentials: "include",
          headers: token ? { "Authorization": `Bearer ${token}` } : {}
        });
        const data = await res.json();
        if (data?.modulos && Array.isArray(data.modulos) && data.modulos.length > 0) {
          trackData = data;
          break;
        }
        tentativas++;
        await new Promise(r => setTimeout(r, 1000)); // espera 1s
      }

      fetchTrilhas();
      navigate(`/track/${trackId}`);
    } catch (err) {
      console.error(err);
      alert("Erro ao gerar a trilha com IA");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(trackId: number) {
    if (!window.confirm("Tem certeza que deseja remover esta trilha?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://127.0.0.1:8000/tracks/${trackId}`, {
      method: "DELETE",
      headers: token ? { "Authorization": `Bearer ${token}` } : {},
    });
    setTrilhas((prev) => prev.filter((t) => t.id !== trackId));
  }

  return (
    <Layout>
      <div className="dashboard">
        <h1>Minhas Trilhas</h1>
        <button
          onClick={handleGenerate}
          disabled={loading}
          style={{
            background: "linear-gradient(90deg, #9135ff 0%, #00c2ff 100%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
            margin: "24px 0 32px 0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.3s"
          }}
        >
          {loading ? "Gerando trilha personalizada..." : "Criar trilha personalizada com IA"}
        </button>

        {loadingTrilhas ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
            <div className="spinner" style={{
              width: 48, height: 48, border: '6px solid #e0e7ff', borderTop: '6px solid #9135ff', borderRadius: '50%', animation: 'spin 1s linear infinite'
            }} />
            <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
          </div>
        ) : trilhas.length === 0 ? (
          <p style={{color: '#888', marginTop: 32}}>Nenhuma trilha criada ainda. Clique em "Criar trilha personalizada com IA" para começar!</p>
        ) : (
          <div className="trilhas-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            marginTop: 32
          }}>
            {trilhas.map((t) => (
              <div key={t.id} className="trilha-card" style={{
                background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(80, 80, 180, 0.10)',
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minHeight: 160,
                position: 'relative',
                border: '1.5px solid #e0e7ff',
                transition: 'box-shadow 0.2s',
              }}>
                <h2 style={{
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  color: '#3a2e7c',
                  marginBottom: 12
                }}>{t.name || t.nome || t.title}</h2>
                <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 18, minHeight: 24 }}>
                  {t.conteudo || t.description || t.descricao_curta || 'Trilha personalizada'}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                  <Link to={`/track/${t.id}`}>
                    <button style={{
                      background: 'linear-gradient(90deg, #9135ff 0%, #00c2ff 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 22px',
                      fontWeight: 600,
                      fontSize: 15,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>Entrar</button>
                  </Link>
                  <button style={{
                    background: '#ff4d4f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 22px',
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }} onClick={() => handleRemove(t.id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}