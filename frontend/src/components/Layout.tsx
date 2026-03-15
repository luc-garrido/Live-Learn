import { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../styles/Global.css";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const email = localStorage.getItem("ll_user_email");
    if (email) setUserEmail(email);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <header className="header">
          <div className="profile">
            <div className="avatar"></div>
            <span>{userEmail || "Usuário"}</span>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}