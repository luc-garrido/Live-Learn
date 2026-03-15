from pydantic import BaseModel

class CreateTrailRequest(BaseModel):
    theme:str
