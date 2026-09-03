from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from app.database.session import get_db
from app.models.project import Project
from app.models.risk import RiskPrediction
from app.schemas.risk import RiskPredictionOut
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.get("/{project_code}/risk", response_model=RiskPredictionOut)
async def get_project_risk(project_code: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Project).where(Project.project_code == project_code))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    risk_result = await db.execute(
        select(RiskPrediction)
        .options(selectinload(RiskPrediction.feature_attributions))
        .where(RiskPrediction.project_id == project.id)
        .order_by(RiskPrediction.prediction_timestamp.desc())
    )
    risk = risk_result.scalars().first()
    if not risk:
        raise HTTPException(status_code=404, detail="Risk prediction not found")
    return risk

from app.models.risk import RiskHistory, RiskDimension

@router.get("/{project_code}/trajectory")
async def get_risk_trajectory(project_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RiskHistory).where(RiskHistory.project_code == project_code).order_by(RiskHistory.assessment_date.asc()))
    return result.scalars().all()

@router.get("/{project_code}/dimensions")
async def get_risk_dimensions(project_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RiskDimension).where(RiskDimension.project_code == project_code))
    dim = result.scalars().first()
    if not dim:
        raise HTTPException(status_code=404, detail="Dimensions not found")
    return dim
