import React from "react";
import "./ActivityCard.css";

interface ActivityCardProps {
  type: "text" | "video" | "activity";
  title: string;
  completed: boolean;
}

export default function ActivityCard({ type, title, completed }: ActivityCardProps) {
  return (
    <div className={completed ? "activity-card done" : "activity-card"}>
      <span className="icon">
        {type === "text" ? "📖" : type === "video" ? "🎥" : "🧠"}
      </span>
      <span className="title">{title}</span>
      <span className="status">{completed ? "Concluído" : "Pendente"}</span>
    </div>
  );
}