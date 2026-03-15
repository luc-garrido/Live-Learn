from fastapi import APIRouter, Depends, Path, Request

from src.main.composer.get_modules_composer import get_modules_composer
from src.main.composer.get_activities_composer import get_activities_composer
from src.main.composer.get_contents_composer import get_contents_composer
from src.main.composer.get_videos_composer import get_videos_composer

from src.main.dependencies import get_current_user

router = APIRouter(prefix="/modules", tags=["modules"], dependencies=[Depends(get_current_user)])


@router.get("/{id}")
async def get_modules( request: Request, id: int = Path(...) ):
    current_user = request.state.current_user
    capture = get_modules_composer()
    return capture(id, current_user.id)

@router.get("/{id}/activities")
async def get_activities(request: Request, id: int = Path(...)):
    current_user = request.state.current_user
    capture = get_activities_composer()
    return capture(id, current_user.id)

@router.get("/{id}/contents")
async def get_contents(request: Request, id: int = Path(...) ):
    current_user = request.state.current_user
    capture = get_contents_composer()
    return capture(id, current_user.id)

@router.get("/{id}/videos")
async def get_videos(request: Request, id: int = Path(...)):
    current_user = request.state.current_user
    capture = get_videos_composer()
    return capture(id, current_user.id)
