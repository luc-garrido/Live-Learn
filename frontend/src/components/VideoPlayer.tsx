import React from "react";
import "./VideoPlayer.css";

interface VideoPlayerProps {
  url: string;
  title?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function VideoPlayer({ url, title, isSelected, onClick }: VideoPlayerProps) {
  return (
    <div className={`video-player ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <iframe
        width="560"
        height="315"
        src={url}
        title={title || "Vídeo da aula"}
        allowFullScreen
      />
    </div>
  );
}