import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getModules } from "../services/moduleService";
import Layout from "../components/Layout";

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

    <Layout>

      <h1>Módulos</h1>

      <div
        style={{
          display:"flex",
          flexDirection:"column",
          gap:"15px",
          marginTop:"20px"
        }}
      >

        {modules.map((m:any) => (

          <div
            key={m.id}
            style={{
              background:"white",
              padding:"18px",
              borderRadius:"10px",
              boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
              display:"flex",
              justifyContent:"space-between",
              alignItems:"center"
            }}
          >

            <h3>{m.title}</h3>

            <Link to={`/module/${m.id}`}>
              Estudar
            </Link>

          </div>

        ))}

      </div>

    </Layout>

  );

}