// frontend/src/services/activityService.ts
import { apiGet } from "./api";

export interface Activity {
  id: number;
  question: string;
  module_id: number;
  answered?: boolean;
  answers?: any;
}

export function getActivities(moduleId: number, token?: string): Promise<any> {
  return apiGet(`/modules/${moduleId}/activities`, token);
}