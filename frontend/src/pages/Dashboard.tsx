import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const trilhas = [
    { id: 1, nome: "Python Básico" },
    { id: 2, nome: "React para Iniciantes" },
    { id: 3, nome: "Lógica de Programação" }
  ];

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Minhas Trilhas</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {trilhas.map(t => (
          <Link key={t.id} to={`/track/${t.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              color: "var(--color-primary)"
            }}>
              {t.nome}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}