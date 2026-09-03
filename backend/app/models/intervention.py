from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from app.database.base import Base

class Intervention(Base):
    __tablename__ = "interventions"

    id = Column(Integer, primary_key=True, index=True)
    project_code = Column(String, index=True)
    case_id = Column(String, nullable=True)
    action_taken = Column(String)
    officer = Column(String)
    risk_before = Column(Float)
    risk_after = Column(Float)
    status = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
