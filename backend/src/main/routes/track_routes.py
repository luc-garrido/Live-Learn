from fastapi import APIRouter, Depends, Request, HTTPException, status
from src.infra.db.supabase import Supabase
from src.main.composer.get_tracks_composer import get_tracks_composer
from src.main.composer.create_trail_composer import create_trail_composer
from src.main.dependencies import get_current_user
from src.dtos.create_trail_request import CreateTrailRequest

router = APIRouter(
    prefix="/tracks", tags=["tracks"], dependencies=[Depends(get_current_user)]
)


@router.get("/{track_id}")
async def get_track_detail(track_id: int, request: Request):
    db = Supabase()
    track = db.get_track_by_id(track_id)
    if not track:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Trilha não encontrada"
        )
    modules = db.get_modules_by_track_id(track_id)
    return {"track": track, "modulos": modules}


@router.delete("/{track_id}")
async def delete_track(track_id: int, request: Request):
    db = Supabase()
    # Remove módulos, vídeos, conteúdos e atividades relacionados
    modules = db.get_modules_by_track_id(track_id)
    for m in modules:
        db.client.table("videos").delete().eq("module_id", m.id).execute()
        db.client.table("contents").delete().eq("module_id", m.id).execute()
        db.client.table("activities").delete().eq("module_id", m.id).execute()
        db.client.table("modules").delete().eq("id", m.id).execute()
    db.client.table("tracks").delete().eq("id", track_id).execute()
    return {"success": True, "message": "Trilha removida"}


@router.get("/")
async def get_tracks(request: Request):
    capture = get_tracks_composer()
    current_user = request.state.current_user
    return capture(current_user.id)


@router.post("/")
async def create_trails(request: CreateTrailRequest, req: Request):
    capture = create_trail_composer()
    current_user = req.state.current_user
    return capture(current_user.id, request.theme)
