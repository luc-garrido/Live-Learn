import { apiGet, apiPost } from "./api";

export interface Track {
  id: number;
  title: string;
  description: string;
}

export function getTracks(userId: number): Promise<Track[]> {
  return apiGet(`/tracks?id=${userId}`);
}

export function createTrack(title: string, description: string): Promise<{ success: boolean; track: Track }> {
  return apiPost("/criarTrilha", {
    title,
    description
  });
}