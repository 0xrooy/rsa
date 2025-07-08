# models.py

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    userID = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)

    games = relationship("Game", back_populates="user")

class Game(Base):
    __tablename__ = "games"
    gameID = Column(Integer, primary_key=True, index=True)
    userID = Column(Integer, ForeignKey("users.userID"))
    score = Column(Integer)
    difficulty = Column(String(20))
    gameStatus = Column(String(20))
    lastUpdated = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="games")
