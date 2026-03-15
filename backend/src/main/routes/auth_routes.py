from fastapi import APIRouter

from src.main.composer.auth_composer import auth_composer
from src.main.composer.refresh_token_composer import refresh_token_composer
from src.dtos.user_dtos import AuthRequest, RefreshTokenRequest

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/")
async def authenticate(request: AuthRequest):
    capture = auth_composer()
    return capture(request.email, request.password)


@router.post("/refresh")
async def refresh_token(request: RefreshTokenRequest):
    capture = refresh_token_composer()
    return capture(request.refresh_token)
