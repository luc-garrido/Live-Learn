import { apiGet } from "./api";

export function getVideos(moduleId:number){

  return apiGet(`/videos?id=${moduleId}`);

}