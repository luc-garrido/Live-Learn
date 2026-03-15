import { apiGet, apiPost } from "./api";

export interface Track {
  id: number;
  name: string;
  user_id: string;
  conteudo?: string;
}

export function getTracks(token?: string): Promise<any> {
  return apiGet(`/tracks/`, token);
}

export function createTrack(theme: string, token?: string): Promise<any> {
  return apiPost("/tracks/", { theme }, token);
}