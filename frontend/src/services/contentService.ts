// frontend/src/services/contentService.ts
export interface Content {
  id: number;
  title: string;
  description: string;
}

export function getContent(moduleId: number): Promise<Content[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: "Introdução ao módulo", description: "Descrição da introdução" },
      { id: 2, title: "Conceitos principais", description: "Descrição dos conceitos" },
      { id: 3, title: "Resumo do módulo", description: "Resumo rápido" }
    ]), 500);
  });
}