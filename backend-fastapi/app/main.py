from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import leaderboard, existingGame

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev. Replace with actual origin in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Register the leaderboard router under /api/leaderboard
app.include_router(leaderboard.router, prefix="/api/leaderboard")
app.include_router(existingGame.router, prefix="/api")