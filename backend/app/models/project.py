from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.database.base import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    project_code = Column(String, unique=True, index=True, nullable=False)
    project_name = Column(String, nullable=False)
    project_type = Column(String)
    description = Column(Text)

    state = Column(String, index=True)
    district = Column(String, index=True)
    village = Column(String)

    land_area = Column(String)
    affected_families = Column(Integer)

    current_stage = Column(String, index=True)
    public_progress = Column(Integer, default=0)
    project_status = Column(String)

    acquisition_start_date = Column(Date)
    expected_completion_date = Column(Date)

    latitude = Column(Float)
    longitude = Column(Float)
    
    # PostGIS location
    location = Column(String, nullable=True) # Changed from Geometry to String for SQLite

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    stages = relationship("ProjectStage", back_populates="project")
    risks = relationship("RiskPrediction", back_populates="project")
    alerts = relationship("Alert", back_populates="project")
    grievances = relationship("Grievance", back_populates="project")
    notices = relationship("PublicNotice", back_populates="project")

class ProjectStage(Base):
    __tablename__ = "project_stages"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    stage_name = Column(String, nullable=False)
    stage_order = Column(Integer)
    status = Column(String) # COMPLETED, IN_PROGRESS, UPCOMING
    start_date = Column(Date)
    expected_end_date = Column(Date)
    completed_date = Column(Date)
    delay_days = Column(Integer, default=0)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    project = relationship("Project", back_populates="stages")
