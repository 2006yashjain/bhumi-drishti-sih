import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings
from app.core.security import get_password_hash
from app.models.user import User
from app.models.project import Project, ProjectStage
from app.models.risk import RiskPrediction, FeatureAttribution
from app.models.alert import Alert, CorrectiveAction
from app.models.audit import AuditEvent
from app.models.grievance import Grievance
from app.models.notice import PublicNotice

engine = create_async_engine(settings.DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed_db():
    async with AsyncSessionLocal() as db:
        # Create user
        hashed_pw = get_password_hash("12345")
        guest_user = User(
            official_id="guest",
            name="Demo Official",
            email="demo@bhumidrishti.gov.in",
            password_hash=hashed_pw,
            role="DISTRICT_OFFICER",
            department="Revenue",
            district="Jaipur",
            state="Rajasthan"
        )
        db.add(guest_user)
        await db.commit()
        await db.refresh(guest_user)
        
        print("Guest user created.")
        
        # We can add P-1042 project
        project = Project(
            project_code="P-1042",
            project_name="NH-48 Jaipur–Kishangarh Expansion",
            project_type="Highway",
            description="Expansion of NH-48",
            state="Rajasthan",
            district="Jaipur",
            current_stage="COMPENSATION",
            public_progress=65,
            location="SRID=4326;POINT(75.7873 26.9124)"
        )
        db.add(project)
        await db.commit()
        await db.refresh(project)
        
        print("Project P-1042 created.")
        
        # Project stages, Risk Predictions, Feature attributions, Alerts, etc...
        risk = RiskPrediction(
            project_id=project.id,
            risk_probability=0.78,
            previous_probability=0.61,
            primary_driver="Pending Compensation",
            model_version="v2.1",
            risk_level="HIGH"
        )
        db.add(risk)
        await db.commit()
        await db.refresh(risk)

        # Add alert
        alert = Alert(
            alert_code="ALT-2048",
            project_id=project.id,
            type="DELAY_RISK",
            severity="HIGH",
            status="NEW",
            trigger_description="Compensation delays detected",
            department="Revenue"
        )
        db.add(alert)
        await db.commit()
        await db.refresh(alert)
        
        # Add action
        action = CorrectiveAction(
            action_code="ACT-3021",
            project_id=project.id,
            alert_id=alert.id,
            risk_driver="Pending Compensation",
            recommended_action="Expedite funds disbursement",
            priority="HIGH",
            status="ACTION_REQUIRED"
        )
        db.add(action)
        
        # Add audit event
        audit = AuditEvent(
            event_code="EVT-1001",
            actor_role="SYSTEM",
            event_type="RISK_EVALUATION",
            project_id=project.project_code,
            action="Risk evaluation completed",
            new_state="HIGH RISK"
        )
        db.add(audit)
        
        # Add Public Notice
        notice = PublicNotice(
            notice_code="NOTICE-1042-03",
            project_id=project.id,
            title="Public Hearing Information",
            category="Public Hearing",
            summary="Hearing scheduled for NH-48 Expansion.",
            is_public=True
        )
        db.add(notice)
        
        # Add Grievance
        grievance = Grievance(
            reference_code="BD-GRV-10482",
            project_id=project.id,
            category="Compensation",
            subject="Delay in compensation",
            description="My land was acquired but I haven't received funds.",
            status="UNDER_REVIEW"
        )
        db.add(grievance)
        await db.commit()
        
        print("P-1042 full demo record completely connected.")
        print("Database seeding completed successfully.")

if __name__ == "__main__":
    asyncio.run(seed_db())
