# Bhumi Drishti Backend

This is the FastAPI backend for the Bhumi Drishti prototype. It uses PostgreSQL with PostGIS for spatial data, SQLAlchemy for ORM, and Alembic for migrations.

## Prerequisites
- Docker (for database)
- Python 3.10+

## Environment Setup
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Database Startup
```bash
cd ..
docker-compose up -d
```

## Migrations
```bash
cd backend
alembic upgrade head
```

## Seed Database
> **Note:** The data seeded is strictly SYNTHETIC PROTOTYPE data. No real models or government datasets are used.
```bash
python seed/seed_data.py
```

## Start Backend
```bash
uvicorn app.main:app --reload
```
API Docs will be available at: http://localhost:8000/docs

## Demo Credentials
**Official ID**: guest
**Password**: 12345
(This is a prototype account for demo purposes only)

## Testing
```bash
pytest tests/
```
