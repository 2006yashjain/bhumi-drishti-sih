from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class FeatureAttributionOut(BaseModel):
    feature_name: str
    feature_value: Optional[str] = None
    contribution: float
    rank: int
    
    class Config:
        from_attributes = True

class RiskPredictionOut(BaseModel):
    id: int
    project_id: int
    stage_name: Optional[str] = None
    risk_probability: float = Field(..., ge=0.0, le=1.0)
    risk_level: Optional[str] = None
    previous_probability: Optional[float] = None
    risk_change: Optional[str] = None
    primary_driver: Optional[str] = None
    model_version: Optional[str] = None
    prediction_timestamp: Optional[datetime] = None
    expected_completion_min_days: Optional[int] = None
    expected_completion_max_days: Optional[int] = None
    feature_attributions: List[FeatureAttributionOut] = []

    class Config:
        from_attributes = True
