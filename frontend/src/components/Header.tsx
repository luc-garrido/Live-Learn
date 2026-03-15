import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h2>Dashboard</h2>
      </div>
      <div className={styles.center}>
        <input
          className={styles.search}
          type="text"
          placeholder="Search courses, modules, tracks"
        />
      </div>
      <div className={styles.right}>
        <button className={styles.iconBtn} title="Notifications">
          <span className="fa-regular fa-bell"></span>
        </button>
        <button className={styles.iconBtn} title="Help">
          <span className="fa-regular fa-circle-question"></span>
        </button>
        <span className={styles.avatar}>AR</span>
      </div>
    </header>
  );
}
