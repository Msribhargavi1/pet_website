# Quick Start Guide - Python Backend

## 5-Minute Setup

### Windows

1. **Open Command Prompt** in the `backend-python` folder

2. **Run the startup script:**
   ```cmd
   start-backend.bat
   ```

3. **Wait for installation** (first time only)

4. **Open browser:**
   - API Docs: http://localhost:8080/docs
   - API: http://localhost:8080/api/pets

### Linux/Mac

1. **Open Terminal** in the `backend-python` folder

2. **Make script executable:**
   ```bash
   chmod +x start-backend.sh
   ```

3. **Run the startup script:**
   ```bash
   ./start-backend.sh
   ```

4. **Open browser:**
   - API Docs: http://localhost:8080/docs
   - API: http://localhost:8080/api/pets

## Manual Setup (Alternative)

```bash
# 1. Create virtual environment
python -m venv venv

# 2. Activate it
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run server
uvicorn app.main:app --reload --port 8080
```

## Test the API

### Using Browser

Open: http://localhost:8080/docs

Click "Try it out" on any endpoint!

### Using cURL

```bash
# Get all pets
curl http://localhost:8080/api/pets

# Create a pet
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{"name":"Buddy","breed":"Labrador","date_of_birth":"2020-01-01"}'
```

### Using Python

```python
import requests

# Get all pets
response = requests.get("http://localhost:8080/api/pets")
print(response.json())
```

## What's Running?

- **Server**: FastAPI with Uvicorn
- **Port**: 8080
- **Database**: SQLite (petcare.db)
- **Docs**: http://localhost:8080/docs

## Stop the Server

Press `Ctrl+C` in the terminal

## Troubleshooting

### "Python not found"

Install Python 3.11+ from https://www.python.org/downloads/

### "Port 8080 already in use"

Stop the Java backend first, or use a different port:
```bash
uvicorn app.main:app --reload --port 8081
```

### "Module not found"

Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

Then reinstall:
```bash
pip install -r requirements.txt
```

## Next Steps

1. ✅ Explore API docs at `/docs`
2. ✅ Test endpoints with Swagger UI
3. ✅ Connect your frontend
4. ✅ Read full README.md for details

## Need Help?

- Check README.md for detailed documentation
- Check MIGRATION_GUIDE.md for Java comparison
- API docs are at http://localhost:8080/docs
