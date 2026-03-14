export interface Module {
  id: number;
  title: string;
  description: string;
}

export function getModules(trackId: number): Promise<Module[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, title: "Módulo 1", description: "Descrição do módulo 1" },
      { id: 2, title: "Módulo 2", description: "Descrição do módulo 2" },
      { id: 3, title: "Módulo 3", description: "Descrição do módulo 3" }
    ]), 500);
  });
}