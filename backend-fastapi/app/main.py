from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import leaderboard  # <-- your route module

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leaderboard.router)
