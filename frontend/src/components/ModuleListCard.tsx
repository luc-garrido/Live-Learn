import styles from "../pages/TrackPage.module.css";
import { Link } from "react-router-dom";

interface ModuleListCardProps {
  id: number;
  title: string;
  description: string;
  activitiesCount: number;
  duration: string;
  status: "inprogress" | "notstarted" | "completed";
  onStart: () => void;
}

export default function ModuleListCard({
  id,
  title,
  description,
  activitiesCount,
  duration,
  status,
  onStart,
}: ModuleListCardProps) {
  return (
    <div className={styles.moduleCard}>
      <div className={styles.moduleThumb} style={{backgroundImage: `url('https://source.unsplash.com/random/64x64?sig=${id}')`}} />
      <div className={styles.moduleInfo}>
        <div className={styles.moduleTitle}>{title}</div>
        <div className={styles.moduleDesc}>{description}</div>
        <div className={styles.moduleMeta}>
          <span>{activitiesCount} activities</span>
          <span>{duration}</span>
        </div>
        <div className={styles.moduleActions}>
          <button className={styles.moduleBtn + (status === "inprogress" ? " active" : "")}
            onClick={onStart}
          >
            {status === "inprogress" ? "Continue" : status === "notstarted" ? "Start" : "Completed"}
          </button>
          <Link to={`/module/${id}`} className={styles.moduleBtn}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
