from fastapi import Request
from fastapi.responses import JSONResponse

from src.errors import (
    BadRequestException,
    EmailException,
    InternalServerError,
    UserAuthenticateException,
    UserNotFoundException,
)
from src.errors.enums.errors_enums import ErrorEnum


def _error_response(exc: Exception):
    code = getattr(exc, "code", None)
    message = getattr(exc, "message", str(exc))

    status_code = 500
    # Handle explicit numeric status codes
    if isinstance(code, int):
        status_code = code
    else:
        error_enum = getattr(ErrorEnum, code, None)
        if error_enum:
            status_code = error_enum.code
            message = error_enum.message

    return status_code, {"message": message, "code": code}


async def bad_request_exception_handler(request: Request, exc: BadRequestException):
    status_code, body = _error_response(exc)
    return JSONResponse(status_code=status_code, content=body)


async def email_exception_handler(request: Request, exc: EmailException):
    status_code, body = _error_response(exc)
    return JSONResponse(status_code=status_code, content=body)


async def auth_exception_handler(request: Request, exc: UserAuthenticateException):
    status_code, body = _error_response(exc)
    return JSONResponse(status_code=status_code, content=body)


async def user_not_found_exception_handler(request: Request, exc: UserNotFoundException):
    status_code, body = _error_response(exc)
    return JSONResponse(status_code=status_code, content=body)


async def internal_server_exception_handler(request: Request, exc: InternalServerError):
    status_code, body = _error_response(exc)
    return JSONResponse(status_code=status_code, content=body)


async def unhandled_exception_handler(request: Request, exc: Exception):
    return JSONResponse(status_code=500, content={"message": str(exc), "code": "INTERNAL_SERVER_ERROR"})
