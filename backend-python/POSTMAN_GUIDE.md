# Postman Testing Guide

## 🚀 Quick Start

Your Python backend is running at: **http://localhost:8080**

## 📋 All API Endpoints

### 1. Root & Health Check

#### GET Root
```
GET http://localhost:8080/
```
**Expected Response:**
```json
{
  "message": "Pet Health Management API - Python/FastAPI",
  "version": "1.0.0",
  "docs": "/docs",
  "redoc": "/redoc"
}
```

#### GET Health Check
```
GET http://localhost:8080/health
```
**Expected Response:**
```json
{
  "status": "healthy",
  "framework": "FastAPI"
}
```

---

## 🐾 Pet Info Endpoints

### GET All Pets
```
GET http://localhost:8080/api/pets
```

### GET Pet by ID
```
GET http://localhost:8080/api/pets/1
```

### POST Create Pet
```
POST http://localhost:8080/api/pets
Content-Type: application/json

{
  "name": "Buddy",
  "breed": "Golden Retriever",
  "date_of_birth": "2020-05-15",
  "gender": "Male",
  "color": "Golden",
  "microchip_id": "123456789",
  "image_path": "/images/buddy.jpg",
  "notes": "Very friendly dog"
}
```

### PUT Update Pet
```
PUT http://localhost:8080/api/pets/1
Content-Type: application/json

{
  "name": "Buddy Updated",
  "color": "Light Golden"
}
```

### DELETE Pet
```
DELETE http://localhost:8080/api/pets/1
```

---

## 🏥 Medical History Endpoints

### GET All Medical History
```
GET http://localhost:8080/api/medical-history
```

### GET Medical History by Pet ID
```
GET http://localhost:8080/api/medical-history/pet/1
```

### GET Medical History by ID
```
GET http://localhost:8080/api/medical-history/1
```

### POST Create Medical History
```
POST http://localhost:8080/api/medical-history
Content-Type: application/json

{
  "pet_id": 1,
  "year": 2024,
  "condition": "Annual Checkup",
  "treatment": "Routine examination, all healthy",
  "visit_date": "2024-03-15",
  "hospital": "City Vet Clinic",
  "veterinarian": "Dr. Smith",
  "notes": "Next checkup in 6 months"
}
```

### PUT Update Medical History
```
PUT http://localhost:8080/api/medical-history/1
Content-Type: application/json

{
  "notes": "Updated notes - follow up scheduled"
}
```

### DELETE Medical History
```
DELETE http://localhost:8080/api/medical-history/1
```

---

## 💊 Medication Endpoints

### GET All Medications
```
GET http://localhost:8080/api/medications
```

### GET Medications by Pet ID
```
GET http://localhost:8080/api/medications/pet/1
```

### GET Active Medications by Pet ID
```
GET http://localhost:8080/api/medications/pet/1/active
```

### GET Medication by ID
```
GET http://localhost:8080/api/medications/1
```

### POST Create Medication
```
POST http://localhost:8080/api/medications
Content-Type: application/json

{
  "pet_id": 1,
  "name": "Heartgard Plus",
  "dosage": "1 tablet monthly",
  "quantity_remaining": 6,
  "refill_date": "2024-09-01",
  "medication_type": "Preventive",
  "purpose": "Heartworm prevention",
  "is_active": true,
  "notes": "Give with food"
}
```

### PUT Update Medication
```
PUT http://localhost:8080/api/medications/1
Content-Type: application/json

{
  "quantity_remaining": 5,
  "is_active": true
}
```

### DELETE Medication
```
DELETE http://localhost:8080/api/medications/1
```

---

## 💉 Vaccination Endpoints

### GET All Vaccinations
```
GET http://localhost:8080/api/vaccinations
```

### GET Vaccinations by Pet ID
```
GET http://localhost:8080/api/vaccinations/pet/1
```

### GET Vaccination by ID
```
GET http://localhost:8080/api/vaccinations/1
```

### POST Create Vaccination
```
POST http://localhost:8080/api/vaccinations
Content-Type: application/json

{
  "pet_id": 1,
  "name": "Rabies",
  "vaccination_date": "2024-01-15",
  "next_due_date": "2025-01-15",
  "reminder_method": "Email",
  "veterinarian": "Dr. Johnson",
  "hospital": "Pet Care Center",
  "notes": "Annual booster required"
}
```

### PUT Update Vaccination
```
PUT http://localhost:8080/api/vaccinations/1
Content-Type: application/json

{
  "next_due_date": "2025-02-01",
  "reminder_method": "SMS"
}
```

### DELETE Vaccination
```
DELETE http://localhost:8080/api/vaccinations/1
```

---

## 📊 Growth Tracking Endpoints

### GET All Growth Records
```
GET http://localhost:8080/api/growth-tracking
```

### GET Growth Records by Pet ID
```
GET http://localhost:8080/api/growth-tracking/pet/1
```

### GET Growth Record by ID
```
GET http://localhost:8080/api/growth-tracking/1
```

### POST Create Growth Record
```
POST http://localhost:8080/api/growth-tracking
Content-Type: application/json

{
  "pet_id": 1,
  "tracking_date": "2024-03-01",
  "weight": 25.5,
  "height": 60.0,
  "age_months": 48,
  "notes": "Healthy weight"
}
```

### PUT Update Growth Record
```
PUT http://localhost:8080/api/growth-tracking/1
Content-Type: application/json

{
  "weight": 26.0,
  "notes": "Slight weight gain"
}
```

### DELETE Growth Record
```
DELETE http://localhost:8080/api/growth-tracking/1
```

---

## 🍖 Diet Plan Endpoints

### GET All Diet Plans
```
GET http://localhost:8080/api/diet-plan
```

### GET Diet Plan by Pet ID
```
GET http://localhost:8080/api/diet-plan/pet/1
```

### GET Diet Plan by ID
```
GET http://localhost:8080/api/diet-plan/1
```

### POST Create Diet Plan
```
POST http://localhost:8080/api/diet-plan
Content-Type: application/json

{
  "pet_id": 1,
  "day_number": 1,
  "meal_type": "breakfast",
  "items": "Dry kibble (2 cups), Chicken breast (100g)",
  "add_ons": "Vitamin supplement"
}
```

### PUT Update Diet Plan
```
PUT http://localhost:8080/api/diet-plan/1
Content-Type: application/json

{
  "items": "Dry kibble (2.5 cups), Chicken breast (150g)",
  "add_ons": "Vitamin supplement, Fish oil"
}
```

### DELETE Diet Plan
```
DELETE http://localhost:8080/api/diet-plan/1
```

---

## 📸 Album Endpoints

### GET All Album Photos
```
GET http://localhost:8080/api/album
```

### GET Album by Pet ID
```
GET http://localhost:8080/api/album/pet/1
```

### GET Album by Pet ID and Year
```
GET http://localhost:8080/api/album/pet/1/year/2024
```

### GET Album Photo by ID
```
GET http://localhost:8080/api/album/1
```

### POST Create Album Photo
```
POST http://localhost:8080/api/album
Content-Type: application/json

{
  "pet_id": 1,
  "image_path": "/Album/2024/photo1.jpg",
  "year": 2024,
  "upload_date": "2024-03-15",
  "caption": "Playing in the park",
  "location": "Central Park",
  "media_type": "photo",
  "category": "outdoor"
}
```

### PUT Update Album Photo
```
PUT http://localhost:8080/api/album/1
Content-Type: application/json

{
  "caption": "Updated caption - Fun day at the park",
  "location": "Central Park, NYC"
}
```

### DELETE Album Photo
```
DELETE http://localhost:8080/api/album/1
```

---

## 🎯 Postman Collection Setup

### Step 1: Create New Collection
1. Open Postman
2. Click "New" → "Collection"
3. Name it: "Pet Health Management API"

### Step 2: Set Base URL Variable
1. In your collection, go to "Variables" tab
2. Add variable:
   - **Variable**: `base_url`
   - **Initial Value**: `http://localhost:8080`
   - **Current Value**: `http://localhost:8080`

### Step 3: Use Variable in Requests
Now you can use `{{base_url}}` in all requests:
```
GET {{base_url}}/api/pets
POST {{base_url}}/api/pets
```

---

## 📝 Testing Workflow

### Complete Test Flow

#### 1. Health Check
```
GET http://localhost:8080/health
```
✅ Should return: `{"status": "healthy"}`

#### 2. Create a Pet
```
POST http://localhost:8080/api/pets
Content-Type: application/json

{
  "name": "Max",
  "breed": "Labrador",
  "date_of_birth": "2020-01-01",
  "gender": "Male",
  "color": "Black"
}
```
✅ Should return: Pet object with `id: 1`

#### 3. Get All Pets
```
GET http://localhost:8080/api/pets
```
✅ Should return: Array with your created pet

#### 4. Get Pet by ID
```
GET http://localhost:8080/api/pets/1
```
✅ Should return: Your pet object

#### 5. Add Medical History
```
POST http://localhost:8080/api/medical-history
Content-Type: application/json

{
  "pet_id": 1,
  "year": 2024,
  "condition": "Checkup",
  "treatment": "All good",
  "visit_date": "2024-03-01"
}
```
✅ Should return: Medical history with `id: 1`

#### 6. Add Medication
```
POST http://localhost:8080/api/medications
Content-Type: application/json

{
  "pet_id": 1,
  "name": "Flea Treatment",
  "dosage": "1 tablet",
  "is_active": true
}
```
✅ Should return: Medication with `id: 1`

#### 7. Get Active Medications
```
GET http://localhost:8080/api/medications/pet/1/active
```
✅ Should return: Array with active medications

#### 8. Update Pet
```
PUT http://localhost:8080/api/pets/1
Content-Type: application/json

{
  "color": "Dark Black"
}
```
✅ Should return: Updated pet object

#### 9. Delete Test (Optional)
```
DELETE http://localhost:8080/api/pets/1
```
✅ Should return: 204 No Content

---

## 🔍 Common Response Codes

| Code | Meaning | When You'll See It |
|------|---------|-------------------|
| **200** | OK | Successful GET, PUT |
| **201** | Created | Successful POST |
| **204** | No Content | Successful DELETE |
| **404** | Not Found | Resource doesn't exist |
| **422** | Validation Error | Invalid data format |
| **500** | Server Error | Backend error |

---

## 🐛 Troubleshooting

### Error: "Connection refused"
**Solution:** Make sure the backend is running:
```bash
cd backend-python
.\venv\Scripts\activate
uvicorn app.main:app --reload --port 8080
```

### Error: 404 Not Found
**Solution:** Check your URL:
- ✅ Correct: `http://localhost:8080/api/pets`
- ❌ Wrong: `http://localhost:8080/pets`

### Error: 422 Validation Error
**Solution:** Check your JSON format:
- Date format: `"2024-03-15"` (YYYY-MM-DD)
- Required fields must be included
- Check field names match exactly

### Error: 500 Internal Server Error
**Solution:** Check backend logs in terminal

---

## 💡 Pro Tips

### 1. Save Responses
In Postman, save successful responses as examples for reference.

### 2. Use Environment Variables
Create different environments (Development, Production) with different base URLs.

### 3. Test Scripts
Add test scripts in Postman to automate validation:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has data", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
});
```

### 4. Pre-request Scripts
Set up data before requests:
```javascript
pm.environment.set("timestamp", new Date().toISOString());
```

---

## 📦 Import Postman Collection

You can create a collection JSON file with all these requests. Here's a sample structure:

```json
{
  "info": {
    "name": "Pet Health Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/health",
          "host": ["{{base_url}}"],
          "path": ["health"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8080"
    }
  ]
}
```

---

## 🎉 Quick Test Checklist

- [ ] GET `/health` - Server is running
- [ ] GET `/api/pets` - Get all pets (empty array initially)
- [ ] POST `/api/pets` - Create a pet
- [ ] GET `/api/pets/1` - Get the created pet
- [ ] PUT `/api/pets/1` - Update the pet
- [ ] POST `/api/medical-history` - Add medical record
- [ ] POST `/api/medications` - Add medication
- [ ] GET `/api/medications/pet/1/active` - Get active meds
- [ ] POST `/api/vaccinations` - Add vaccination
- [ ] POST `/api/growth-tracking` - Add growth record
- [ ] POST `/api/diet-plan` - Add diet plan
- [ ] POST `/api/album` - Add photo
- [ ] DELETE `/api/pets/1` - Clean up (optional)

---

## 🌐 Alternative: Use Swagger UI

Instead of Postman, you can use the built-in Swagger UI:

**Open in browser:** http://localhost:8080/docs

Benefits:
- ✅ No installation needed
- ✅ Interactive testing
- ✅ Automatic documentation
- ✅ Try all endpoints directly

---

## 📞 Need Help?

- **API Docs**: http://localhost:8080/docs
- **Backend Logs**: Check your terminal where backend is running
- **README**: See `backend-python/README.md`

---

**Happy Testing!** 🚀
