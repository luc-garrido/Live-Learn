from fastapi import APIRouter

from src.main.composer.create_user_composer import create_user_composer
from src.dtos.user_dtos import CreateUserRequest

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/")
async def create_user(request: CreateUserRequest):
    capture = create_user_composer()
    return capture(request.email, request.name, request.password)
