from pydantic import BaseModel

class LeadCreate(BaseModel):
    name: str
    mobile: str
    email: str
    city: str
    market: str
    experience: str
    message: str