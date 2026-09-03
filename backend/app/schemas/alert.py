from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AlertBase(BaseModel):
    alert_code: str
    type: str
    severity: str
    status: str
    trigger_description: Optional[str] = None
    threshold_value: Optional[str] = None
    observed_value: Optional[str] = None
    department: Optional[str] = None

class AlertOut(AlertBase):
    id: int
    project_id: int
    assigned_user_id: Optional[int] = None
    target_date: Optional[datetime] = None
    acknowledged_at: Optional[datetime] = None
    resolved_at: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True

class AlertActionRequest(BaseModel):
    status: str
    notes: Optional[str] = None
