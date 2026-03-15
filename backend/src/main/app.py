from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.errors import (
    BadRequestException,
    EmailException,
    InternalServerError,
    UserAuthenticateException,
    UserNotFoundException,
)
from src.main.handlers import (
    bad_request_exception_handler,
    email_exception_handler,
    auth_exception_handler,
    user_not_found_exception_handler,
    internal_server_exception_handler,
    unhandled_exception_handler,
)
from src.main.routes.auth_routes import router as auth_router
from src.main.routes.user_routes import router as user_router
from src.main.routes.track_routes import router as track_router
from src.main.routes.module_routes import router as module_router
from src.main.routes.respond_activity_routes import router as respond_activity_router


app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],  # Corrigido para o domínio do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(track_router)
app.include_router(module_router)
app.include_router(respond_activity_router)

# exception handlers
app.add_exception_handler(BadRequestException, bad_request_exception_handler)
app.add_exception_handler(EmailException, email_exception_handler)
app.add_exception_handler(UserAuthenticateException, auth_exception_handler)
app.add_exception_handler(UserNotFoundException, user_not_found_exception_handler)
app.add_exception_handler(InternalServerError, internal_server_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)
