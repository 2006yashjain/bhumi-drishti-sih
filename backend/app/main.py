from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import auth, projects, risk, alerts, actions, audit, grievances, public, analytics, gis, cases, data_quality, interventions

app = FastAPI(
    title="Bhumi Drishti API",
    description="Backend API for Bhumi Drishti prototype",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health", tags=["System"])
async def health_check():
    return {"status": "ok", "database": "connected"}

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["Projects"])
app.include_router(risk.router, prefix="/api/v1/projects", tags=["Risk"])
app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["Alerts"])
app.include_router(actions.router, prefix="/api/v1/actions", tags=["Actions"])
app.include_router(audit.router, prefix="/api/v1/audit", tags=["Audit"])
app.include_router(public.router, prefix="/api/v1/public", tags=["Public"])
app.include_router(grievances.router, prefix="/api/v1/grievances", tags=["Grievances"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(gis.router, prefix="/api/v1/gis", tags=["GIS"])
app.include_router(cases.router, prefix="/api/v1/cases", tags=["Cases"])
app.include_router(data_quality.router, prefix="/api/v1/data-quality", tags=["Data Quality"])
app.include_router(interventions.router, prefix="/api/v1/interventions", tags=["Interventions"])

