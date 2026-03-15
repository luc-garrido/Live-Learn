from fastapi import APIRouter, Depends, Query, Request

from src.main.composer.respond_activity_composer import respond_activity_composer
from src.dtos.respond_activity_request import RespondActivityRequest
from src.main.dependencies import get_current_user

router = APIRouter(prefix="/responderAtividade", tags=["activities"], dependencies=[Depends(get_current_user)])


@router.post("/")
async def respond_activity(request: RespondActivityRequest, req: Request, id: int = Query(...)):
    current_user = req.state.current_user
    capture = respond_activity_composer()
    return capture(id, request.selected_option, current_user.id)
