from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.session import get_db
from app.models.intervention import Intervention

router = APIRouter()

@router.post("/")
async def create_intervention(intervention_data: dict, db: AsyncSession = Depends(get_db)):
    intervention = Intervention(**intervention_data)
    db.add(intervention)
    await db.commit()
    await db.refresh(intervention)
    return intervention

@router.get("/project/{project_code}")
async def get_project_interventions(project_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Intervention).where(Intervention.project_code == project_code).order_by(Intervention.timestamp.desc()))
    return result.scalars().all()
