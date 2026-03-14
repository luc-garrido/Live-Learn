import React from "react";
import "./ActivityCard.css";

interface ActivityCardProps {
  title: string;
  completed?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ActivityCard({ title, completed, isSelected, onClick }: ActivityCardProps) {
  return (
    <div className={`activity-card ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <span>{title}</span>
      {completed && <span className="checkmark">✅</span>}
    </div>
  );
}