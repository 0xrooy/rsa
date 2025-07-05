from sqlalchemy import Column, Integer, String
from app.database import Base

class Gamer(Base):
    __tablename__ = "gamer"
    userID = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False)
    score = Column(Integer, nullable=False)
