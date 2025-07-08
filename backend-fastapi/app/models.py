from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base  

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
    p = Column(Integer)
    q = Column(Integer)
    n = Column(Integer)
    phi = Column(Integer)
    e = Column(Integer)
    d = Column(Integer)
    plaintext = Column(String(255))
    encrypted = Column(String(255))

    # ✅ Add this relationship
    gamer = relationship("Gamer", back_populates="games")


