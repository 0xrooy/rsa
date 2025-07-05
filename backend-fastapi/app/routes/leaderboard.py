from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Gamer
from ..schemas import GamerOut
from typing import List

router = APIRouter(
    tags=["Leaderboard"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[GamerOut])
def get_leaderboard(db: Session = Depends(get_db)):
    return db.query(Gamer).order_by(Gamer.score.desc()).limit(10).all()

@router.get("/{username}", response_model=GamerOut)
def get_user(username: str, db: Session = Depends(get_db)):
    return db.query(Gamer).filter(Gamer.username == username).first()
