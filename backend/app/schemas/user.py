from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    official_id: str
    name: str
    email: Optional[str] = None
    role: str
    department: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None

class UserOut(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
