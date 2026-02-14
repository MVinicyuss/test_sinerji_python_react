from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
import schemas
import auth
from services import users_service as user_service

router = APIRouter()

@router.post("/login", response_model=schemas.TokenResponse)
def login(data: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = user_service.authenticate_user(
        db,
        email=data.email,
        senha=data.senha
    )

    token = auth.create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return user_service.create_user(
        db,
        nome=user.nome,
        email=user.email,
        senha=user.senha
    )

@router.get("/users/profile", response_model=schemas.UserResponse)
def read_profile(
    db: Session = Depends(get_db),
    authorization: str = Depends(auth.oauth2_scheme)
):
    token = authorization.replace("Bearer ", "")
    user = user_service.get_current_user(db, token)

    return user
