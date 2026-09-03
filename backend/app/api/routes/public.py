from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import func
from sqlalchemy.orm import selectinload
from typing import List
from app.database.session import get_db
from app.models.project import Project
from app.schemas.project import PublicProjectOut
from app.models.notice import PublicNotice
from app.schemas.notice import PublicNoticeOut

router = APIRouter()

from typing import List, Optional
from sqlalchemy import or_

@router.get("/projects", response_model=List[PublicProjectOut])
async def get_public_projects(search: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    query = select(Project)
    if search:
        search_pattern = f"%{search}%"
        query = query.where(
            or_(
                Project.project_code.ilike(search_pattern),
                Project.project_name.ilike(search_pattern),
                Project.district.ilike(search_pattern)
            )
        )
    result = await db.execute(query.limit(50))
    return result.scalars().all()

@router.get("/projects/{project_code}", response_model=PublicProjectOut)
async def get_public_project(project_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).where(Project.project_code == project_code))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/notices", response_model=List[PublicNoticeOut])
async def get_public_notices(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PublicNotice).where(PublicNotice.is_public == True).order_by(PublicNotice.published_at.desc()))
    return result.scalars().all()

from app.models.grievance import Grievance, GrievanceContact, GrievanceUpdate
from app.schemas.grievance import GrievanceCreate, GrievanceSubmissionResponse, PublicGrievanceOut
import uuid

@router.post("/grievances", response_model=GrievanceSubmissionResponse)
async def submit_grievance(request: GrievanceCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Project).where(Project.project_code == request.project_code))
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
        
    ref_code = f"BD-GRV-{str(uuid.uuid4().int)[:5]}"
    
    grievance = Grievance(
        reference_code=ref_code,
        project_id=project.id,
        category=request.category,
        subject=request.subject,
        description=request.description,
        status="SUBMITTED",
        submitted_at=func.now(),
        last_updated=func.now()
    )
    db.add(grievance)
    await db.flush()
    
    contact = GrievanceContact(
        grievance_id=grievance.id,
        name=request.name,
        mobile=request.mobile,
        email=request.email
    )
    db.add(contact)
    
    update = GrievanceUpdate(
        grievance_id=grievance.id,
        update_type="STATUS_CHANGE",
        public_message="Grievance submitted successfully.",
        created_by="SYSTEM"
    )
    db.add(update)
    
    await db.commit()
    return {"reference_code": ref_code, "status": "SUBMITTED", "submitted_at": grievance.submitted_at or "2026-09-03T12:00:00Z"}

@router.get("/grievances/{reference_code}", response_model=PublicGrievanceOut)
async def track_grievance(reference_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Grievance)
        .options(selectinload(Grievance.updates))
        .where(Grievance.reference_code == reference_code)
    )
    grievance = result.scalars().first()
    if not grievance:
        raise HTTPException(status_code=404, detail="Grievance not found")
    return grievance
