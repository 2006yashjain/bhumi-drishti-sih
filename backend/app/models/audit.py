from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.database.base import Base
from sqlalchemy.dialects.postgresql import JSONB

class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(Integer, primary_key=True, index=True)
    event_code = Column(String, unique=True, index=True)
    timestamp = Column(DateTime(timezone=True), index=True)
    actor_user_id = Column(String)
    actor_role = Column(String)
    event_type = Column(String, index=True)
    entity_type = Column(String)
    entity_id = Column(String)
    project_id = Column(String, index=True)
    action = Column(String)
    previous_state = Column(Text)
    new_state = Column(Text)
    reason = Column(Text)
    source_module = Column(String)
    related_record_id = Column(String)
    metadata_json = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
