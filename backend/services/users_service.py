from sqlalchemy.orm import Session
from fastapi import HTTPException
from jose import jwt, JWTError

import models
import auth


def create_user(db: Session, nome: str, email: str, senha: str):
    existing_user = db.query(models.User).filter(models.User.email == email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    hashed_password = auth.hash_password(senha)

    user = models.User(
        nome=nome,
        email=email,
        senha=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, email: str, senha: str):
    user = db.query(models.User).filter(models.User.email == email).first()

    if not user or not auth.verify_password(senha, user.senha):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    return user


def get_current_user(db: Session, token: str):
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        email = payload.get("sub")

        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")

    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

    user = db.query(models.User).filter(models.User.email == email).first()

    if user is None:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")

    return user
