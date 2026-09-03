from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.base import Base

class RiskPrediction(Base):
    __tablename__ = "risk_predictions"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    stage_name = Column(String)
    risk_probability = Column(Float)
    risk_level = Column(String)
    previous_probability = Column(Float)
    risk_change = Column(String)
    primary_driver = Column(String)
    model_version = Column(String)
    prediction_timestamp = Column(DateTime(timezone=True), index=True)
    expected_completion_min_days = Column(Integer)
    expected_completion_max_days = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    project = relationship("Project", back_populates="risks")
    feature_attributions = relationship("FeatureAttribution", back_populates="risk_prediction")

class FeatureAttribution(Base):
    __tablename__ = "risk_feature_attributions"

    id = Column(Integer, primary_key=True, index=True)
    risk_prediction_id = Column(Integer, ForeignKey("risk_predictions.id"))
    feature_name = Column(String)
    feature_value = Column(String)
    contribution = Column(Float)
    rank = Column(Integer)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    risk_prediction = relationship("RiskPrediction", back_populates="feature_attributions")

class RiskHistory(Base):
    __tablename__ = "risk_history"

    id = Column(Integer, primary_key=True, index=True)
    project_code = Column(String, index=True)
    assessment_date = Column(DateTime(timezone=True))
    overall_risk = Column(Float)
    trend_classification = Column(String) # STABLE, INCREASING, RAPIDLY INCREASING, DECREASING, NEWLY CRITICAL

class RiskDimension(Base):
    __tablename__ = "risk_dimensions"

    id = Column(Integer, primary_key=True, index=True)
    project_code = Column(String, unique=True, index=True)
    land_record_risk = Column(Float)
    legal_dispute_risk = Column(Float)
    compensation_risk = Column(Float)
    rr_risk = Column(Float)
    admin_process_risk = Column(Float)
    financial_risk = Column(Float)
    spatial_project_impact_risk = Column(Float)
