from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base  # ✅ Add this line

class Gamer(Base):
    __tablename__ = 'gamer'
    userID = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    score = Column(Integer)
    games = relationship("Game", back_populates="gamer")

class Game(Base):
    __tablename__ = 'games'
    gameID = Column(Integer, primary_key=True, index=True)
    userID = Column(Integer, ForeignKey('gamer.userID'))
    gameName = Column(String(100))
    currentScore = Column(Integer)
    gameStatus = Column(String(20))
    lastUpdated = Column(DateTime)
    createdAt = Column(DateTime)

    gamer = relationship("Gamer", back_populates="games")
