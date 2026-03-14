import { apiPost } from "./api";

export function createUser(name:string,email:string){

  return apiPost("/criarUser",{
    name,
    email
  });

}