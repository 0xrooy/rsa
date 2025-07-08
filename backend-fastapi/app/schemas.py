# schemas.py

from pydantic import BaseModel
from datetime import datetime

class LeaderboardEntry(BaseModel):
    gameID: int
    username: str
    score: int
    difficulty: str
    gameStatus: str
    lastUpdated: datetime

    class Config:
        orm_mode = True
