# Pet Health Management Backend - Python/FastAPI

A RESTful API backend built with Python, FastAPI, and SQLite3 for the Pet Health Management System.

## Technology Stack

- **Python**: 3.11+
- **FastAPI**: 0.104.1 (Modern async web framework)
- **SQLAlchemy**: 2.0.23 (ORM)
- **Pydantic**: 2.5.0 (Data validation)
- **Database**: SQLite3
- **Server**: Uvicorn (ASGI server)

## Features

✅ **42 REST API Endpoints** across 7 resources
✅ **Automatic API Documentation** (Swagger UI & ReDoc)
✅ **Type Safety** with Pydantic schemas
✅ **Async Support** for better performance
✅ **CORS Enabled** for frontend integration
✅ **SQLAlchemy ORM** for database operations
✅ **Compatible** with existing Java backend database

## Project Structure

```
backend-python/
├── app/
│   ├── __init__.py
│   ├── main.py                    # Application entry point
│   ├── config.py                  # Configuration settings
│   ├── database.py                # Database connection
│   ├── exceptions.py              # Custom exceptions
│   ├── models/                    # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── pet_info.py
│   │   ├── medical_history.py
│   │   ├── medication.py
│   │   ├── vaccination.py
│   │   ├── growth_tracking.py
│   │   ├── diet_plan.py
│   │   └── album.py
│   ├── schemas/                   # Pydantic schemas (DTOs)
│   │   ├── __init__.py
│   │   ├── pet_info.py
│   │   ├── medical_history.py
│   │   ├── medication.py
│   │   ├── vaccination.py
│   │   ├── growth_tracking.py
│   │   ├── diet_plan.py
│   │   └── album.py
│   ├── crud/                      # CRUD operations
│   │   ├── __init__.py
│   │   ├── pet_info.py
│   │   ├── medical_history.py
│   │   ├── medication.py
│   │   ├── vaccination.py
│   │   ├── growth_tracking.py
│   │   ├── diet_plan.py
│   │   └── album.py
│   └── routers/                   # API routes
│       ├── __init__.py
│       ├── pet_info.py
│       ├── medical_history.py
│       ├── medication.py
│       ├── vaccination.py
│       ├── growth_tracking.py
│       ├── diet_plan.py
│       └── album.py
├── requirements.txt               # Python dependencies
├── .env                          # Environment variables
├── .gitignore
├── start-backend.bat             # Windows startup script
├── start-backend.sh              # Linux/Mac startup script
└── README.md                     # This file
```

## Quick Start

### Prerequisites

- Python 3.11 or higher
- pip (Python package manager)

### Installation & Running

#### Windows

```bash
# Run the startup script (creates venv, installs dependencies, starts server)
start-backend.bat
```

#### Linux/Mac

```bash
# Make script executable
chmod +x start-backend.sh

# Run the startup script
./start-backend.sh
```

#### Manual Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8080
```

The server will start on `http://localhost:8080`

## API Documentation

FastAPI provides automatic interactive API documentation:

- **Swagger UI**: http://localhost:8080/docs
- **ReDoc**: http://localhost:8080/redoc
- **OpenAPI JSON**: http://localhost:8080/openapi.json

## API Endpoints

### Pet Info
- `GET /api/pets` - Get all pets
- `GET /api/pets/{id}` - Get pet by ID
- `POST /api/pets` - Create new pet
- `PUT /api/pets/{id}` - Update pet
- `DELETE /api/pets/{id}` - Delete pet

### Medical History
- `GET /api/medical-history` - Get all medical history
- `GET /api/medical-history/pet/{petId}` - Get medical history by pet ID
- `GET /api/medical-history/{id}` - Get medical history by ID
- `POST /api/medical-history` - Create medical history
- `PUT /api/medical-history/{id}` - Update medical history
- `DELETE /api/medical-history/{id}` - Delete medical history

### Medications
- `GET /api/medications` - Get all medications
- `GET /api/medications/pet/{petId}` - Get medications by pet ID
- `GET /api/medications/pet/{petId}/active` - Get active medications
- `GET /api/medications/{id}` - Get medication by ID
- `POST /api/medications` - Create medication
- `PUT /api/medications/{id}` - Update medication
- `DELETE /api/medications/{id}` - Delete medication

### Vaccinations
- `GET /api/vaccinations` - Get all vaccinations
- `GET /api/vaccinations/pet/{petId}` - Get vaccinations by pet ID
- `GET /api/vaccinations/{id}` - Get vaccination by ID
- `POST /api/vaccinations` - Create vaccination
- `PUT /api/vaccinations/{id}` - Update vaccination
- `DELETE /api/vaccinations/{id}` - Delete vaccination

### Growth Tracking
- `GET /api/growth-tracking` - Get all growth records
- `GET /api/growth-tracking/pet/{petId}` - Get growth records by pet ID
- `GET /api/growth-tracking/{id}` - Get growth record by ID
- `POST /api/growth-tracking` - Create growth record
- `PUT /api/growth-tracking/{id}` - Update growth record
- `DELETE /api/growth-tracking/{id}` - Delete growth record

### Diet Plan
- `GET /api/diet-plan` - Get all diet plans
- `GET /api/diet-plan/pet/{petId}` - Get diet plan by pet ID
- `GET /api/diet-plan/{id}` - Get diet plan by ID
- `POST /api/diet-plan` - Create diet plan
- `PUT /api/diet-plan/{id}` - Update diet plan
- `DELETE /api/diet-plan/{id}` - Delete diet plan

### Album
- `GET /api/album` - Get all album photos
- `GET /api/album/pet/{petId}` - Get album by pet ID
- `GET /api/album/pet/{petId}/year/{year}` - Get album by pet ID and year
- `GET /api/album/{id}` - Get album photo by ID
- `POST /api/album` - Create album photo
- `PUT /api/album/{id}` - Update album photo
- `DELETE /api/album/{id}` - Delete album photo

## Database

The SQLite database file `petcare.db` will be automatically created in the project root directory when you first run the application.

- **Database Location**: `./petcare.db`
- **Tables**: Auto-created based on SQLAlchemy models
- **Compatible**: Uses same database as Java backend

## Testing the API

### Using cURL

```bash
# Get all pets
curl http://localhost:8080/api/pets

# Create a new pet
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Cherry",
    "breed": "Golden Retriever",
    "date_of_birth": "2021-10-18",
    "gender": "Female",
    "color": "Golden"
  }'

# Get medications for pet ID 1
curl http://localhost:8080/api/medications/pet/1
```

### Using Swagger UI

1. Open http://localhost:8080/docs
2. Click on any endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

## Configuration

Edit `.env` file to customize:

```env
DATABASE_URL=sqlite:///./petcare.db
API_PORT=8080
DEBUG=True
CORS_ORIGINS=*
```

## Development

### Hot Reload

The server runs with `--reload` flag, so changes to code automatically restart the server.

### Database Inspection

Use any SQLite browser tool:
- DB Browser for SQLite
- SQLite Studio
- DBeaver
- Command line: `sqlite3 petcare.db`

### Adding New Endpoints

1. Create/update model in `app/models/`
2. Create schema in `app/schemas/`
3. Add CRUD operations in `app/crud/`
4. Create router in `app/routers/`
5. Include router in `app/main.py`

## Comparison with Java Backend

| Feature | Java/Spring Boot | Python/FastAPI |
|---------|------------------|----------------|
| Language | Java 21 | Python 3.11+ |
| Framework | Spring Boot 3.4.0 | FastAPI 0.104.1 |
| ORM | Hibernate/JPA | SQLAlchemy |
| Validation | Jakarta Validation | Pydantic |
| API Docs | SpringDoc (optional) | Built-in Swagger |
| Performance | Faster (compiled) | Fast (async) |
| Code Lines | More verbose | More concise |
| Learning Curve | Steeper | Gentler |
| Deployment | JAR file | Python app |

## Advantages of Python/FastAPI

✅ **Simpler syntax** - Less boilerplate code
✅ **Faster development** - More concise
✅ **Automatic docs** - Built-in Swagger UI
✅ **Type hints** - Modern Python typing
✅ **Async support** - Better for I/O operations
✅ **Easy to learn** - Python is beginner-friendly
✅ **Great for ML** - If adding AI features later

## Production Deployment

### Option 1: Direct Deployment

```bash
# Install dependencies
pip install -r requirements.txt

# Run with production server
uvicorn app.main:app --host 0.0.0.0 --port 8080
```

### Option 2: Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Option 3: Cloud Platforms

- **Heroku**: `git push heroku main`
- **AWS Lambda**: Use Mangum adapter
- **Google Cloud Run**: Deploy container
- **Azure App Service**: Deploy Python app

## Troubleshooting

### Port Already in Use

Change port in command:
```bash
uvicorn app.main:app --reload --port 8081
```

### Database Locked

Ensure only one instance is running.

### Import Errors

Make sure virtual environment is activated:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### CORS Errors

Update `CORS_ORIGINS` in `.env` file.

## Migration from Java

This Python backend is **100% compatible** with the Java backend:

- ✅ Same database schema
- ✅ Same API endpoints
- ✅ Same request/response formats
- ✅ Same port (8080)
- ✅ Works with existing frontend

You can switch between Java and Python backends without changing the frontend!

## License

Same as the main project.

## Support

For issues or questions:
1. Check the automatic API docs at `/docs`
2. Review this README
3. Check the Java backend documentation for comparison
