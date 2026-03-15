import styles from "./ActivityFeed.module.css";

const activities = [
  { id: 1, title: "Completou aula: Responsive layouts", meta: "Full-Stack Web Development", time: "2h" },
  { id: 2, title: "Comentou: Usability tests", meta: "UI/UX Design Essentials", time: "1d" },
  { id: 3, title: "Pontuação 87%: Intro to probability", meta: "Data Science Foundations", time: "3d" },
];

export default function ActivityFeed() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Atividade recente</div>
      <ul className={styles.list}>
        {activities.map((a) => (
          <li key={a.id} className={styles.item}>
            <div className={styles.activityTitle}>{a.title}</div>
            <div className={styles.activityMeta}>{a.meta}</div>
            <div className={styles.activityTime}>{a.time}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
