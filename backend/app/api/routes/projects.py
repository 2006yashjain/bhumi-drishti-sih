from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List, Optional
from app.database.session import get_db
from app.models.project import Project, ProjectStage
from app.schemas.project import ProjectOut, ProjectStageOut
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

from sqlalchemy import or_

@router.get("", response_model=List[ProjectOut])
async def get_projects(
    search: Optional[str] = None,
    state: Optional[str] = None,
    district: Optional[str] = None,
    stage: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = select(Project)
    if search:
        search_pattern = f"%{search}%"
        query = query.where(
            or_(
                Project.project_code.ilike(search_pattern),
                Project.project_name.ilike(search_pattern)
            )
        )
    if state:
        query = query.where(Project.state == state)
    if district:
        query = query.where(Project.district == district)
    if stage:
        query = query.where(Project.current_stage == stage)
    
    result = await db.execute(query.limit(100))
    return result.scalars().all()

@router.get("/{project_code}", response_model=ProjectOut)
async def get_project(project_code: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Project).where(Project.project_code == project_code))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/{project_code}/stages", response_model=List[ProjectStageOut])
async def get_project_stages(project_code: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Project).where(Project.project_code == project_code))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    stages_result = await db.execute(select(ProjectStage).where(ProjectStage.project_id == project.id).order_by(ProjectStage.stage_order))
    return stages_result.scalars().all()
