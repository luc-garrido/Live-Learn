import { useState } from "react";
import Layout from "../components/Layout";
import TrackHeaderCard from "../components/TrackHeaderCard";
import ModuleListCard from "../components/ModuleListCard";
import TrackSidebarWidgets from "../components/TrackSidebarWidgets";
import styles from "./TrackPage.module.css";

const MOCK_TRACK = {
  title: "Data Design Essentials",
  description: "Master the foundations of designing usable, accessible, and insightful data products. Learn modeling, visualization and real-world workflows.",
  estimatedTime: "6h 30m",
  modulesCount: 4,
};

const MOCK_MODULES = [
  {
    id: 1,
    title: "Foundations of Data",
    description: "Explore data types, collection best practices, and ethical considerations for trustworthy datasets.",
    activitiesCount: 5,
    duration: "1h 20m",
    status: "inprogress" as const,
  },
  {
    id: 2,
    title: "Data Modeling",
    description: "Understand schemas, relationships, normalization and designing models for analytics and applications.",
    activitiesCount: 4,
    duration: "1h 10m",
    status: "notstarted" as const,
  },
  {
    id: 3,
    title: "Visualization Basics",
    description: "Learn principles of visual perception, chart selection, color, and accessibility in data visuals.",
    activitiesCount: 6,
    duration: "1h 40m",
    status: "notstarted" as const,
  },
  {
    id: 4,
    title: "Project: Capstone Dashboard",
    description: "Apply what you've learned to build a mini-dashboard from a provided dataset and present insights.",
    activitiesCount: 3,
    duration: "2h 20m",
    status: "notstarted" as const,
  },
];

export default function TrackPage() {
  // const { id } = useParams();
  // const [track, setTrack] = useState<Track | null>(null);
  // const [modules, setModules] = useState<Module[]>([]);
  // useEffect(() => { ... });

  const [filter, setFilter] = useState<string>("inprogress");

  return (
    <Layout>
      <div className={styles.trackPageContainer}>
        <div className={styles.leftContent}>
          <TrackHeaderCard
            title={MOCK_TRACK.title}
            description={MOCK_TRACK.description}
            estimatedTime={MOCK_TRACK.estimatedTime}
            modulesCount={MOCK_TRACK.modulesCount}
            onStart={() => {}}
            onOverview={() => {}}
          />
          <div className={styles.quickFilters}>
            <button
              className={styles.quickFilterBtn + (filter === "inprogress" ? " active" : "")}
              onClick={() => setFilter("inprogress")}
            >In Progress</button>
            <button
              className={styles.quickFilterBtn + (filter === "completed" ? " active" : "")}
              onClick={() => setFilter("completed")}
            >Completed</button>
            <button
              className={styles.quickFilterBtn + (filter === "starred" ? " active" : "")}
              onClick={() => setFilter("starred")}
            >Starred</button>
          </div>
          <div className={styles.moduleList}>
            {MOCK_MODULES.filter(m => filter === "inprogress" ? m.status === "inprogress" : filter === "completed" ? m.status === "completed" : true)
              .map((mod) => (
                <ModuleListCard key={mod.id} {...mod} onStart={() => {}} />
              ))}
          </div>
        </div>
        <aside className={styles.rightSidebar}>
          <TrackSidebarWidgets />
        </aside>
      </div>
    </Layout>
  );
}