from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import leaderboard  # ✅ make sure this import works

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register the leaderboard router under /api/leaderboard
app.include_router(leaderboard.router, prefix="/api/leaderboard")
