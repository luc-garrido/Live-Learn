import styles from "../pages/TrackPage.module.css";

interface TrackHeaderCardProps {
  title: string;
  description: string;
  estimatedTime: string;
  modulesCount: number;
  onStart: () => void;
  onOverview: () => void;
}

export default function TrackHeaderCard({
  title,
  description,
  estimatedTime,
  modulesCount,
  onStart,
  onOverview,
}: TrackHeaderCardProps) {
  return (
    <div className={styles.trackCard}>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{title}</div>
        <div className={styles.trackDesc}>{description}</div>
        <div className={styles.trackMeta}>
          Estimated time: {estimatedTime} &nbsp; | &nbsp; Modules: {modulesCount}
        </div>
        <div className={styles.trackActions}>
          <button className={styles.trackBtn} onClick={onStart}>Start Track</button>
          <button className={styles.trackBtn} onClick={onOverview}>Overview</button>
        </div>
      </div>
      <img
        className={styles.trackImage}
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
        alt="Track visual"
      />
    </div>
  );
}
