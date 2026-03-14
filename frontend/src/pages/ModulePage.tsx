import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getContent } from "../services/contentService";
import type { Content } from "../services/contentService";

import { getVideos } from "../services/videoService";
import type { Video } from "../services/videoService";

import { getActivities } from "../services/activityService";
import type { Activity } from "../services/activityService";

import Layout from "../components/Layout";
import VideoPlayer from "../components/VideoPlayer";
import ActivityCard from "../components/ActivityCard";
import Progress from "../components/Progress";

import "./ModulePage.css";

export default function ModulePage() {
  const { id } = useParams();

  const [contents, setContents] = useState<Content[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>("");
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    getContent(Number(id)).then(setContents);

    getVideos(Number(id)).then((vids) => {
      setVideos(vids);
      if (vids.length > 0) setSelectedVideo(vids[0].url);
    });

    getActivities(Number(id)).then(setActivities);
  }, [id]);

  const completedActivities = activities.filter((a) => a.completed).length;

  const progressPercent =
    activities.length > 0
      ? Math.round((completedActivities / activities.length) * 100)
      : 0;

  return (
    <Layout>
      <div className="module-page">
        <section className="contents-section">
          <h2>Conteúdos</h2>

          {contents.length === 0 && <p>Sem conteúdos disponíveis.</p>}

          {contents.map((c) => (
            <div key={c.id} className="content-card">
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          ))}
        </section>

        <section className="videos-section">
          <h2>Vídeos</h2>

          {videos.length === 0 && <p>Sem vídeos disponíveis.</p>}

          {videos.map((v) => (
            <VideoPlayer
              key={v.id}
              url={v.url}
              title={v.title}
              isSelected={selectedVideo === v.url}
              onClick={() => setSelectedVideo(v.url)}
            />
          ))}
        </section>

        <section className="activities-section">
          <h2>Atividades</h2>

          {activities.length === 0 && <p>Sem atividades disponíveis.</p>}

          {activities.map((a) => (
            <ActivityCard
              key={a.id}
              title={a.question}
              completed={a.completed}
              isSelected={selectedActivity === a.id}
              onClick={() => setSelectedActivity(a.id)}
            />
          ))}
        </section>

        <section className="progress-section">
          <h2>Progresso</h2>

          <Progress percent={progressPercent} />

          <p>
            {completedActivities} de {activities.length} concluídas (
            {progressPercent}%)
          </p>
        </section>
      </div>
    </Layout>
  );
}