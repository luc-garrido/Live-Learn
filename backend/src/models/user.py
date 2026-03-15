from pydantic import BaseModel
from uuid import UUID

class User(BaseModel):
    id: UUID
    email: str
    name: str
    password: str
