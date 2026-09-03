from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.database.session import get_db
from app.models.alert import CorrectiveAction
from app.schemas.action import CorrectiveActionOut, ActionStatusUpdate
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("", response_model=List[CorrectiveActionOut])
async def get_actions(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(CorrectiveAction).limit(100))
    return result.scalars().all()
