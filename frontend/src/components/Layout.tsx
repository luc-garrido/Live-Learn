import { useEffect, useState } from "react";
import type { ReactNode } from "react"; // Correção para TS1484
import Sidebar from "./Sidebar";
import "../styles/Global.css";

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [, setUserName] = useState<string>(""); //userName omitido com vírgula para evitar TS6133

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      setUserName(payload?.name || payload?.email || payload?.sub || "Usuário");
    }
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <header className="header">
          <div className="profile">
            <div className="avatar"></div>
            {/* O nome era setado aqui, mas foi removido conforme seu código anterior */}
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}