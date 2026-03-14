import React from "react";
import "./Progress.css";

interface ProgressProps {
  percent: number;
}

export default function Progress({ percent }: ProgressProps) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percent}%` }}></div>
    </div>
  );
}