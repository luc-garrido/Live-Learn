import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getModules } from "../services/moduleService";

export default function TrackPage() {

  const { id } = useParams();

  const [modules, setModules] = useState<any[]>([]);

  useEffect(() => {

    if (!id) return;

    getModules(Number(id)).then((data) => {
      setModules(data);
    });

  }, [id]);

  return (
    <div>

      <h1>Módulos</h1>

      {modules.length === 0 && (
        <p>Carregando módulos...</p>
      )}

      {modules.map((m) => (
        <div key={m.id}>

          <h3>{m.title}</h3>

          <Link to={`/module/${m.id}`}>
            Estudar
          </Link>

        </div>
      ))}

    </div>
  );
}