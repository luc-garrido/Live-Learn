// frontend/src/services/aiService.ts
import { apiPost } from "./api";

// Gera a trilha inteira
export async function generateTrack(theme: string, token?: string) {
  return apiPost("/tracks/", { theme }, token);
}

// Gera conteúdo de um módulo
export async function generateContent(courseTheme: string, moduleTitle: string) {
  return apiPost("/contentGenerator", { course_theme: courseTheme, module_title: moduleTitle });
}

// Busca vídeos do módulo
export async function getVideos(courseTheme: string, moduleTitle: string) {
  return apiPost("/videoSearch", { course_theme: courseTheme, module_title: moduleTitle });
}

// Gera exercícios do módulo
export async function getExercises(courseTheme: string, moduleTitle: string) {
  return apiPost("/exerciseGenerator", { course_theme: courseTheme, module_title: moduleTitle });
}