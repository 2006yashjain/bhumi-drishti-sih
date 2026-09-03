from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.database.session import get_db
from app.models.alert import Alert
from app.schemas.alert import AlertOut, AlertActionRequest
from app.core.dependencies import get_current_user
from app.models.user import User
from sqlalchemy.sql import func

router = APIRouter()

@router.get("", response_model=List[AlertOut])
async def get_alerts(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Alert).limit(100))
    return result.scalars().all()

@router.get("/{alert_code}", response_model=AlertOut)
async def get_alert(alert_code: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Alert).where(Alert.alert_code == alert_code))
    alert = result.scalars().first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    return alert

@router.post("/{alert_code}/acknowledge", response_model=AlertOut)
async def acknowledge_alert(alert_code: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Alert).where(Alert.alert_code == alert_code))
    alert = result.scalars().first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    
    if alert.status not in ["NEW", "IN_PROGRESS"]:
        raise HTTPException(status_code=400, detail="Invalid status transition")
        
    alert.status = "ACKNOWLEDGED"
    alert.acknowledged_at = func.now()
    alert.assigned_user_id = current_user.id
    
    await db.commit()
    await db.refresh(alert)
    return alert
