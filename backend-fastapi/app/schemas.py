# schemas.py

from pydantic import BaseModel
from datetime import datetime

class GamerOut(BaseModel):
    userID: int
    username: str
    score: int

    class Config:
        orm_mode = True

class ExistingGameResponse(BaseModel):
    gameID: int
    gameName: str
    username: str
    currentScore: int
    gameStatus: str
    lastUpdated: datetime

    class Config:
        orm_mode = True
