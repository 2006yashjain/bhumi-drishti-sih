from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.database.session import get_db
from app.models.audit import AuditEvent
from app.schemas.audit import AuditEventOut
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/events", response_model=List[AuditEventOut])
async def get_audit_events(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(AuditEvent).order_by(AuditEvent.timestamp.desc()).limit(100))
    return result.scalars().all()
