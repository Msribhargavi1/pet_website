# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Start Backend
```bash
# Windows
start-backend.bat

# Linux/Mac
chmod +x start-backend.sh
./start-backend.sh
```

### Step 2: Open Frontend
Open `index.html` in your browser

### Step 3: Test
Open browser console and try:
```javascript
// Get all pets
PetAPI.getAll().then(console.log);

// Create Cherry's profile
PetAPI.create({
    name: "Cherry",
    breed: "Golden Retriever",
    dateOfBirth: "2021-10-18",
    gender: "Female",
    color: "Golden"
}).then(console.log);
```

## 📋 Prerequisites

- ☑️ Java 17+
- ☑️ Maven 3.6+

Check versions:
```bash
java -version
mvn -version
```

## 🔗 Important URLs

- **Backend API**: http://localhost:8080/api
- **Frontend**: Open index.html in browser
- **Database**: backend/petcare.db

## 📚 API Quick Reference

```javascript
// Pet Info
await PetAPI.getAll()
await PetAPI.getById(1)
await PetAPI.create(data)
await PetAPI.update(1, data)
await PetAPI.delete(1)

// Medications
await MedicationAPI.getByPetId(1)
await MedicationAPI.create(data)

// Medical History
await MedicalHistoryAPI.getByPetId(1)
await MedicalHistoryAPI.create(data)

// Vaccinations
await VaccinationAPI.getByPetId(1)
await VaccinationAPI.create(data)

// Growth Tracking
await GrowthTrackingAPI.getByPetId(1)
await GrowthTrackingAPI.create(data)

// Diet Plan
await DietPlanAPI.getByPetId(1)
await DietPlanAPI.create(data)

// Album
await AlbumAPI.getByPetId(1)
await AlbumAPI.getByPetIdAndYear(1, 2024)
await AlbumAPI.create(data)
```

## 🧪 Test Backend

```bash
# Test if running
curl http://localhost:8080/api/pets

# Create a pet
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{"name":"Cherry","breed":"Golden Retriever","dateOfBirth":"2021-10-18"}'
```

## 📖 Full Documentation

- **Backend Details**: backend/README.md
- **Migration Guide**: BACKEND_MIGRATION_GUIDE.md
- **Complete Summary**: BACKEND_SETUP_SUMMARY.md

## ❓ Troubleshooting

**Backend won't start?**
- Install Java 17+
- Install Maven
- Check port 8080 is free

**API not working?**
- Ensure backend is running
- Check browser console for errors
- Verify CORS is enabled

**Need help?**
- Check backend logs in terminal
- Review documentation files
- Test with curl or Postman

## 🎯 Next Steps

1. ✅ Start backend
2. ✅ Test API endpoints
3. ✅ Integrate one feature (e.g., medications)
4. ✅ Test thoroughly
5. ✅ Migrate other features
6. ✅ Remove localStorage code

## 💡 Pro Tips

- Keep backend running while developing
- Use browser DevTools to debug API calls
- Backup petcare.db regularly
- Test API with Postman for easier debugging

---

**You're all set!** Start the backend and enjoy persistent data storage. 🐾
