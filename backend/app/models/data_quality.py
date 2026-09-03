from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.database.base import Base

class DataQuality(Base):
    __tablename__ = "data_quality"

    id = Column(Integer, primary_key=True, index=True)
    project_code = Column(String, unique=True, index=True)
    completeness_score = Column(Float)
    freshness_score = Column(Float)
    validity_score = Column(Float)
    overall_status = Column(String) # GOOD, WARNING, POOR
    critical_missing_fields = Column(String) # comma separated
    prediction_reliability = Column(String) # HIGH, MEDIUM, LOW
    reliability_reason = Column(String)
    last_validated = Column(DateTime(timezone=True), server_default=func.now())
