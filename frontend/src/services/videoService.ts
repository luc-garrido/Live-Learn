// frontend/src/services/videoService.ts
import { apiGet } from "./api";

export interface Video {
  id: number;
  url: string;
  title?: string;
  module_id: number;
}

export function getVideos(moduleId: number, token?: string): Promise<any> {
  return apiGet(`/modules/${moduleId}/videos`, token);
}