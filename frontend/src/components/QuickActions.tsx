import styles from "./QuickActions.module.css";
import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Ações rápidas</div>
      <div className={styles.actionsRow}>
        <Link to="/dashboard" className={styles.actionBtn}>Retomar</Link>
        <Link to="/tracks" className={styles.actionBtn}>Editar trilha</Link>
      </div>
      <div className={styles.actionsRow}>
        <button className={styles.actionBtn}>Exportar</button>
        <button className={styles.actionBtn}>Compartilhar</button>
      </div>
    </div>
  );
}
