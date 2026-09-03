#!/bin/bash
echo "Starting database..."
docker-compose up -d

echo "Running migrations..."
cd backend
source venv/bin/activate
alembic upgrade head

echo "Seeding data..."
python seed/seed_data.py

echo "Starting backend..."
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
