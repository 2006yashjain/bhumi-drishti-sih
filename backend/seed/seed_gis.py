import asyncio
import sys
import os
import json
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from app.core.config import settings
from app.models.project import Project
from app.models.gis import ProjectCorridor, Parcel, Bottleneck

engine = create_async_engine(settings.DATABASE_URL)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def seed_gis():
    async with AsyncSessionLocal() as db:
        # Get P-1042
        result = await db.execute(select(Project).where(Project.project_code == "P-1042"))
        p1042 = result.scalars().first()
        if not p1042:
            print("Project P-1042 not found.")
            return

        # Check if GIS data already seeded
        result = await db.execute(select(ProjectCorridor).where(ProjectCorridor.project_id == p1042.id))
        if result.scalars().first():
            print("GIS data already seeded for P-1042.")
            return

        # 1. Add Corridor
        # Synthetic GeoJSON for NH-48 Jaipur stretch (approx)
        corridor_geom = {
            "type": "LineString",
            "coordinates": [
                [75.78, 26.91], [75.70, 26.85], [75.60, 26.75], [75.50, 26.65]
            ]
        }
        corridor = ProjectCorridor(
            project_id=p1042.id,
            geometry_geojson=json.dumps(corridor_geom),
            total_length_km=100.0,
            acquired_length_km=95.0,
            pending_length_km=5.0
        )
        db.add(corridor)

        # 2. Add Parcels
        parcels = [
            Parcel(parcel_id="P-1042-001", project_id=p1042.id, geometry_geojson=json.dumps({"type":"Polygon","coordinates":[[[75.78,26.91],[75.781,26.91],[75.781,26.911],[75.78,26.911],[75.78,26.91]]]}), area_hectares=4.8, acquisition_status="ACQUIRED", compensation_status="PAID", legal_status="CLEAR", acquisition_duration_months=12, affected_parties=3, risk_score=21, risk_level="LOW", spatial_criticality="LOW"),
            Parcel(parcel_id="P-1042-002", project_id=p1042.id, geometry_geojson=json.dumps({"type":"Polygon","coordinates":[[[75.70,26.85],[75.701,26.85],[75.701,26.851],[75.70,26.851],[75.70,26.85]]]}), area_hectares=2.1, acquisition_status="UNDER PROCESS", compensation_status="PENDING", legal_status="CLEAR", acquisition_duration_months=8, affected_parties=1, risk_score=45, risk_level="MODERATE", spatial_criticality="MODERATE"),
            Parcel(parcel_id="P-1042-003", project_id=p1042.id, geometry_geojson=json.dumps({"type":"Polygon","coordinates":[[[75.60,26.75],[75.601,26.75],[75.601,26.751],[75.60,26.751],[75.60,26.75]]]}), area_hectares=4.8, acquisition_status="UNDER PROCESS", compensation_status="PAID", legal_status="DISPUTE", acquisition_duration_months=14, affected_parties=3, risk_score=87, risk_level="CRITICAL", spatial_criticality="HIGH"),
            Parcel(parcel_id="P-1042-004", project_id=p1042.id, geometry_geojson=json.dumps({"type":"Polygon","coordinates":[[[75.50,26.65],[75.501,26.65],[75.501,26.651],[75.50,26.651],[75.50,26.65]]]}), area_hectares=3.5, acquisition_status="COMPENSATION PENDING", compensation_status="PENDING", legal_status="CLEAR", acquisition_duration_months=9, affected_parties=5, risk_score=78, risk_level="HIGH", spatial_criticality="HIGH"),
            Parcel(parcel_id="P-1042-005", project_id=p1042.id, geometry_geojson=json.dumps({"type":"Polygon","coordinates":[[[75.51,26.66],[75.511,26.66],[75.511,26.661],[75.51,26.661],[75.51,26.66]]]}), area_hectares=1.2, acquisition_status="LEGAL / OWNERSHIP ISSUE", compensation_status="NOT STARTED", legal_status="COURT STAY", acquisition_duration_months=24, affected_parties=8, risk_score=92, risk_level="CRITICAL", spatial_criticality="CRITICAL")
        ]
        db.add_all(parcels)

        # 3. Add Bottleneck
        bottleneck = Bottleneck(
            bottleneck_id="BT-1042-01",
            project_id=p1042.id,
            geometry_geojson=json.dumps({"type":"LineString","coordinates":[[75.60,26.75],[75.50,26.65]]}),
            blocked_length_km=2.3,
            affected_parcels=15,
            high_risk_parcels=7,
            spatial_criticality="HIGH",
            continuity_blocked=True,
            status="ACTIVE"
        )
        db.add(bottleneck)
        
        await db.commit()
        print("GIS seed completed for P-1042.")

if __name__ == "__main__":
    asyncio.run(seed_gis())
