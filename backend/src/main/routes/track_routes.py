from fastapi import APIRouter, Depends, Request

from src.main.composer.get_tracks_composer import get_tracks_composer
from src.main.composer.create_trail_composer import create_trail_composer
from src.main.dependencies import get_current_user

from src.dtos.create_trail_request import CreateTrailRequest

router = APIRouter(prefix="/tracks", tags=["tracks"], dependencies=[Depends(get_current_user)])


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
