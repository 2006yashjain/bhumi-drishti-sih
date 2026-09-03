from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CorrectiveActionOut(BaseModel):
    id: int
    action_code: str
    project_id: int
    alert_id: Optional[int] = None
    risk_driver: Optional[str] = None
    recommended_action: Optional[str] = None
    priority: Optional[str] = None
    assigned_user_id: Optional[int] = None
    department: Optional[str] = None
    target_date: Optional[datetime] = None
    status: str
    notes: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

class ActionStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None
