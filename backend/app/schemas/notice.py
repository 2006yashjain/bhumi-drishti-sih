from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PublicNoticeOut(BaseModel):
    notice_code: str
    title: str
    category: str
    summary: Optional[str] = None
    published_at: Optional[datetime] = None
    document_url: Optional[str] = None
    
    class Config:
        from_attributes = True
