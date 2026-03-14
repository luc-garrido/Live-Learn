import { apiGet,apiPost } from "./api";

export function getActivities(moduleId:number){

  return apiGet(`/activities?id=${moduleId}`);

}

export function answerActivity(activityId:number,resposta:string){

  return apiPost(`/responderAtividade?id=${activityId}`,{
    resposta
  });

}

