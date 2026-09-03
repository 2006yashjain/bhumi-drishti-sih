from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class GrievanceCreate(BaseModel):
    project_code: str
    category: str
    subject: str
    description: str
    name: str
    mobile: str
    email: Optional[str] = None

class GrievanceUpdateOut(BaseModel):
    update_type: Optional[str] = None
    public_message: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class PublicGrievanceOut(BaseModel):
    reference_code: str
    category: str
    subject: str
    description: str
    status: str
    submitted_at: Optional[datetime] = None
    last_updated: Optional[datetime] = None
    resolution_summary: Optional[str] = None
    updates: List[GrievanceUpdateOut] = []
    
    class Config:
        from_attributes = True

class GrievanceSubmissionResponse(BaseModel):
    reference_code: str
    status: str
    submitted_at: datetime
