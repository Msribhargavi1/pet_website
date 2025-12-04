# Frontend - Pet Health Management System

## 📁 Structure

```
frontend/
├── index.html              # Main application page
├── css/
│   └── styles.css         # All styles and themes
├── js/
│   ├── script.js          # Main application logic
│   ├── api-service.js     # Backend API client
│   ├── data-loader.js     # Data loading utilities
│   ├── ai-assistant.js    # AI chatbot functionality
│   └── config.js          # Configuration settings
├── Album/                 # Pet photos organized by year
│   ├── 2021/
│   ├── 2022/
│   ├── 2023/
│   ├── 2024/
│   └── 2025/
└── data/                  # JSON data files (legacy)
    ├── pet-info.json
    ├── medical-history.json
    ├── medications.json
    ├── vaccinations.json
    ├── growth-tracking.json
    ├── diet.json
    ├── treats.json
    └── hospitals.json
```

## 🚀 Running the Frontend

### Option 1: Direct File Access
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)

**Using Python:**
```bash
cd frontend
python -m http.server 8000
# Visit: http://localhost:8000
```

**Using Node.js (http-server):**
```bash
cd frontend
npx http-server -p 8000
# Visit: http://localhost:8000
```

**Using PHP:**
```bash
cd frontend
php -S localhost:8000
# Visit: http://localhost:8000
```

## 🎨 Features

### Core Features
- ✅ Pet profile management
- ✅ Medical history timeline
- ✅ Medication tracking with refill alerts
- ✅ Vaccination records and reminders
- ✅ Growth & weight tracking with charts
- ✅ 7-day diet plan
- ✅ Photo album (year-wise organization)
- ✅ Symptoms checker
- ✅ Family sharing access
- ✅ AI chatbot assistant

### UI Features
- ✅ Responsive design
- ✅ Multiple color themes
- ✅ Smooth animations
- ✅ Collapsible sections
- ✅ Filter and sort capabilities
- ✅ Interactive charts
- ✅ Loading states
- ✅ Error handling

## 🔧 Configuration

### API Configuration
Edit `js/api-service.js` to change the backend URL:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### AI Assistant Configuration
Edit `js/config.js` for AI settings:

```javascript
const CONFIG = {
    LLM_PROVIDER: 'huggingface', // or 'openai'
    HUGGINGFACE_API_KEY: 'your-key-here',
    OPENAI_API_KEY: 'your-key-here'
};
```

## 📦 Dependencies

### External Libraries
None! Pure vanilla JavaScript.

### Browser Requirements
- Modern browser with ES6+ support
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

## 🎨 Themes

The application includes multiple color themes:
- Default (Purple-Pink gradient)
- Golden Retriever theme
- Dark theme
- Pastel theme

Themes can be changed in the UI or by modifying CSS variables in `styles.css`.

## 📱 Responsive Design

The frontend is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🔌 Backend Integration

### API Service Layer
The `api-service.js` file provides a clean interface to the backend:

```javascript
// Example usage
const pets = await PetAPI.getAll();
const medications = await MedicationAPI.getByPetId(1);
const growth = await GrowthTrackingAPI.create(data);
```

### Available APIs
- `PetAPI` - Pet information
- `MedicalHistoryAPI` - Medical records
- `MedicationAPI` - Medications
- `VaccinationAPI` - Vaccinations
- `GrowthTrackingAPI` - Growth tracking
- `DietPlanAPI` - Diet plans
- `AlbumAPI` - Photo album

## 🗂️ Data Storage

### Current (Hybrid)
- **localStorage**: Legacy data storage (being phased out)
- **Backend API**: New persistent storage via REST API

### Migration
Data is being migrated from localStorage to backend database. See [Migration Guide](../docs/BACKEND_MIGRATION_GUIDE.md).

## 🎯 Key Files

### index.html
Main HTML structure with all sections:
- Pet Info
- Medical History
- Medications
- Vaccinations
- Growth Tracking
- Diet Plan
- Album
- Symptoms Checker
- Family Access
- AI Chatbot

### css/styles.css
Complete styling including:
- Layout and grid
- Color themes
- Animations
- Responsive breakpoints
- Component styles

### js/script.js
Main application logic:
- DOM manipulation
- Event handlers
- Data management
- UI updates
- Filter/sort functions

### js/api-service.js
Backend API client:
- HTTP request wrapper
- API endpoint definitions
- Error handling
- Response parsing

### js/data-loader.js
Data loading utilities:
- Load JSON data files
- Initialize application data
- Populate UI elements

### js/ai-assistant.js
AI chatbot functionality:
- LLM integration
- Chat interface
- Response handling
- Context management

## 🧪 Testing

### Manual Testing
1. Open index.html in browser
2. Open DevTools Console (F12)
3. Test API calls:
   ```javascript
   PetAPI.getAll().then(console.log);
   ```

### Browser Console Commands
```javascript
// Test backend connection
PetAPI.getAll().then(console.log);

// Create test data
PetAPI.create({
  name: "Test Dog",
  breed: "Test Breed",
  dateOfBirth: "2020-01-01"
}).then(console.log);

// Check localStorage
console.log(localStorage);
```

## 🐛 Troubleshooting

### Backend Not Connecting
1. Verify backend is running: http://localhost:8080/api/pets
2. Check CORS settings in backend
3. Check browser console for errors

### Images Not Loading
1. Verify image paths in Album/ folder
2. Check file permissions
3. Use browser DevTools Network tab

### Styles Not Applied
1. Clear browser cache
2. Check CSS file path
3. Verify no CSS syntax errors

### JavaScript Errors
1. Open browser console (F12)
2. Check for error messages
3. Verify all JS files loaded
4. Check API service configuration

## 📈 Performance

### Optimization Tips
- Images are lazy-loaded
- API calls are cached where appropriate
- Minimal external dependencies
- Efficient DOM manipulation

### Load Times
- Initial load: < 2 seconds
- API calls: < 100ms
- Image loading: Depends on size

## 🔒 Security

### Client-Side
- Input validation
- XSS prevention
- Safe DOM manipulation

### API Communication
- CORS enabled
- JSON data format
- Error handling

## 🎓 Development

### Adding New Features
1. Add HTML structure in index.html
2. Add styles in css/styles.css
3. Add logic in js/script.js
4. Add API calls in js/api-service.js (if needed)

### Code Style
- Use ES6+ features
- Async/await for API calls
- Clear function names
- Comment complex logic

## 📝 Notes

### Pet Information
Currently configured for "Cherry" - a Golden Retriever with PSS condition.

### Medical Data
Includes historical data from 2022-2025.

### Diet Plan
Specialized diet for liver health (PSS management).

## 🔄 Updates

### Recent Changes
- Added backend API integration
- Consolidated 7-day diet plan into single dropdown
- Fixed album filter clear functionality
- Added medication reference table

### Upcoming
- Complete localStorage to backend migration
- Enhanced error handling
- Loading states for API calls
- Offline mode support

## 📞 Support

For frontend issues:
1. Check browser console for errors
2. Verify all files are present
3. Check API service configuration
4. Review [documentation](../docs/)

## 🎉 Credits

Built with vanilla JavaScript, HTML5, and CSS3.
No frameworks, just pure web technologies!

---

**Frontend Version**: 2.0 (with backend integration)

*Last Updated: December 4, 2025*
