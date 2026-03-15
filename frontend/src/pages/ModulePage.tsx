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
  // Estado para respostas do usuário
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<{ [key: number]: boolean }>({});
  const [loading, setLoading] = useState(true);

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
    }).finally(() => setLoading(false));
  }, [moduleId]);

  return (
    <Layout>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Módulo {moduleId}</h1>
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
                    const opcoes = e.answers?.opcoes || e.opcoes;
                    const qid = e.id || idx;
                    const userAnswer = userAnswers[qid] || "";
                    const isSubmitted = submitted[qid];
                    // Descobre a letra correta
                    let letraCorreta = "";
                    if (opcoes) {
                      for (const [letra, opt] of Object.entries(opcoes)) {
                        if (opt.correta) letraCorreta = letra;
                      }
                    }
                    const acertou = isSubmitted && userAnswer === letraCorreta;
                    return (
                      <div key={qid} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 18, minWidth: 260, maxWidth: 350, marginBottom: 12 }}>
                        <div style={{ fontWeight: 500, fontSize: 16, marginBottom: 8 }}>{e.question || e.pergunta}</div>
                        {opcoes && (
                          <form onSubmit={ev => { ev.preventDefault(); setSubmitted(s => ({ ...s, [qid]: true })); }}>
                            <ul style={{ listStyle: 'none', padding: 0, marginBottom: 8 }}>
                              {Object.entries(opcoes).map(([letra, opt]: any) => (
                                <li key={letra} style={{
                                  background: userAnswer === letra ? '#e3f2fd' : '#f5f5f5',
                                  borderRadius: 6,
                                  padding: '6px 10px',
                                  marginBottom: 4,
                                  fontWeight: 400,
                                  cursor: isSubmitted ? 'default' : 'pointer',
                                  opacity: isSubmitted && letra !== userAnswer && letra !== letraCorreta ? 0.7 : 1
                                }}>
                                  <label style={{ width: '100%', display: 'flex', alignItems: 'center', cursor: isSubmitted ? 'default' : 'pointer' }}>
                                    <input
                                      type="radio"
                                      name={`q_${qid}`}
                                      value={letra}
                                      disabled={isSubmitted}
                                      checked={userAnswer === letra}
                                      onChange={() => setUserAnswers(a => ({ ...a, [qid]: letra }))}
                                      style={{ marginRight: 8 }}
                                    />
                                    <span>{letra}. {opt.conteudo}</span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                            {!isSubmitted && (
                              <button type="submit" disabled={!userAnswer} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 18px', cursor: 'pointer', fontWeight: 500 }}>
                                Enviar
                              </button>
                            )}
                          </form>
                        )}
                        {isSubmitted && (
                          <div style={{ marginTop: 8 }}>
                            <div style={{ fontWeight: 600, color: acertou ? '#388e3c' : '#d32f2f' }}>
                              {acertou ? 'Acertou!' : `Errou! Resposta correta: ${letraCorreta}`}
                            </div>
                            <div style={{ fontSize: 13, color: '#1976d2', marginTop: 4 }}>
                              <b>Explicação:</b> {e.answers?.resposta_correta || e.resposta_correta}
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