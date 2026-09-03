from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AuditEventOut(BaseModel):
    id: int
    event_code: str
    timestamp: datetime
    actor_user_id: Optional[str] = None
    actor_role: Optional[str] = None
    event_type: str
    entity_type: Optional[str] = None
    entity_id: Optional[str] = None
    project_id: Optional[str] = None
    action: str
    previous_state: Optional[str] = None
    new_state: Optional[str] = None
    reason: Optional[str] = None
    source_module: Optional[str] = None
    
    class Config:
        from_attributes = True
