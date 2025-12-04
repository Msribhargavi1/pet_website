# Backend Migration Guide

This guide explains how to migrate from localStorage to the Java backend with SQLite3 database.

## Overview

The backend provides persistent data storage using SQLite3 database, replacing the browser's localStorage. Your existing frontend UI remains unchanged.

## What Changed

### Before (localStorage)
- Data stored in browser
- Lost when clearing browser data
- Limited to single device
- No data validation

### After (Backend + SQLite3)
- Data stored in database file
- Persistent across devices
- Multi-user capable
- Server-side validation
- RESTful API access

## Migration Steps

### Step 1: Start the Backend Server

```bash
cd backend
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

### Step 2: Include API Service in HTML

Add this line to your `index.html` before the closing `</body>` tag:

```html
<script src="js/api-service.js"></script>
```

### Step 3: Update JavaScript Functions

Replace localStorage calls with API calls. Here are examples:

#### Example 1: Saving Medication

**Before (localStorage):**
```javascript
function saveMedicines() {
    const medicineList = document.getElementById('medicineList');
    const items = Array.from(medicineList.children).map(div => ({
        name: div.querySelector('h4').textContent,
        dosage: div.querySelector('p').textContent
    }));
    localStorage.setItem('medicines', JSON.stringify(items));
}
```

**After (Backend API):**
```javascript
async function saveMedication(medicationData) {
    try {
        const result = await MedicationAPI.create({
            petId: 1, // Cherry's ID
            name: medicationData.name,
            dosage: medicationData.dosage,
            quantityRemaining: medicationData.quantity,
            refillDate: medicationData.refillDate,
            isActive: true
        });
        console.log('Medication saved:', result);
        return result;
    } catch (error) {
        console.error('Failed to save medication:', error);
    }
}
```

#### Example 2: Loading Medications

**Before (localStorage):**
```javascript
function loadMedicines() {
    const savedMedicines = localStorage.getItem('medicines');
    if (savedMedicines) {
        const items = JSON.parse(savedMedicines);
        // Display items
    }
}
```

**After (Backend API):**
```javascript
async function loadMedications() {
    try {
        const medications = await MedicationAPI.getByPetId(1); // Cherry's ID
        medications.forEach(med => {
            displayMedication(med);
        });
    } catch (error) {
        console.error('Failed to load medications:', error);
    }
}
```

#### Example 3: Growth Tracking

**Before (localStorage):**
```javascript
function saveTracking() {
    const trackingList = document.getElementById('trackingList');
    const items = Array.from(trackingList.children).map(item => item.innerHTML);
    localStorage.setItem('tracking', JSON.stringify(items));
}
```

**After (Backend API):**
```javascript
async function saveGrowthTracking(trackingData) {
    try {
        const result = await GrowthTrackingAPI.create({
            petId: 1,
            trackingDate: trackingData.date,
            weight: parseFloat(trackingData.weight),
            height: parseFloat(trackingData.height),
            ageMonths: trackingData.ageMonths,
            notes: trackingData.notes
        });
        return result;
    } catch (error) {
        console.error('Failed to save growth tracking:', error);
    }
}
```

## API Usage Examples

### Pet Information

```javascript
// Get Cherry's information
const cherry = await PetAPI.getById(1);

// Update Cherry's information
await PetAPI.update(1, {
    name: "Cherry",
    breed: "Golden Retriever",
    dateOfBirth: "2021-10-18",
    gender: "Female",
    color: "Golden"
});
```

### Medical History

```javascript
// Get all medical history for Cherry
const history = await MedicalHistoryAPI.getByPetId(1);

// Add new medical record
await MedicalHistoryAPI.create({
    petId: 1,
    year: 2025,
    condition: "PSS Management",
    treatment: "Liver support medication",
    visitDate: "2025-01-15",
    hospital: "Government Hospital, Tadipatri",
    veterinarian: "Dr. Hussain"
});
```

### Vaccinations

```javascript
// Get upcoming vaccinations
const vaccinations = await VaccinationAPI.getByPetId(1);

// Add vaccination reminder
await VaccinationAPI.create({
    petId: 1,
    name: "Rabies Booster",
    vaccinationDate: "2024-12-01",
    nextDueDate: "2025-12-01",
    reminderMethod: "email",
    veterinarian: "Dr. Hussain"
});
```

### Album

```javascript
// Get all photos for Cherry
const photos = await AlbumAPI.getByPetId(1);

// Get photos from specific year
const photos2024 = await AlbumAPI.getByPetIdAndYear(1, 2024);

// Add new photo
await AlbumAPI.create({
    petId: 1,
    imagePath: "Album/2025/Image (5).jpg",
    year: 2025,
    uploadDate: "2025-12-04",
    caption: "Playing in the park",
    location: "home",
    mediaType: "photo",
    category: "playtime"
});
```

## Data Migration Script

To migrate existing localStorage data to the backend, create a migration script:

```javascript
async function migrateLocalStorageToBackend() {
    // Migrate medications
    const savedMedicines = localStorage.getItem('medicines');
    if (savedMedicines) {
        const medicines = JSON.parse(savedMedicines);
        for (const med of medicines) {
            await MedicationAPI.create({
                petId: 1,
                name: med.name,
                dosage: med.dosage,
                isActive: true
            });
        }
    }

    // Migrate growth tracking
    const savedTracking = localStorage.getItem('tracking');
    if (savedTracking) {
        const tracking = JSON.parse(savedTracking);
        for (const record of tracking) {
            // Parse and create growth tracking records
            await GrowthTrackingAPI.create({
                petId: 1,
                // ... parse record data
            });
        }
    }

    console.log('Migration complete!');
}
```

## Testing the Integration

1. **Start Backend**: `cd backend && mvn spring-boot:run`
2. **Open Frontend**: Open `index.html` in browser
3. **Check Console**: Open browser DevTools console
4. **Test API**: Try adding a medication or growth record
5. **Verify Database**: Check `petcare.db` file with SQLite browser

## Fallback Strategy

Keep localStorage as fallback if backend is unavailable:

```javascript
async function saveMedication(data) {
    try {
        // Try backend first
        return await MedicationAPI.create(data);
    } catch (error) {
        console.warn('Backend unavailable, using localStorage');
        // Fallback to localStorage
        const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');
        medicines.push(data);
        localStorage.setItem('medicines', JSON.stringify(medicines));
    }
}
```

## Benefits of Backend Migration

1. **Data Persistence**: Data survives browser clearing
2. **Multi-Device**: Access from any device
3. **Backup**: Database file can be backed up
4. **Scalability**: Can add more features easily
5. **Security**: Server-side validation
6. **Sharing**: Multiple users can access same data

## Troubleshooting

### Backend Not Running
**Error**: `Failed to fetch` or `Network error`
**Solution**: Ensure backend is running on `http://localhost:8080`

### CORS Errors
**Error**: `CORS policy blocked`
**Solution**: Backend already configured for CORS, ensure you're accessing from correct origin

### Data Not Saving
**Error**: API returns 400 or 500
**Solution**: Check console for validation errors, ensure all required fields are provided

## Next Steps

1. Start with one feature (e.g., medications)
2. Test thoroughly
3. Migrate other features one by one
4. Remove localStorage code once migration is complete
5. Add error handling and loading states

## Support

For issues or questions:
1. Check backend logs in terminal
2. Check browser console for errors
3. Verify API endpoints with cURL or Postman
4. Review backend README.md for API documentation
