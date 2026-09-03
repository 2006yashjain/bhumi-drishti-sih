from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.session import get_db
from app.schemas.auth import LoginRequest, Token
from app.schemas.user import UserOut
from app.models.user import User
from app.core.security import verify_password, create_access_token
from app.core.dependencies import get_current_user

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.official_id == request.official_id))
    user = result.scalars().first()
    
    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect official ID or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.official_id})
    return {"access_token": access_token, "token_type": "bearer", "user": {"official_id": user.official_id, "role": user.role, "name": user.name}}

@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
