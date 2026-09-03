from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class Case(Base):
    __tablename__ = "cases"

    id = Column(Integer, primary_key=True, index=True)
    case_id = Column(String, unique=True, index=True) # e.g. BD-CAS-1042
    project_code = Column(String, index=True)
    parcel_id = Column(String, nullable=True)
    issue_type = Column(String)
    severity = Column(String)
    owner = Column(String)
    status = Column(String) # OPEN, ASSIGNED, IN PROGRESS, BLOCKED, RESOLVED, CLOSED
    escalation_level = Column(String)
    notes = Column(Text, nullable=True)
    resolution = Column(Text, nullable=True)
    
    due_date = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
