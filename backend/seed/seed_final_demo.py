import asyncio
from datetime import datetime, timedelta
import uuid
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.database.base import Base
from app.models import (
    Project, Case, DataQuality, Intervention, RiskHistory, RiskDimension, RiskPrediction, FeatureAttribution, AuditEvent, Alert
)

# Use SQLite path
DATABASE_URL = "sqlite+aiosqlite:///./bhumi_drishti.db"

engine = create_async_engine(DATABASE_URL, echo=False)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed():
    async with engine.begin() as conn:
        # Create all tables (this will add the new ones)
        await conn.run_sync(Base.metadata.create_all)
        
    async with async_session() as session:
        # Seed P-1042 Final Demo State
        project_code = "P-1042"
        
        # 1. 7D Risk Dimension
        dim = RiskDimension(
            project_code=project_code,
            land_record_risk=42,
            legal_dispute_risk=58,
            compensation_risk=91,
            rr_risk=74,
            admin_process_risk=63,
            financial_risk=47,
            spatial_project_impact_risk=69
        )
        session.add(dim)
        
        # 2. Risk History Trajectory (34 -> 51 -> 61 -> 78)
        now = datetime.utcnow()
        histories = [
            RiskHistory(project_code=project_code, assessment_date=now - timedelta(days=90), overall_risk=34, trend_classification="STABLE"),
            RiskHistory(project_code=project_code, assessment_date=now - timedelta(days=60), overall_risk=51, trend_classification="INCREASING"),
            RiskHistory(project_code=project_code, assessment_date=now - timedelta(days=30), overall_risk=61, trend_classification="INCREASING"),
            RiskHistory(project_code=project_code, assessment_date=now, overall_risk=78, trend_classification="RAPIDLY INCREASING")
        ]
        session.add_all(histories)
        
        # 3. Data Quality & Prediction Reliability
        dq = DataQuality(
            project_code=project_code,
            completeness_score=94.5,
            freshness_score=98.0,
            validity_score=99.1,
            overall_status="GOOD",
            critical_missing_fields="",
            prediction_reliability="HIGH",
            reliability_reason="Strong historical alignment and complete parcel geometry available."
        )
        session.add(dq)
        
        # 4. Cases / SLA Engine
        case1 = Case(
            case_id="BD-CAS-1042-01",
            project_code=project_code,
            issue_type="Pending Compensation",
            severity="CRITICAL",
            owner="Compensation Officer",
            status="ASSIGNED",
            escalation_level="State Warning",
            notes="18 unresolved compensation cases in critical spatial bottleneck.",
            due_date=now + timedelta(days=7),
            created_at=now - timedelta(days=2)
        )
        case2 = Case(
            case_id="BD-CAS-1042-02",
            project_code=project_code,
            issue_type="Legal Dispute",
            severity="HIGH",
            owner="Legal Reviewer",
            status="OPEN",
            escalation_level="None",
            notes="Stay order on parcel PCL-892",
            due_date=now + timedelta(days=14),
            created_at=now - timedelta(days=1)
        )
        session.add_all([case1, case2])
        
        # 5. Alert
        alert1 = Alert(
            alert_code="ALT-" + str(uuid.uuid4())[:8],
            project_id=1,
            severity="CRITICAL",
            type="Rapid Risk Increase Detected",
            trigger_description="Overall delay risk has increased to 78% driven by Compensation Risk (91%).",
            status="NEW",
            created_at=now
        )
        session.add(alert1)

        try:
            await session.commit()
            print("Successfully seeded final demo data for Phase 2-10 features.")
        except Exception as e:
            await session.rollback()
            print(f"Error seeding data (might already exist): {e}")

if __name__ == "__main__":
    asyncio.run(seed())
