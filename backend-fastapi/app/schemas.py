from pydantic import BaseModel

class GamerOut(BaseModel):
    userID: int
    username: str
    score: int

    class Config:
        orm_mode = True
