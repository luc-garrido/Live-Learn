// frontend/src/services/videoService.ts
export interface Video {
  id: number;
  title: string;
  url: string;
}

export function getVideos(moduleId: number): Promise<Video[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: "Aula 1 - Introdução", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: 2, title: "Aula 2 - Componentes", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      { id: 3, title: "Aula 3 - Props e State", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" }
    ]), 500);
  });
}