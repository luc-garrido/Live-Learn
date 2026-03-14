import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTracks } from "../services/trackService";

export default function Dashboard(){

  const [tracks,setTracks] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(()=>{

    if(userId){
      getTracks(Number(userId)).then(setTracks);
    }

  },[])

  return(

    <div>

      <h1>Minhas Trilhas</h1>

      {tracks.map((t:any)=>(

        <div key={t.id}>

          <h3>{t.title}</h3>

          <Link to={`/track/${t.id}`}>
            Estudar
          </Link>

        </div>

      ))}

    </div>

  )

}