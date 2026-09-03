from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(Integer, primary_key=True, index=True)
    reference_code = Column(String, unique=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    category = Column(String)
    subject = Column(String)
    description = Column(Text)
    status = Column(String, index=True)
    submitted_at = Column(DateTime(timezone=True))
    last_updated = Column(DateTime(timezone=True))
    resolution_summary = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    project = relationship("Project", back_populates="grievances")
    updates = relationship("GrievanceUpdate", back_populates="grievance")
    contact = relationship("GrievanceContact", back_populates="grievance", uselist=False)

class GrievanceContact(Base):
    __tablename__ = "grievance_contacts"

    id = Column(Integer, primary_key=True, index=True)
    grievance_id = Column(Integer, ForeignKey("grievances.id"))
    name = Column(String)
    mobile = Column(String)
    email = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    grievance = relationship("Grievance", back_populates="contact")

class GrievanceUpdate(Base):
    __tablename__ = "grievance_updates"

    id = Column(Integer, primary_key=True, index=True)
    grievance_id = Column(Integer, ForeignKey("grievances.id"))
    update_type = Column(String)
    public_message = Column(Text)
    internal_note = Column(Text)
    created_by = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    grievance = relationship("Grievance", back_populates="updates")
