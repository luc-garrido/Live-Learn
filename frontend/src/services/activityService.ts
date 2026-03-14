// frontend/src/services/activityService.ts
export interface Activity {
  id: number;
  question: string;
  completed: boolean;
}

export function getActivities(moduleId: number): Promise<Activity[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      { id: 1, question: "O que é React?", completed: true },
      { id: 2, question: "O que são componentes?", completed: false },
      { id: 3, question: "Como usar Props e State?", completed: false }
    ]), 500);
  });
}