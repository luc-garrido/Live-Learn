// frontend/src/services/contentService.ts
import { apiGet } from "./api";

export interface Content {
  id: number;
  path: string;
  title?: string;
  module_id: number;
}

export function getContent(moduleId: number, token?: string): Promise<any> {
  return apiGet(`/modules/${moduleId}/contents`, token);
}