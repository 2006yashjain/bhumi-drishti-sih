from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime

class ProjectStageBase(BaseModel):
    stage_name: str
    stage_order: int
    status: str
    start_date: Optional[date] = None
    expected_end_date: Optional[date] = None
    completed_date: Optional[date] = None
    delay_days: int = 0
    notes: Optional[str] = None

class ProjectStageOut(ProjectStageBase):
    id: int
    project_id: int
    
    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    project_code: str
    project_name: str
    project_type: Optional[str] = None
    description: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    village: Optional[str] = None
    land_area: Optional[str] = None
    affected_families: Optional[int] = None
    current_stage: Optional[str] = None
    public_progress: int = 0
    project_status: Optional[str] = None
    acquisition_start_date: Optional[date] = None
    expected_completion_date: Optional[date] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class ProjectOut(ProjectBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class PublicProjectOut(BaseModel):
    project_code: str
    project_name: str
    project_type: Optional[str] = None
    description: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    village: Optional[str] = None
    land_area: Optional[str] = None
    current_stage: Optional[str] = None
    public_progress: int = 0
    project_status: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    
    class Config:
        from_attributes = True
