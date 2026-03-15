import { Link } from "react-router-dom";
import styles from "./TrackCard.module.css";

interface TrackCardProps {
  id: number;
  name: string;
  type: string;
  progress: number;
  modules: any[];
}

export default function TrackCard({ name, type, progress, modules }: TrackCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.type}>{type}</span>
        <span className={styles.progressBar}>
          <span className={styles.progress} style={{ width: `${progress}%` }} />
        </span>
        <span className={styles.progressText}>{progress}%</span>
      </div>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.modulesPreview}>
        {modules.slice(0, 2).map((mod) => (
          <span key={mod.id} className={mod.completed ? styles.moduleDone : styles.modulePending}>
            {mod.name}
          </span>
        ))}
        {modules.length > 2 && <span className={styles.more}>+{modules.length - 2} módulos</span>}
      </div>
    </div>
  );
}