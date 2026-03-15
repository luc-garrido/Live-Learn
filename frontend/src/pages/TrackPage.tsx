import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { getModules } from "../services/moduleService";
import Layout from "../components/Layout";

export default function TrackPage() {
  const { id } = useParams();
  const location = useLocation();
  const [modules, setModules] = useState<any[]>([]);
  const [loadingModules, setLoadingModules] = useState(true);

  useEffect(() => {
    if (id) {
      setLoadingModules(true);
      const token = localStorage.getItem("token");
      getModules(Number(id), token || undefined).then((res) => {
        if (Array.isArray(res)) {
          setModules(res);
        } else if (res?.data && Array.isArray(res.data)) {
          setModules(res.data);
        } else {
          setModules([]);
        }
        setLoadingModules(false);
      }).catch(() => {
        setModules([]);
        setLoadingModules(false);
      });
    }
  }, [id]);

  return (
    <Layout>
      <h1>Módulos</h1>
      {loadingModules ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
          <div className="spinner" style={{
            width: 48, height: 48, border: '6px solid #e0e7ff', borderTop: '6px solid #9135ff', borderRadius: '50%', animation: 'spin 1s linear infinite'
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }`}</style>
        </div>
      ) : modules.length === 0 ? (
        <p>Sem módulos disponíveis</p>
      ) : (
        modules.map((m) => (
          <div key={m.id || m.order_index} style={{ padding: "15px", margin: "10px 0", background: "white", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <h3>{m.name}</h3>
            <Link to={`/module/${m.id}`}>
              <button>Estudar</button>
            </Link>
          </div>
        ))
      )}
    </Layout>
  );
}