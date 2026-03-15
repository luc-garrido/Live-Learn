import { ReactNode, useEffect, useState } from "react";

function parseJwt(token: string): any {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}
import Sidebar from "./Sidebar";
import "../styles/Global.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = parseJwt(token);
      // Tenta pegar o nome, senão email, senão sub
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
            {/* Não exibe mais nome/id/email do usuário */}
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}