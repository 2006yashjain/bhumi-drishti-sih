from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class PublicNotice(Base):
    __tablename__ = "public_notices"

    id = Column(Integer, primary_key=True, index=True)
    notice_code = Column(String, unique=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    title = Column(String)
    category = Column(String)
    summary = Column(Text)
    published_at = Column(DateTime(timezone=True), index=True)
    is_public = Column(Boolean, default=True)
    document_url = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    project = relationship("Project", back_populates="notices")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    title = Column(String)
    document_type = Column(String)
    storage_path = Column(String)
    is_public = Column(Boolean, default=True)
    uploaded_by = Column(String)
    published_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
