const API_URL = "http://localhost:3000";

export async function apiGet(route:string){

  const res = await fetch(`${API_URL}${route}`);
  return res.json();

}

export async function apiPost(route:string,body:any){

  const res = await fetch(`${API_URL}${route}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  });

  return res.json();

}