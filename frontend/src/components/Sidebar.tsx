import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="sidebar">
      <h1 className="logo">Live & Learn</h1>
      <nav>
        <Link to="/dashboard" className={pathname === "/dashboard" ? "active" : ""}>Dashboard</Link>
        {/* Removido link de Trilhas do sidebar */}
      </nav>
    </aside>
  );
}