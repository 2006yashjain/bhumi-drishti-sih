from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.session import get_db
from app.models.data_quality import DataQuality

router = APIRouter()

@router.get("/{project_code}")
async def get_data_quality(project_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DataQuality).where(DataQuality.project_code == project_code))
    dq = result.scalars().first()
    if not dq:
        raise HTTPException(status_code=404, detail="Data quality record not found")
    return dq
