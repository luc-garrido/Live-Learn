import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

import { getContents } from "../services/contentService";
import { getVideos } from "../services/videoService";
import { getActivities } from "../services/activityService";

export default function ModulePage(){

  const { id } = useParams();

  const [contents,setContents] = useState([]);
  const [videos,setVideos] = useState([]);
  const [activities,setActivities] = useState([]);

  useEffect(()=>{

    getContents(Number(id)).then(setContents);
    getVideos(Number(id)).then(setVideos);
    getActivities(Number(id)).then(setActivities);

  },[])

  return(

    <div>

      <h2>Conteúdo</h2>

      {contents.map((c:any)=>(
        <p key={c.id}>{c.title}</p>
      ))}

      <h2>Vídeos</h2>

      {videos.map((v:any)=>(
        <iframe
          key={v.id}
          width="560"
          height="315"
          src={v.url}
        />
      ))}

      <h2>Atividades</h2>

      {activities.map((a:any)=>(
        <div key={a.id}>
          <p>{a.question}</p>
        </div>
      ))}

    </div>

  )

}