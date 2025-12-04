# Installation Guide - Python Backend

## Prerequisites

### Required
- **Python 3.11 or higher**
- **pip** (Python package manager)

### Check Your Python Version

```bash
python --version
# or
python3 --version
```

If you don't have Python 3.11+, download from: https://www.python.org/downloads/

---

## Installation Methods

### Method 1: Automated (Recommended)

#### Windows
```cmd
cd backend-python
start-backend.bat
```

#### Linux/Mac
```bash
cd backend-python
chmod +x start-backend.sh
./start-backend.sh
```

The script will:
1. Create virtual environment
2. Install all dependencies
3. Start the server

---

### Method 2: Manual Installation

#### Step 1: Navigate to Directory
```bash
cd backend-python
```

#### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv

# Linux/Mac
python3 -m venv venv
```

#### Step 3: Activate Virtual Environment
```bash
# Windows (Command Prompt)
venv\Scripts\activate

# Windows (PowerShell)
venv\Scripts\Activate.ps1

# Linux/Mac
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

#### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- SQLAlchemy (ORM)
- Pydantic (validation)
- Other dependencies

#### Step 5: Run the Server
```bash
uvicorn app.main:app --reload --port 8080
```

---

## Verify Installation

### 1. Check Server is Running

Open your browser to:
- http://localhost:8080

You should see:
```json
{
  "message": "Pet Health Management API - Python/FastAPI",
  "version": "1.0.0",
  "docs": "/docs",
  "redoc": "/redoc"
}
```

### 2. Check API Documentation

Open: http://localhost:8080/docs

You should see the Swagger UI with all 42 endpoints!

### 3. Test an Endpoint

```bash
curl http://localhost:8080/api/pets
```

Should return: `[]` (empty array if no pets yet)

---

## Running Tests

```bash
# Make sure virtual environment is activated
# Install test dependencies (already in requirements.txt)
pip install pytest httpx

# Run tests
pytest tests/

# Run with verbose output
pytest tests/ -v
```

---

## Configuration

### Environment Variables

Edit `.env` file:

```env
DATABASE_URL=sqlite:///./petcare.db
API_PORT=8080
DEBUG=True
CORS_ORIGINS=*
```

### Change Port

```bash
# Method 1: Edit .env file
API_PORT=8081

# Method 2: Command line
uvicorn app.main:app --reload --port 8081
```

---

## Troubleshooting

### Issue: "python: command not found"

**Solution:**
- Install Python from https://www.python.org/downloads/
- Or try `python3` instead of `python`

### Issue: "pip: command not found"

**Solution:**
```bash
# Windows
python -m pip install --upgrade pip

# Linux/Mac
python3 -m pip install --upgrade pip
```

### Issue: "Permission denied" (Linux/Mac)

**Solution:**
```bash
# Make script executable
chmod +x start-backend.sh

# Or use sudo for pip
sudo pip install -r requirements.txt
```

### Issue: "Port 8080 already in use"

**Solution:**
```bash
# Stop Java backend if running
# Or use different port
uvicorn app.main:app --reload --port 8081
```

### Issue: "Module not found" errors

**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: "Database is locked"

**Solution:**
- Only run ONE backend at a time (Java OR Python)
- SQLite doesn't support multiple writers
- Stop the other backend first

### Issue: Virtual environment not activating (Windows PowerShell)

**Solution:**
```powershell
# Enable script execution
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Then activate
venv\Scripts\Activate.ps1
```

---

## Development Setup

### Hot Reload

The `--reload` flag enables hot reload:
- Save any Python file
- Server automatically restarts
- Changes take effect immediately

### IDE Setup

#### VS Code
1. Install Python extension
2. Select Python interpreter: `Ctrl+Shift+P` → "Python: Select Interpreter"
3. Choose `./venv/bin/python`

#### PyCharm
1. Open project
2. Settings → Project → Python Interpreter
3. Add interpreter → Existing environment
4. Select `./venv/bin/python`

---

## Production Deployment

### Option 1: Direct Deployment

```bash
# Install dependencies
pip install -r requirements.txt

# Run with production settings
uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 4
```

### Option 2: Using Gunicorn (Linux)

```bash
# Install gunicorn
pip install gunicorn

# Run with gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8080
```

### Option 3: Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app/ ./app/

EXPOSE 8080

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

Build and run:
```bash
docker build -t pet-health-backend .
docker run -p 8080:8080 pet-health-backend
```

---

## Uninstallation

### Remove Virtual Environment

```bash
# Deactivate first
deactivate

# Remove directory
# Windows
rmdir /s venv

# Linux/Mac
rm -rf venv
```

### Remove Dependencies

Just delete the `venv` folder - all dependencies are isolated there!

---

## Updating

### Update Dependencies

```bash
# Activate virtual environment
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Update all packages
pip install --upgrade -r requirements.txt
```

### Update Python

1. Install new Python version
2. Delete old `venv` folder
3. Create new virtual environment with new Python
4. Reinstall dependencies

---

## System Requirements

### Minimum
- **CPU**: 1 core
- **RAM**: 512 MB
- **Disk**: 100 MB
- **OS**: Windows 10+, Linux, macOS 10.14+

### Recommended
- **CPU**: 2+ cores
- **RAM**: 1 GB
- **Disk**: 500 MB
- **OS**: Latest version

---

## Performance Tuning

### Increase Workers

```bash
# More workers = handle more concurrent requests
uvicorn app.main:app --workers 4
```

### Use Production Server

```bash
# Gunicorn is more robust for production
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Enable Caching

Add caching middleware for better performance (optional).

---

## Security Considerations

### Production Checklist

- [ ] Change `DEBUG=False` in `.env`
- [ ] Set specific CORS origins (not `*`)
- [ ] Use HTTPS (reverse proxy like Nginx)
- [ ] Set up authentication/authorization
- [ ] Use environment variables for secrets
- [ ] Regular dependency updates
- [ ] Database backups

---

## Getting Help

### Documentation
- **README.md** - Full documentation
- **QUICK_START.md** - Quick setup guide
- **MIGRATION_GUIDE.md** - Java comparison
- **API Docs** - http://localhost:8080/docs

### Common Commands

```bash
# Activate virtual environment
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload --port 8080

# Run tests
pytest tests/

# Deactivate virtual environment
deactivate
```

---

## Next Steps

1. ✅ Complete installation
2. ✅ Test at http://localhost:8080/docs
3. ✅ Read README.md for API details
4. ✅ Connect your frontend
5. ✅ Start building!

---

## Success!

If you can access http://localhost:8080/docs and see the Swagger UI, you're all set! 🎉

The Python backend is now running and ready to use.
