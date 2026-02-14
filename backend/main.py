from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine

from models import User

from routes import users

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Teste API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost",
        "http://localhost:80"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)

@app.get("/health")
def health_check():
    return {"status": "API running"}
