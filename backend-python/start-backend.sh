#!/bin/bash

echo "Starting Pet Health Management Backend (Python/FastAPI)..."
echo ""

cd "$(dirname "$0")"

if [ ! -d "venv" ]; then
    echo "Virtual environment not found. Creating..."
    python3 -m venv venv
    echo ""
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -r requirements.txt

echo ""
echo "Starting FastAPI server on http://localhost:8080"
echo "API Documentation: http://localhost:8080/docs"
echo ""

uvicorn app.main:app --reload --port 8080
