from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Score

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_leaderboard(db: Session = Depends(get_db)):
    return db.query(Score).order_by(Score.points.desc()).limit(10).all()
