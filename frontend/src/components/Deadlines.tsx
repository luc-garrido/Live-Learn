import styles from "./Deadlines.module.css";

const deadlines = [
  { id: 1, title: "Projeto final — UI/UX", date: "22 Mar", daysLeft: 3 },
  { id: 2, title: "Quiz: Probabilidade", date: "25 Mar", daysLeft: 6 },
  { id: 3, title: "Peer review: Módulo 4", date: "28 Mar", daysLeft: 9 },
];

export default function Deadlines() {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Próximos prazos</div>
      <ul className={styles.list}>
        {deadlines.map((d) => (
          <li key={d.id} className={styles.item}>
            <div className={styles.deadlineTitle}>{d.title}</div>
            <div className={styles.deadlineMeta}>
              <span className={styles.date}>{d.date}</span>
              <span className={styles.daysLeft}>{d.daysLeft} dias</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
