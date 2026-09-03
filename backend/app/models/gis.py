from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class ProjectCorridor(Base):
    __tablename__ = "project_corridors"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    geometry_geojson = Column(String)  # GeoJSON LineString or Polygon
    total_length_km = Column(Float)
    acquired_length_km = Column(Float)
    pending_length_km = Column(Float)
    
    project = relationship("Project", backref="corridor")

class Parcel(Base):
    __tablename__ = "parcels"
    
    id = Column(Integer, primary_key=True, index=True)
    parcel_id = Column(String, unique=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    geometry_geojson = Column(String)  # GeoJSON Polygon
    area_hectares = Column(Float)
    acquisition_status = Column(String) # ACQUIRED, UNDER PROCESS, COMPENSATION PENDING, LEGAL / OWNERSHIP ISSUE, NOT ACQUIRED
    compensation_status = Column(String)
    legal_status = Column(String)
    acquisition_duration_months = Column(Integer)
    affected_parties = Column(Integer)
    risk_score = Column(Float)
    risk_level = Column(String)
    spatial_criticality = Column(String) # LOW, MODERATE, HIGH, CRITICAL
    
    project = relationship("Project", backref="parcels")

class Bottleneck(Base):
    __tablename__ = "bottlenecks"
    
    id = Column(Integer, primary_key=True, index=True)
    bottleneck_id = Column(String, unique=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    geometry_geojson = Column(String)
    blocked_length_km = Column(Float)
    affected_parcels = Column(Integer)
    high_risk_parcels = Column(Integer)
    spatial_criticality = Column(String)
    continuity_blocked = Column(Boolean)
    status = Column(String)
    
    project = relationship("Project", backref="bottlenecks")
