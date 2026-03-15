import { apiGet } from "./api";
export interface Module {
  id: number;
  name: string;
  track_id: number;
  user_id: string;
  order_index?: number;
}

export function getModules(trackId: number, token?: string): Promise<any> {
  return apiGet(`/modules/${trackId}`, token);
}