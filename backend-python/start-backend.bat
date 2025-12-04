@echo off
echo Starting Pet Health Management Backend (Python/FastAPI)...
echo.

cd /d "%~dp0"

if not exist "venv\" (
    echo Virtual environment not found. Creating...
    python -m venv venv
    echo.
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing dependencies...
pip install -r requirements.txt

echo.
echo Starting FastAPI server on http://localhost:8080
echo API Documentation: http://localhost:8080/docs
echo.

uvicorn app.main:app --reload --port 8080
