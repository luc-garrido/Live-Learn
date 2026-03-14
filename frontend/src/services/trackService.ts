import { apiGet,apiPost } from "./api";

export function getTracks(userId:number){

  return apiGet(`/tracks?id=${userId}`);

}

export function createTrack(conteudo:string,tipo:string){

  return apiPost("/criarTrilha",{
    conteudo,
    tipo
  });

}