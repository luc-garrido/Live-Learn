import Layout from "../components/Layout";
import TrackCard from "../components/TrackCard";
import ModuleCard from "../components/ModuleCard";
import ActivityCard from "../components/ActivityCard";
import QuickActions from "../components/QuickActions";
import Deadlines from "../components/Deadlines";
import ActivityFeed from "../components/ActivityFeed";
import styles from "../styles/Dashboard.module.css";

const tracks = [
  {
    id: 1,
    name: "Python Completo",
    type: "Trilha Completa",
    progress: 60,
    modules: [
      {
        id: 1,
        name: "Introdução ao Python",
        completed: true,
        activities: [
          { id: 1, type: "text" as const, title: "O que é Python?", completed: true },
          { id: 2, type: "video" as const, title: "Por que aprender Python?", completed: true },
          { id: 3, type: "activity" as const, title: "Primeiro código", completed: true },
        ],
      },
      {
        id: 2,
        name: "Variáveis e Tipos",
        completed: false,
        activities: [
          { id: 1, type: "text" as const, title: "Tipos de dados", completed: false },
          { id: 2, type: "video" as const, title: "Variáveis na prática", completed: false },
          { id: 3, type: "activity" as const, title: "Exercício prático", completed: false },
        ],
      },
    ],
  },
];

export default function Dashboard() {
  return (
    <Layout>
      <div className={styles.dashboardGrid}>
        <div className={styles.leftColumn}>
          <section className={styles.tracksSection}>
            <div className={styles.sectionHeader}>
              <h1>Minhas Trilhas</h1>
              <button className={styles.createBtn}>+ Nova Trilha</button>
            </div>
            <div className={styles.tracksGrid}>
              {tracks.map((track) => (
                <div key={track.id}>
                  <TrackCard {...track} />
                  <div style={{ marginTop: "1.5rem" }}>
                    <h3 style={{ color: "var(--color-secondary)", marginBottom: 8 }}>
                      Módulos
                    </h3>
                    {track.modules.map((mod) => (
                      <div key={mod.id} style={{ marginBottom: 16 }}>
                        <ModuleCard {...mod} />
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                          {mod.activities.map((a) => (
                            <ActivityCard key={a.id} {...a} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside className={styles.rightSidebar}>
          <QuickActions />
          <Deadlines />
          <ActivityFeed />
        </aside>
      </div>
    </Layout>
  );
}