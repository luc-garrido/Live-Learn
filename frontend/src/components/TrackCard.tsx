import { Link } from "react-router-dom"

interface Props {
  id: number
  nome: string
}

function TrackCard({ id, nome }: Props) {
  return (
    <div className="track-card">
      <h3>{nome}</h3>

      <Link to={`/modules/${id}`}>
        <button>Estudar</button>
      </Link>
    </div>
  )
}

export default TrackCard