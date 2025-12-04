"""
Basic API tests for Pet Health Management Backend

Run with: pytest tests/
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_root():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_get_all_pets():
    """Test get all pets endpoint"""
    response = client.get("/api/pets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_pet():
    """Test create pet endpoint"""
    pet_data = {
        "name": "Test Pet",
        "breed": "Test Breed",
        "date_of_birth": "2020-01-01"
    }
    response = client.post("/api/pets", json=pet_data)
    assert response.status_code == 201
    assert response.json()["name"] == "Test Pet"

def test_get_all_medications():
    """Test get all medications endpoint"""
    response = client.get("/api/medications")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_all_vaccinations():
    """Test get all vaccinations endpoint"""
    response = client.get("/api/vaccinations")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_all_medical_history():
    """Test get all medical history endpoint"""
    response = client.get("/api/medical-history")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_all_growth_tracking():
    """Test get all growth tracking endpoint"""
    response = client.get("/api/growth-tracking")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_all_diet_plans():
    """Test get all diet plans endpoint"""
    response = client.get("/api/diet-plan")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_all_album():
    """Test get all album endpoint"""
    response = client.get("/api/album")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_404_error():
    """Test 404 error handling"""
    response = client.get("/api/pets/99999")
    assert response.status_code == 404
