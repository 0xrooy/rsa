from fastapi import FastAPI
from .routes import leaderboard
from .database import engine
from .models import Base

app = FastAPI()

# Create tables if not exist
Base.metadata.create_all(bind=engine)

# Include leaderboard routes
app.include_router(leaderboard.router, prefix="/api/leaderboard")
