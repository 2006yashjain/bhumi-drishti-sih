from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from app.database.session import get_db
from app.models.project import Project
from app.models.gis import ProjectCorridor, Parcel, Bottleneck

router = APIRouter()

@router.get("/projects/{project_code}")
async def get_project_gis(project_code: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Project)
        .where(Project.project_code == project_code)
    )
    project = result.scalars().first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Fetch corridor
    corridor_result = await db.execute(select(ProjectCorridor).where(ProjectCorridor.project_id == project.id))
    corridor = corridor_result.scalars().first()

    # Fetch parcels
    parcels_result = await db.execute(select(Parcel).where(Parcel.project_id == project.id))
    parcels = parcels_result.scalars().all()

    # Fetch bottlenecks
    bottlenecks_result = await db.execute(select(Bottleneck).where(Bottleneck.project_id == project.id))
    bottlenecks = bottlenecks_result.scalars().all()

    return {
        "project": {
            "project_code": project.project_code,
            "project_name": project.project_name,
            "current_stage": project.current_stage,
            "district": project.district,
            "state": project.state
        },
        "corridor": {
            "total_length_km": corridor.total_length_km if corridor else 0,
            "acquired_length_km": corridor.acquired_length_km if corridor else 0,
            "pending_length_km": corridor.pending_length_km if corridor else 0,
            "geometry": corridor.geometry_geojson if corridor else None
        },
        "parcels": [
            {
                "parcel_id": p.parcel_id,
                "area_hectares": p.area_hectares,
                "acquisition_status": p.acquisition_status,
                "compensation_status": p.compensation_status,
                "legal_status": p.legal_status,
                "acquisition_duration_months": p.acquisition_duration_months,
                "affected_parties": p.affected_parties,
                "risk_score": p.risk_score,
                "risk_level": p.risk_level,
                "spatial_criticality": p.spatial_criticality,
                "geometry": p.geometry_geojson
            } for p in parcels
        ],
        "bottlenecks": [
            {
                "bottleneck_id": b.bottleneck_id,
                "blocked_length_km": b.blocked_length_km,
                "affected_parcels": b.affected_parcels,
                "high_risk_parcels": b.high_risk_parcels,
                "spatial_criticality": b.spatial_criticality,
                "continuity_blocked": b.continuity_blocked,
                "status": b.status,
                "geometry": b.geometry_geojson
            } for b in bottlenecks
        ]
    }

@router.get("/projects")
async def list_projects_gis(db: AsyncSession = Depends(get_db)):
    # Fetch all projects
    projects_result = await db.execute(select(Project))
    projects = projects_result.scalars().all()
    
    response = []
    for p in projects:
        # For prototype speed, just fetch if they have bottlenecks
        bottlenecks_result = await db.execute(select(Bottleneck).where(Bottleneck.project_id == p.id))
        bottlenecks = bottlenecks_result.scalars().all()
        
        response.append({
            "project_code": p.project_code,
            "project_name": p.project_name,
            "current_stage": p.current_stage,
            "district": p.district,
            "state": p.state,
            "has_bottlenecks": len(bottlenecks) > 0,
            "bottleneck_count": len(bottlenecks)
        })
        
    return response
