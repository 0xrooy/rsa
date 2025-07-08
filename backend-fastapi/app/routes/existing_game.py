from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List
from datetime import datetime

from app.database import get_db
from app.models import Game, Gamer
from pydantic import BaseModel
from typing import Optional

router = APIRouter(tags=["Games"])


class GameListResponse(BaseModel):
    gameID: int
    gameName: Optional[str]
    username: Optional[str]
    currentScore: Optional[int]
    gameStatus: Optional[str]
    lastUpdated: Optional[datetime]

    class Config:
        orm_mode = True




class FullGameResponse(GameListResponse):
    p: int
    q: int
    n: int
    phi: int
    e: int
    d: int
    plaintext: str
    encrypted: str


@router.get("", response_model=List[GameListResponse])
def get_existing_games(db: Session = Depends(get_db)):
    try:
        games = db.query(Game).options(joinedload(Game.gamer)).all()
        print(f"[INFO] Retrieved {len(games)} games")

        result = []
        for g in games:
            if not g.gamer:
                print(f"[WARN] Skipping game {g.gameID}: no gamer")
                continue

            result.append(GameListResponse(
                gameID=g.gameID,
                gameName=g.gameName or "Untitled Game",
                username=g.gamer.username or "Unknown",
                currentScore=g.currentScore or 0,
                gameStatus=g.gameStatus or "unknown",
                lastUpdated=g.lastUpdated or datetime.now()
            ))
        return result
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error.")




@router.get("/{game_id}", response_model=FullGameResponse)
def get_game_by_id(game_id: int, db: Session = Depends(get_db)):
    game = db.query(Game).options(joinedload(Game.gamer)).filter(Game.gameID == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found.")
    return FullGameResponse(
        gameID=game.gameID,
        gameName=game.gameName,
        username=game.gamer.username,
        currentScore=game.currentScore,
        gameStatus=game.gameStatus,
        lastUpdated=game.lastUpdated,
        p=game.p, q=game.q, n=game.n, phi=game.phi, e=game.e, d=game.d,
        plaintext=game.plaintext, encrypted=game.encrypted
    )
