# Pet Health Management Backend

A RESTful API backend built with Java Spring Boot and SQLite3 for the Pet Health Management System.

## Technology Stack

- **Java**: 21 (LTS)
- **Spring Boot**: 3.4.0 (Latest)
- **Database**: SQLite3
- **ORM**: Hibernate/JPA
- **Build Tool**: Maven
- **Modern Features**:
  - Java Records for DTOs
  - @RestControllerAdvice for global exception handling
  - Simplified CORS configuration
  - No boilerplate code

## Project Structure

```
backend/
├── src/main/java/com/petcare/
│   ├── PetHealthApplication.java       # Main application entry point
│   ├── model/                          # Entity models
│   │   ├── PetInfo.java
│   │   ├── MedicalHistory.java
│   │   ├── Medication.java
│   │   ├── Vaccination.java
│   │   ├── GrowthTracking.java
│   │   ├── DietPlan.java
│   │   └── Album.java
│   ├── repository/                     # JPA repositories
│   │   ├── PetInfoRepository.java
│   │   ├── MedicalHistoryRepository.java
│   │   ├── MedicationRepository.java
│   │   ├── VaccinationRepository.java
│   │   ├── GrowthTrackingRepository.java
│   │   ├── DietPlanRepository.java
│   │   └── AlbumRepository.java
│   └── controller/                     # REST controllers
│       ├── PetInfoController.java
│       ├── MedicalHistoryController.java
│       ├── MedicationController.java
│       ├── VaccinationController.java
│       ├── GrowthTrackingController.java
│       ├── DietPlanController.java
│       └── AlbumController.java
├── src/main/resources/
│   └── application.properties          # Configuration
└── pom.xml                             # Maven dependencies
```

## Database Schema

### Tables

1. **pet_info** - Pet basic information
2. **medical_history** - Medical records and treatments
3. **medications** - Current and past medications
4. **vaccinations** - Vaccination records and reminders
5. **growth_tracking** - Weight and height tracking
6. **diet_plan** - 7-day diet plan details
7. **album** - Photo album with metadata

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

## Setup Instructions

### Prerequisites
- Java 21 or higher (LTS recommended)
- Maven 3.9 or higher

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

### Alternative: Run JAR directly
```bash
mvn clean package
java -jar target/pet-health-backend-1.0.0.jar
```

## Database

The SQLite database file `petcare.db` will be automatically created in the project root directory when you first run the application.

### Database Location
- Development: `./petcare.db`
- Tables are auto-created based on entity models

## CORS Configuration

CORS is enabled for all origins (`*`) to allow the frontend to communicate with the backend. In production, update this to specific domains in `application.properties`.

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
    "dateOfBirth": "2021-10-18",
    "gender": "Female",
    "color": "Golden"
  }'

# Get medications for pet ID 1
curl http://localhost:8080/api/medications/pet/1
```

### Using Postman
Import the endpoints into Postman and test with the base URL: `http://localhost:8080/api`

## Frontend Integration

The frontend JavaScript file `js/api-service.js` provides ready-to-use API functions:

```javascript
// Example usage in frontend
const petData = await PetAPI.getById(1);
const medications = await MedicationAPI.getByPetId(1);
```

## Configuration

Edit `src/main/resources/application.properties` to customize:
- Server port
- Database location
- CORS settings
- File upload limits

## Development

### Hot Reload
Spring Boot DevTools is included for automatic restart during development.

### Database Inspection
Use any SQLite browser tool to inspect the database:
- DB Browser for SQLite
- SQLite Studio
- DBeaver

## Production Deployment

1. Update CORS settings in `application.properties`
2. Build production JAR: `mvn clean package -DskipTests`
3. Deploy JAR file to server
4. Run with: `java -jar pet-health-backend-1.0.0.jar`

## Troubleshooting

### Port Already in Use
Change the port in `application.properties`:
```properties
server.port=8081
```

### Database Locked
Ensure only one instance of the application is running.

### CORS Errors
Verify CORS configuration in `PetHealthApplication.java` and `application.properties`.

## License
Same as the main project.
