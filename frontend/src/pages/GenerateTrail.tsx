import React, { useState } from "react";
import { apiPost } from "../services/api";
import "./GenerateTrail.css";

export default function GenerateTrail() {
  const [theme, setTheme] = useState("");
  const [track, setTrack] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTrack(null);
    try {
      const token = localStorage.getItem("token");
      const data = await apiPost("/tracks/", { theme }, token || undefined);
      if (data.erro) {
        setError(data.erro);
      } else {
        setTrack(data);
      }
    } catch (err: any) {
      setError(err.message || "Falha ao gerar a trilha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="generate-trail-container">
      <h1>Gerar Trilha Personalizada</h1>
      <form className="generate-trail-form" onSubmit={handleGenerate}>
        <input
          type="text"
          placeholder="Tema do curso (ex: React, Python...)"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="generate-trail-input"
          required
        />
        <button
          type="submit"
          className="generate-trail-btn"
          disabled={loading || !theme.trim()}
        >
          {loading ? "Gerando..." : "Gerar Trilha"}
        </button>
      </form>
      {error && <div className="generate-trail-error">{error}</div>}
      {track && (
        <div className="generate-trail-result">
          <h2>Tema: {track.theme || theme}</h2>
          {track.descricao_curta && <p>{track.descricao_curta}</p>}
          <h3>Módulos:</h3>
          <ul>
            {(track.modulos || track.modules)?.map((mod: any) => (
              <li key={mod.order_index || mod.id}>
                <strong>{mod.titulo_modulo || mod.title}</strong>
                {mod.descricao_modulo && <div>{mod.descricao_modulo}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}