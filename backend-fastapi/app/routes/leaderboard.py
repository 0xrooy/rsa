from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Gamer
from app.schemas import GamerOut
from typing import List

router = APIRouter(
    tags=["Leaderboard"]
)

@router.get("/", response_model=List[GamerOut])
def get_leaderboard(db: Session = Depends(get_db)):
    return db.query(Gamer).order_by(Gamer.score.desc()).limit(10).all()

@router.get("/{username}", response_model=GamerOut)
def get_user(username: str, db: Session = Depends(get_db)):
    return db.query(Gamer).filter(Gamer.username == username).first()
