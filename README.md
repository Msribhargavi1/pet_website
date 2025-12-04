# Pet Health Management System

A comprehensive web application for managing pet health records, built with a modern frontend and **TWO backend options**: Java Spring Boot and Python FastAPI.

## 🐾 Project Overview

This system helps pet owners track and manage their pet's health information including:
- Pet profile and basic information
- Medical history and treatments
- Medications and refill alerts
- Vaccination records and reminders
- Growth and weight tracking
- 7-day diet plans
- Photo album organized by year

## 📁 Project Structure

```
pet-health-management/
├── frontend/                    # Frontend application
│   ├── index.html              # Main HTML file
│   ├── css/                    # Stylesheets
│   │   └── styles.css
│   ├── js/                     # JavaScript files
│   │   ├── script.js           # Main application logic
│   │   ├── api-service.js      # Backend API client
│   │   ├── data-loader.js      # Data loading utilities
│   │   ├── ai-assistant.js     # AI chatbot
│   │   └── config.js           # Configuration
│   ├── Album/                  # Pet photos organized by year
│   │   ├── 2021/
│   │   ├── 2022/
│   │   ├── 2023/
│   │   ├── 2024/
│   │   └── 2025/
│   └── data/                   # JSON data files
│       ├── pet-info.json
│       ├── medical-history.json
│       ├── medications.json
│       ├── vaccinations.json
│       ├── growth-tracking.json
│       ├── diet.json
│       ├── treats.json
│       └── hospitals.json
│
├── backend/                    # Backend application (Java Spring Boot)
│   ├── src/
│   │   └── main/
│   │       ├── java/com/petcare/
│   │       │   ├── PetHealthApplication.java
│   │       │   ├── model/      # Entity models (7 classes)
│   │       │   ├── repository/ # JPA repositories (7 interfaces)
│   │       │   └── controller/ # REST controllers (7 classes)
│   │       └── resources/
│   │           └── application.properties
│   ├── pom.xml                 # Maven dependencies
│   ├── .gitignore
│   └── README.md               # Backend documentation
│
├── docs/                       # Documentation
│   ├── QUICK_START.md          # Quick start guide
│   ├── ARCHITECTURE.md         # System architecture
│   ├── BACKEND_SETUP_SUMMARY.md
│   ├── BACKEND_MIGRATION_GUIDE.md
│   ├── BACKEND_COMPLETE.md
│   ├── IMPLEMENTATION_CHECKLIST.md
│   ├── SESSION_HISTORY.md
│   └── WHATS_NEW.md
│
├── scripts/                    # Utility scripts
│   ├── start-backend.bat       # Windows backend starter
│   └── start-backend.sh        # Linux/Mac backend starter
│
├── .gitignore                  # Git ignore rules
├── LICENSE                     # License file
├── PROJECT_STRUCTURE.md        # Project structure details
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

- **Java 21+** (LTS) - [Download](https://adoptium.net/)
- **Maven 3.9+** - [Download](https://maven.apache.org/download.cgi)
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pet-health-management
   ```

2. **Start the backend**
   
   **Windows:**
   ```bash
   scripts\start-backend.bat
   ```
   
   **Linux/Mac:**
   ```bash
   chmod +x scripts/start-backend.sh
   ./scripts/start-backend.sh
   ```
   
   Or manually:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Open the frontend**
   ```bash
   # Simply open frontend/index.html in your browser
   # Or use a local server:
   cd frontend
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

4. **Verify setup**
   - Backend API: http://localhost:8080/api/pets
   - Frontend: Open frontend/index.html

## 🎯 Features

### Frontend Features
- ✅ Responsive design with beautiful UI
- ✅ Pet profile management
- ✅ Medical history timeline
- ✅ Medication tracking with refill alerts
- ✅ Vaccination reminders
- ✅ Growth tracking with charts
- ✅ 7-day diet plan
- ✅ Photo album with year-wise organization
- ✅ Symptoms checker
- ✅ AI chatbot assistant
- ✅ Family sharing access
- ✅ Multiple color themes
- ✅ Animations and effects

### Backend Features
- ✅ RESTful API (42 endpoints)
- ✅ SQLite3 database
- ✅ JPA/Hibernate ORM
- ✅ CORS enabled
- ✅ Data validation
- ✅ Automatic table creation
- ✅ Hot reload (DevTools)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Quick Start](docs/QUICK_START.md) | Get started in 3 steps |
| [Architecture](docs/ARCHITECTURE.md) | System architecture and design |
| [Backend Setup](docs/BACKEND_SETUP_SUMMARY.md) | Complete backend guide |
| [Migration Guide](docs/BACKEND_MIGRATION_GUIDE.md) | Migrate from localStorage |
| [Implementation Checklist](docs/IMPLEMENTATION_CHECKLIST.md) | Verify your setup |
| [What's New](docs/WHATS_NEW.md) | Latest changes |
| [Backend README](backend/README.md) | Backend API documentation |

## 🔧 Technology Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Fetch API for HTTP requests
- LocalStorage (legacy) + REST API (new)

### Backend
- Java 21 (LTS)
- Spring Boot 3.4.0 (Latest)
- Spring Data JPA
- Hibernate ORM
- SQLite3 Database
- Maven
- Modern Features: Java Records, Global Exception Handling, Simplified CORS

## 🌐 API Endpoints

Base URL: `http://localhost:8080/api`

### Resources
- `/pets` - Pet information (5 endpoints)
- `/medical-history` - Medical records (6 endpoints)
- `/medications` - Medication tracking (7 endpoints)
- `/vaccinations` - Vaccination records (6 endpoints)
- `/growth-tracking` - Growth records (6 endpoints)
- `/diet-plan` - Diet plans (6 endpoints)
- `/album` - Photo album (6 endpoints)

**Total: 42 REST endpoints**

See [Backend README](backend/README.md) for complete API documentation.

## 🗄️ Database

- **Type**: SQLite3
- **Location**: `backend/petcare.db` (auto-created)
- **Tables**: 7 tables (auto-generated by Hibernate)
- **Backup**: Simply copy the .db file

### Tables
1. `pet_info` - Pet basic information
2. `medical_history` - Medical records
3. `medications` - Medication tracking
4. `vaccinations` - Vaccination records
5. `growth_tracking` - Weight/height records
6. `diet_plan` - Diet plan details
7. `album` - Photo metadata

## 🧪 Testing

### Test Backend API
```bash
# Get all pets
curl http://localhost:8080/api/pets

# Create a pet
curl -X POST http://localhost:8080/api/pets \
  -H "Content-Type: application/json" \
  -d '{"name":"Cherry","breed":"Golden Retriever","dateOfBirth":"2021-10-18"}'
```

### Test Frontend Integration
Open browser console (F12) and run:
```javascript
// Test API connection
PetAPI.getAll().then(console.log);

// Create a pet
PetAPI.create({
  name: "Cherry",
  breed: "Golden Retriever",
  dateOfBirth: "2021-10-18"
}).then(console.log);
```

## 📦 Deployment

### Development
- Frontend: Open index.html in browser
- Backend: Run with Maven (`mvn spring-boot:run`)

### Production

**Option 1: Simple Deployment**
- Frontend: Host on any web server (Apache, Nginx, GitHub Pages)
- Backend: Run JAR file on server
- Database: SQLite file on server

**Option 2: Cloud Deployment**
- Frontend: Netlify, Vercel, or GitHub Pages
- Backend: Heroku, AWS, Azure, or Google Cloud
- Database: Upgrade to PostgreSQL/MySQL for production

**Option 3: Docker**
- Create Dockerfile for backend
- Use docker-compose for full stack
- Deploy anywhere with Docker support

## 🔐 Security

Current:
- ✅ CORS enabled for frontend access
- ✅ SQL injection prevention (JPA/Hibernate)
- ✅ Input validation
- ✅ Type-safe operations

Future enhancements:
- 🔜 User authentication (JWT)
- 🔜 Role-based authorization
- 🔜 HTTPS/SSL
- 🔜 API rate limiting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 👥 Authors

- Initial work and design
- Backend implementation (Java Spring Boot + SQLite3)
- Frontend enhancements

## 🙏 Acknowledgments

- Spring Boot framework
- SQLite database
- All open-source libraries used

## 📞 Support

For issues, questions, or suggestions:
1. Check the [documentation](docs/)
2. Review [Implementation Checklist](docs/IMPLEMENTATION_CHECKLIST.md)
3. Check backend logs for errors
4. Open an issue on GitHub

## 🗺️ Roadmap

### Phase 1 (Completed) ✅
- ✅ Frontend UI with all features
- ✅ Backend REST API
- ✅ SQLite database integration
- ✅ Complete documentation

### Phase 2 (Planned) 🔜
- 🔜 User authentication
- 🔜 File upload for images
- 🔜 Email notifications
- 🔜 PDF report generation
- 🔜 Data export/import

### Phase 3 (Future) 🚀
- 🚀 Mobile app (React Native)
- 🚀 Real-time updates (WebSocket)
- 🚀 Multi-pet support
- 🚀 Vet portal integration
- 🚀 Cloud sync

## 📊 Project Stats

- **Frontend**: ~2,000 lines of code
- **Backend**: ~1,500 lines of Java code
- **Documentation**: ~8,000 words
- **API Endpoints**: 42
- **Database Tables**: 7
- **Features**: 15+

## 🎉 Getting Help

- **Quick Start**: See [docs/QUICK_START.md](docs/QUICK_START.md)
- **Backend Issues**: See [backend/README.md](backend/README.md)
- **Migration**: See [docs/BACKEND_MIGRATION_GUIDE.md](docs/BACKEND_MIGRATION_GUIDE.md)
- **Architecture**: See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

**Built with ❤️ for pet lovers everywhere** 🐾

*Last Updated: December 4, 2025*
