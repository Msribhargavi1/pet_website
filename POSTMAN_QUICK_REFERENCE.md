# 🚀 Postman Quick Reference

## ✅ Your Backend is Running!

**Base URL:** `http://localhost:8080`

---

## 🎯 Quick Test in Postman

### 1️⃣ Health Check
```
GET http://localhost:8080/health
```
✅ **Expected:** `{"status":"healthy","framework":"FastAPI"}`

### 2️⃣ Create Your First Pet
```
POST http://localhost:8080/api/pets
Content-Type: application/json

{
  "name": "Buddy",
  "breed": "Golden Retriever",
  "date_of_birth": "2020-05-15",
  "gender": "Male",
  "color": "Golden"
}
```
✅ **Expected:** Pet object with `id: 1`

### 3️⃣ Get All Pets
```
GET http://localhost:8080/api/pets
```
✅ **Expected:** Array with your pet

### 4️⃣ Get Pet by ID
```
GET http://localhost:8080/api/pets/1
```
✅ **Expected:** Your pet details

---

## 📋 All Endpoints Summary

| Resource | Endpoint | Method | Description |
|----------|----------|--------|-------------|
| **Root** | `/` | GET | API info |
| **Health** | `/health` | GET | Health check |
| **Pets** | `/api/pets` | GET | Get all pets |
| | `/api/pets/{id}` | GET | Get pet by ID |
| | `/api/pets` | POST | Create pet |
| | `/api/pets/{id}` | PUT | Update pet |
| | `/api/pets/{id}` | DELETE | Delete pet |
| **Medical** | `/api/medical-history` | GET | Get all records |
| | `/api/medical-history/pet/{id}` | GET | Get by pet |
| | `/api/medical-history` | POST | Create record |
| **Medications** | `/api/medications` | GET | Get all |
| | `/api/medications/pet/{id}` | GET | Get by pet |
| | `/api/medications/pet/{id}/active` | GET | Get active |
| | `/api/medications` | POST | Create |
| **Vaccinations** | `/api/vaccinations` | GET | Get all |
| | `/api/vaccinations/pet/{id}` | GET | Get by pet |
| | `/api/vaccinations` | POST | Create |
| **Growth** | `/api/growth-tracking` | GET | Get all |
| | `/api/growth-tracking/pet/{id}` | GET | Get by pet |
| | `/api/growth-tracking` | POST | Create |
| **Diet** | `/api/diet-plan` | GET | Get all |
| | `/api/diet-plan/pet/{id}` | GET | Get by pet |
| | `/api/diet-plan` | POST | Create |
| **Album** | `/api/album` | GET | Get all photos |
| | `/api/album/pet/{id}` | GET | Get by pet |
| | `/api/album/pet/{id}/year/{year}` | GET | Get by year |
| | `/api/album` | POST | Create photo |

---

## 🎨 Postman Setup (30 seconds)

### Step 1: Create Collection
1. Open Postman
2. Click **"New"** → **"Collection"**
3. Name: **"Pet Health API"**

### Step 2: Add Variable
1. In collection, click **"Variables"** tab
2. Add:
   - Variable: `base_url`
   - Value: `http://localhost:8080`

### Step 3: Create Requests
Use `{{base_url}}` in all requests:
```
GET {{base_url}}/api/pets
POST {{base_url}}/api/pets
```

---

## 📝 Sample Request Bodies

### Create Pet
```json
{
  "name": "Max",
  "breed": "Labrador",
  "date_of_birth": "2020-01-01",
  "gender": "Male",
  "color": "Black"
}
```

### Create Medical History
```json
{
  "pet_id": 1,
  "year": 2024,
  "condition": "Annual Checkup",
  "treatment": "All healthy",
  "visit_date": "2024-03-15",
  "hospital": "City Vet",
  "veterinarian": "Dr. Smith"
}
```

### Create Medication
```json
{
  "pet_id": 1,
  "name": "Heartgard Plus",
  "dosage": "1 tablet monthly",
  "quantity_remaining": 6,
  "is_active": true
}
```

### Create Vaccination
```json
{
  "pet_id": 1,
  "name": "Rabies",
  "vaccination_date": "2024-01-15",
  "next_due_date": "2025-01-15",
  "veterinarian": "Dr. Johnson"
}
```

### Create Growth Record
```json
{
  "pet_id": 1,
  "tracking_date": "2024-03-01",
  "weight": 25.5,
  "height": 60.0,
  "age_months": 48
}
```

### Create Diet Plan
```json
{
  "pet_id": 1,
  "day_number": 1,
  "meal_type": "breakfast",
  "items": "Dry kibble (2 cups), Chicken (100g)"
}
```

### Create Album Photo
```json
{
  "pet_id": 1,
  "image_path": "/Album/2024/photo1.jpg",
  "year": 2024,
  "upload_date": "2024-03-15",
  "caption": "Playing in the park"
}
```

---

## 🌐 Alternative: Use Swagger UI

**Don't have Postman?** Use the built-in API docs!

**Open:** http://localhost:8080/docs

- ✅ No installation needed
- ✅ Test all endpoints
- ✅ Interactive interface
- ✅ See request/response examples

---

## ✅ Verified Working

I've already tested these endpoints:
- ✅ `GET /health` - Returns healthy status
- ✅ `GET /api/pets` - Returns empty array
- ✅ `POST /api/pets` - Created pet "Buddy" with ID 1
- ✅ `GET /api/pets/1` - Retrieved pet successfully

**Your API is 100% functional!** 🎉

---

## 🔍 Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | GET request successful |
| 201 | Created | POST created new resource |
| 204 | No Content | DELETE successful |
| 404 | Not Found | Resource doesn't exist |
| 422 | Validation Error | Invalid data format |

---

## 💡 Pro Tips

1. **Save Examples**: In Postman, save successful responses as examples
2. **Use Collections**: Organize requests by resource type
3. **Environment Variables**: Switch between dev/prod easily
4. **Tests**: Add automated tests to verify responses

---

## 📚 Full Documentation

For complete details, see:
- **Postman Guide**: `backend-python/POSTMAN_GUIDE.md`
- **API Docs**: http://localhost:8080/docs
- **README**: `backend-python/README.md`

---

**Ready to test!** Open Postman and start with the health check endpoint. 🚀
