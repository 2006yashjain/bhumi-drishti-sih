from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    alert_code = Column(String, unique=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    type = Column(String)
    severity = Column(String, index=True)
    status = Column(String, index=True)
    trigger_description = Column(Text)
    threshold_value = Column(String)
    observed_value = Column(String)
    assigned_user_id = Column(Integer, ForeignKey("users.id"))
    department = Column(String)
    target_date = Column(DateTime(timezone=True))
    acknowledged_at = Column(DateTime(timezone=True))
    resolved_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    project = relationship("Project", back_populates="alerts")
    corrective_actions = relationship("CorrectiveAction", back_populates="alert")
    assigned_user = relationship("User")

class CorrectiveAction(Base):
    __tablename__ = "corrective_actions"

    id = Column(Integer, primary_key=True, index=True)
    action_code = Column(String, unique=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    alert_id = Column(Integer, ForeignKey("alerts.id"))
    risk_driver = Column(String)
    recommended_action = Column(Text)
    priority = Column(String)
    assigned_user_id = Column(Integer, ForeignKey("users.id"))
    department = Column(String)
    target_date = Column(DateTime(timezone=True))
    status = Column(String, index=True)
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    completed_at = Column(DateTime(timezone=True))

    project = relationship("Project")
    alert = relationship("Alert", back_populates="corrective_actions")
    assigned_user = relationship("User")
