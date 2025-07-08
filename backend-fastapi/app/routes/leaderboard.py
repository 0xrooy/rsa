from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User, Game
from app.schemas import LeaderboardEntry
from typing import List

router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard"]
)

@router.get("/", response_model=List[LeaderboardEntry])
def get_leaderboard(db: Session = Depends(get_db)):
    results = (
        db.query(Game)
        .join(User)
        .with_entities(
            Game.gameID,
            User.username,
            Game.score,
            Game.difficulty,
            Game.gameStatus,
            Game.lastUpdated
        )
        .order_by(Game.score.desc())
        .limit(10)
        .all()
    )
    return results

@router.get("/{username}", response_model=List[LeaderboardEntry])
def get_games_by_user(username: str, db: Session = Depends(get_db)):
    results = (
        db.query(Game)
        .join(User)
        .filter(User.username == username)
        .with_entities(
            Game.gameID,
            User.username,
            Game.score,
            Game.difficulty,
            Game.gameStatus,
            Game.lastUpdated
        )
        .order_by(Game.lastUpdated.desc())
        .all()
    )
    return results
