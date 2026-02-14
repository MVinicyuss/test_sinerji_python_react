from pydantic import BaseModel, EmailStr
from uuid import UUID

class UserCreate(BaseModel):
    nome: str
    email: EmailStr
    senha: str

class LoginRequest(BaseModel):
    email: EmailStr
    senha: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: UUID
    nome: str
    email: EmailStr

    class Config:
        from_attributes = True
