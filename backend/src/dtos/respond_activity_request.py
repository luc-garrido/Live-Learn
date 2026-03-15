from pydantic import BaseModel

class RespondActivityRequest(BaseModel):
    selected_option: str
