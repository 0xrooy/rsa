from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.database import get_db
from app.models import Game, Gamer
from pydantic import BaseModel

router = APIRouter(
    tags=["ExistingGame"]
)

# Pydantic response model
class ExistingGameResponse(BaseModel):
    gameID: int
    gameName: str
    username: str
    currentScore: int
    gameStatus: str
    lastUpdated: datetime

    class Config:
        orm_mode = True

@router.get("/games", response_model=List[ExistingGameResponse])
def get_existing_games(db: Session = Depends(get_db)):
    games = db.query(Game).join(Gamer, Game.userID == Gamer.userID).all()

    if not games:
        raise HTTPException(status_code=404, detail="No existing games found.")

    return [
        ExistingGameResponse(
            gameID=game.gameID,
            gameName=game.gameName,
            username=game.gamer.username if hasattr(game, "gamer") else "Unknown",
            currentScore=game.currentScore,
            gameStatus=game.gameStatus,
            lastUpdated=game.lastUpdated
        )
        for game in games
    ]
