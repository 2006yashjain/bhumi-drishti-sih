from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.session import get_db
from app.models.case import Case

router = APIRouter()

@router.get("/")
async def get_all_cases(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Case).order_by(Case.created_at.desc()))
    return result.scalars().all()

@router.get("/project/{project_code}")
async def get_project_cases(project_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Case).where(Case.project_code == project_code).order_by(Case.created_at.desc()))
    return result.scalars().all()
