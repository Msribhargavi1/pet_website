# Cherry - Pet Information Website

## Project Structure

```
pet_website/
│
├── index.html                 # Main HTML file
│
├── css/
│   └── styles.css            # All styling
│
├── js/
│   ├── data-loader.js        # Loads data from JSON files
│   └── script.js             # Main application logic
│
├── data/                     # JSON data files
│   ├── pet-info.json         # Pet basic information
│   ├── medical-history.json  # Medical records by year
│   ├── vaccinations.json     # Vaccination records
│   ├── medicines.json        # Medicine tracking
│   ├── diet.json             # 7-day diet plan
│   ├── treats.json           # List of treats
│   └── hospitals.json        # Hospital information
│
├── album/                    # Pet photos organized by year
│   ├── 2021/
│   ├── 2022/
│   ├── 2023/
│   ├── 2024/
│   └── 2025/
│
├── Image (5).jpg             # Main pet profile photo
├── LICENSE
└── README.md

```

## Data Files

### pet-info.json
Contains basic pet information:
- Name, breed, birth date
- Location and contact information
- Profile image path

### medical-history.json
Medical records organized by year:
- Date of treatment
- Treatment type
- Doctor name
- Hospital location

### vaccinations.json
Vaccination records:
- Vaccine name
- Status and last date
- Doctor and location

### medicines.json
Medicine tracking (user-added):
- Medicine name and dosage
- Quantity remaining
- Refill dates

### diet.json
Complete diet information:
- Daily add-ons (supplements)
- 7-day meal plan (breakfast, lunch, dinner)
- Foods to avoid

### treats.json
List of approved treats for the pet

### hospitals.json
Veterinary hospital information:
- Hospital name and location
- Doctors
- Last visit date

## Features

1. **Pet Profile** - Basic information and photo
2. **Vaccination Records** - Track all vaccinations
3. **Medical History** - Complete medical timeline
4. **7-Day Diet Chart** - Detailed meal plans
5. **Treats List** - Approved treats
6. **Hospital Information** - Vet contact details
7. **Photo Album** - Year-wise photo gallery
8. **Growth Tracking** - Weight and height analytics
9. **Vaccination Reminders** - Email/SMS/App alerts
10. **Symptoms Checker** - Health assessment tool
11. **Medication Tracking** - Refill alerts
12. **Family Sharing** - Multi-user access
13. **AI Chatbot** - Pet health assistant

## How to Update Data

### To update pet information:
Edit `data/pet-info.json`

### To add medical records:
Edit `data/medical-history.json` and add new records under the appropriate year

### To update vaccinations:
Edit `data/vaccinations.json`

### To modify diet plan:
Edit `data/diet.json`

### To add/remove treats:
Edit `data/treats.json`

### To update hospital information:
Edit `data/hospitals.json`

## Local Storage

The following features use browser localStorage for user-added data:
- Medicine tracking
- Growth tracking records
- Vaccination reminders
- Family member access
- AI chatbot history

## Running the Website

1. Open `index.html` in a web browser
2. For local development, use a local server (e.g., Live Server extension in VS Code)
3. All data will be loaded automatically from JSON files

## Deployment

When deploying to a hosting service (like Vercel):
1. Ensure all file paths are relative
2. Upload the entire project structure
3. The `data/` folder must be accessible via HTTP requests

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses Fetch API for loading JSON data
