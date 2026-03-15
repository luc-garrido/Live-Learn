import { useEffect, useState } from "react";
import { marked } from "marked";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { getContent } from "../services/contentService";
import { getVideos } from "../services/videoService";
import { getActivities } from "../services/activityService";

export default function ModulePage() {
  const { id } = useParams();
  const [content, setContent] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<(string | null)[]>([]);
  const [showAnswer, setShowAnswer] = useState<boolean[]>([]);

  const moduleId = id;

  useEffect(() => {
    if (!moduleId) return;
    const token = localStorage.getItem("token");
    setLoading(true);
    Promise.all([
      getContent(Number(moduleId), token),
      getVideos(Number(moduleId), token),
      getActivities(Number(moduleId), token)
    ]).then(([contentsRes, videosRes, activitiesRes]) => {
      setContent(contentsRes?.data?.[0] || null);
      setVideos(videosRes?.data || []);
      setExercises(activitiesRes?.data || []);
      setSelected(Array((activitiesRes?.data || []).length).fill(null));
      setShowAnswer(Array((activitiesRes?.data || []).length).fill(false));
    }).finally(() => setLoading(false));
  }, [moduleId]);

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          {loading ? 'Carregando...' : (content?.title || content?.name || `Módulo ${moduleId}`)}
        </h1>
        {loading ? (
          <div style={{marginTop: 40, textAlign: 'center'}}>Carregando...</div>
        ) : (
          <>
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Conteúdo</h2>
              {content ? (
                <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 24, marginBottom: 12 }}>
                  <div style={{ whiteSpace: 'pre-line', marginBottom: 12 }}>
                    {content.path ? (
                      <div dangerouslySetInnerHTML={{ __html: marked.parse(JSON.parse(content.path).conteudo_texto || '') }} />
                    ) : ''}
                  </div>
                  {content.path && JSON.parse(content.path).pdfs?.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <h4 style={{ marginBottom: 8 }}>PDFs</h4>
                      <ul style={{ paddingLeft: 20 }}>
                        {JSON.parse(content.path).pdfs.map((pdf: any, idx: number) => (
                          <li key={idx} style={{ marginBottom: 4 }}>
                            <a href={pdf.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }}>{pdf.titulo}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : <p>Nenhum conteúdo disponível.</p>}
            </section>
            <section style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Vídeos</h2>
              {videos.length === 0 ? <p>Nenhum vídeo disponível.</p> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                  {videos.map((v) => {
                    // Extrai o ID do YouTube
                    let ytId = '';
                    if (v.url && v.url.includes('youtube.com')) {
                      const match = v.url.match(/[?&]v=([^&#]+)/) || v.url.match(/embed\/([\w-]+)/);
                      ytId = match ? match[1] : '';
                    }
                    return (
                      <div key={v.url || v.id} style={{ width: 320, background: '#fafafa', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 12, textAlign: 'center' }}>
                        {ytId ? (
                          <a href={v.url} target="_blank" rel="noopener noreferrer">
                            <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={v.title || 'Vídeo'} style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />
                          </a>
                        ) : null}
                        <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 4 }}>{v.title || v.titulo}</div>
                        <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline', fontSize: 14 }}>Assistir</a>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
            <section>
              <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Exercícios</h2>
              {exercises.length === 0 ? <p>Nenhum exercício disponível.</p> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                  {exercises.map((e, idx) => {
                    // Suporte para diferentes formatos de backend
                    const opcoes = e.answers?.opcoes || e.opcoes || {};
                    return (
                      <div key={e.id || idx} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 18, minWidth: 260, maxWidth: 350 }}>
                        <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>{e.question || e.pergunta}</div>
                        <form onSubmit={ev => { ev.preventDefault(); setShowAnswer(prev => { const arr = [...prev]; arr[idx] = true; return arr; }); }}>
                          {Object.entries(opcoes).map(([letra, opt]: any) => (
                            <label key={letra} style={{ display: 'block', marginBottom: 6, cursor: 'pointer', background: selected[idx] === letra ? '#e0e7ff' : 'transparent', borderRadius: 6, padding: '2px 6px' }}>
                              <input
                                type="radio"
                                name={`exercicio_${e.id || idx}`}
                                value={letra}
                                checked={selected[idx] === letra}
                                onChange={() => setSelected(prev => { const arr = [...prev]; arr[idx] = letra; return arr; })}
                                style={{ marginRight: 8 }}
                                disabled={showAnswer[idx]}
                              />
                              <b>{letra}.</b> {opt.conteudo}
                            </label>
                          ))}
                          <button type="submit" disabled={selected[idx] == null || showAnswer[idx]} style={{ marginTop: 8, background: '#9135ff', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 16px', cursor: showAnswer[idx] ? 'not-allowed' : 'pointer' }}>Responder</button>
                        </form>
                        {showAnswer[idx] && (
                          <div style={{ marginTop: 10, fontWeight: 500, color: selected && opcoes[selected]?.correta ? 'green' : 'red' }}>
                            {selected && opcoes[selected]?.correta ? 'Correto!' : 'Incorreto.'}
                            <div style={{ fontWeight: 400, color: '#333', marginTop: 4 }}>
                              Explicação: {(e.answers?.resposta_correta || e.resposta_correta) ?? ''}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}