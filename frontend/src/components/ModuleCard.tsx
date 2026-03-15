import styles from "./ModuleCard.module.css";

interface Activity {
  id: number;
  type: "text" | "video" | "activity";
  title: string;
  completed: boolean;
}

interface ModuleCardProps {
  name: string;
  completed: boolean;
  activities: Activity[];
}

export default function ModuleCard({ name, completed, activities }: ModuleCardProps) {
  return (
    <div className={completed ? styles.cardDone : styles.card}>
      <h4>{name}</h4>
      <div className={styles.activities}>
        {activities.map((a) => (
          <span key={a.id} className={a.completed ? styles.done : styles.pending}>
            {a.type === "text" ? "📖" : a.type === "video" ? "🎥" : "🧠"} {a.title}
          </span>
        ))}
      </div>
    </div>
  );
}
