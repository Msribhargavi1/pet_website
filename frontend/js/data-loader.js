// Data Loader Module
const DataLoader = {
    // Load pet information
    async loadPetInfo() {
        try {
            const response = await fetch('data/pet-info.json');
            const data = await response.json();
            this.displayPetInfo(data);
        } catch (error) {
            console.error('Error loading pet info:', error);
        }
    },

    displayPetInfo(data) {
        document.getElementById('petImage').src = data.image;
        document.querySelector('.pet-basic-info h2').textContent = `${data.name} - ${data.breed}`;
        
        const birthDate = new Date(data.birthDate);
        const today = new Date();
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        document.getElementById('petAge').textContent = `${years} years, ${months} months`;
    },

    // Load medical history
    async loadMedicalHistory() {
        try {
            const response = await fetch('data/medical-history.json');
            const data = await response.json();
            this.displayMedicalHistory(data.medicalHistory);
        } catch (error) {
            console.error('Error loading medical history:', error);
        }
    },

    displayMedicalHistory(history) {
        const timeline = document.querySelector('.medical-history .timeline');
        timeline.innerHTML = '';

        history.forEach(yearData => {
            const yearTitle = document.createElement('h3');
            yearTitle.className = 'year-title';
            yearTitle.textContent = yearData.year;
            timeline.appendChild(yearTitle);

            yearData.records.forEach(record => {
                const item = document.createElement('div');
                item.className = 'timeline-item';
                item.innerHTML = `
                    <div class="timeline-date">${record.date}</div>
                    <div class="timeline-content">
                        <h3>${record.treatment}</h3>
                        <p><strong>Doctor:</strong> ${record.doctor}</p>
                        <p><strong>Hospital:</strong> ${record.hospital}</p>
                    </div>
                `;
                timeline.appendChild(item);
            });
        });
    },

    // Load vaccinations
    async loadVaccinations() {
        try {
            const response = await fetch('data/vaccinations.json');
            const data = await response.json();
            this.displayVaccinations(data.vaccinations);
        } catch (error) {
            console.error('Error loading vaccinations:', error);
        }
    },

    displayVaccinations(vaccinations) {
        const grid = document.querySelector('.vaccinations .card-grid');
        grid.innerHTML = '';

        const icons = {
            'Deworming': '💉',
            'Immunity': '🛡️',
            'Rabies': '🦠',
            'Shedding': '🐕',
            'Ticks': '🪲'
        };

        vaccinations.forEach(vac => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${icons[vac.name] || '💉'} ${vac.name}</h3>
                <p class="status">Status: ${vac.status}</p>
                ${vac.doctor ? `<p class="doctor">${vac.doctor}</p>` : ''}
                ${vac.location ? `<p class="location">${vac.location}</p>` : ''}
            `;
            grid.appendChild(card);
        });
    },

    // Load treats
    async loadTreats() {
        try {
            const response = await fetch('data/treats.json');
            const data = await response.json();
            this.displayTreats(data.treats);
        } catch (error) {
            console.error('Error loading treats:', error);
        }
    },

    displayTreats(treats) {
        const grid = document.querySelector('.treats-grid');
        grid.innerHTML = '';

        treats.forEach((treat, index) => {
            const item = document.createElement('div');
            item.className = 'treat-item';
            item.textContent = `${index + 1}. ${treat}`;
            grid.appendChild(item);
        });
    },

    // Load hospitals
    async loadHospitals() {
        try {
            const response = await fetch('data/hospitals.json');
            const data = await response.json();
            this.displayHospitals(data.hospitals);
        } catch (error) {
            console.error('Error loading hospitals:', error);
        }
    },

    displayHospitals(hospitals) {
        const grid = document.querySelector('.hospitals .card-grid');
        grid.innerHTML = '';

        hospitals.forEach(hospital => {
            const card = document.createElement('div');
            card.className = 'card hospital-card';
            card.innerHTML = `
                <h3>🏥 ${hospital.name}</h3>
                <p><strong>Location:</strong> ${hospital.location}</p>
                <p><strong>Doctors:</strong> ${hospital.doctors.join(', ')}</p>
                <p><strong>Last Visit:</strong> ${hospital.lastVisit}</p>
            `;
            grid.appendChild(card);
        });
    },

    // Load growth tracking
    async loadGrowthTracking() {
        try {
            const response = await fetch('data/growth-tracking.json');
            const data = await response.json();
            this.displayGrowthTracking(data.growthRecords);
        } catch (error) {
            console.error('Error loading growth tracking, using fallback data:', error);
            // Fallback data if fetch fails (for file:// protocol)
            const fallbackData = [
                {
                    year: 2022,
                    month: "December",
                    age: "1 yr",
                    height: 32,
                    weight: 8.5,
                    notes: "Puppy stage, rapid growth"
                },
                {
                    year: 2023,
                    month: "December",
                    age: "2 yrs",
                    height: 38,
                    weight: 12.3,
                    notes: "Healthy, active"
                },
                {
                    year: 2024,
                    month: "December",
                    age: "3 yrs",
                    height: 40,
                    weight: 14.1,
                    notes: "Slight weight gain, vet recommended exercise"
                },
                {
                    year: 2025,
                    month: "December",
                    age: "4 yrs",
                    height: 41,
                    weight: 15.0,
                    notes: "Stable growth, ideal condition"
                }
            ];
            this.displayGrowthTracking(fallbackData);
        }
    },

    displayGrowthTracking(records) {
        const list = document.getElementById('trackingList');
        const chart = document.getElementById('trackingChart');
        
        if (records.length > 0) {
            list.innerHTML = '';
            
            // Create simple chart visualization
            const maxWeight = Math.max(...records.map(r => r.weight));
            const maxHeight = Math.max(...records.map(r => r.height));
            
            let chartHTML = '<h3>📊 Growth Progress Chart</h3>';
            chartHTML += '<div class="chart-container">';
            
            records.forEach((record, index) => {
                const weightPercent = (record.weight / maxWeight) * 100;
                const heightPercent = (record.height / maxHeight) * 100;
                
                chartHTML += `
                    <div class="chart-year">
                        <div class="chart-label">${record.year}</div>
                        <div class="chart-bars">
                            <div class="chart-bar-group">
                                <span class="bar-label">Weight: ${record.weight} kg</span>
                                <div class="chart-bar weight-bar" style="width: ${weightPercent}%"></div>
                            </div>
                            <div class="chart-bar-group">
                                <span class="bar-label">Height: ${record.height} cm</span>
                                <div class="chart-bar height-bar" style="width: ${heightPercent}%"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            chartHTML += '</div>';
            chart.innerHTML = chartHTML;
            
            // Display records
            records.forEach(record => {
                const item = document.createElement('div');
                item.className = 'tracking-item';
                item.innerHTML = `
                    <p><strong>Date:</strong> ${record.month} ${record.year}</p>
                    <p><strong>Age:</strong> ${record.age}</p>
                    <p><strong>Height:</strong> ${record.height} cm</p>
                    <p><strong>Weight:</strong> ${record.weight} kg</p>
                    <p><strong>Notes:</strong> ${record.notes}</p>
                `;
                list.appendChild(item);
            });
        }
    },

    // Load medications
    async loadMedications() {
        try {
            const response = await fetch('data/medicines.json');
            const data = await response.json();
            this.displayMedications(data.medications);
        } catch (error) {
            console.error('Error loading medications, using fallback data:', error);
            // Fallback data if fetch fails
            const fallbackData = [
                {
                    name: "Liver Support Syrup",
                    dosage: "5 ml, twice daily",
                    quantity: 18,
                    unit: "doses",
                    refillDate: "2025-12-03"
                },
                {
                    name: "Probiotic Chew",
                    dosage: "1 chew, once daily",
                    quantity: 22,
                    unit: "chews",
                    refillDate: "2025-12-06"
                },
                {
                    name: "Omega-3 Skin Capsule",
                    dosage: "1 capsule, once daily",
                    quantity: 10,
                    unit: "capsules",
                    refillDate: "2025-12-11"
                },
                {
                    name: "Multivitamin Tablet",
                    dosage: "½ tablet, once daily",
                    quantity: 14,
                    unit: "tablets",
                    refillDate: "2025-12-19"
                },
                {
                    name: "Joint Support Powder",
                    dosage: "1 scoop, once on alt days",
                    quantity: 9,
                    unit: "scoops",
                    refillDate: "2025-12-27"
                },
                {
                    name: "Deworming Tablet",
                    dosage: "1 tablet, single dose",
                    quantity: 1,
                    unit: "tablet",
                    refillDate: "2026-01-05"
                }
            ];
            this.displayMedications(fallbackData);
        }
    },

    displayMedications(medications) {
        const list = document.getElementById('medicationTrackingList');
        
        if (medications && medications.length > 0) {
            list.innerHTML = '';
            
            medications.forEach(med => {
                const refillDate = new Date(med.refillDate);
                const today = new Date();
                const daysUntilRefill = Math.ceil((refillDate - today) / (1000 * 60 * 60 * 24));
                
                const isLowStock = med.quantity <= 5;
                const isUrgent = daysUntilRefill <= 7;
                
                const item = document.createElement('div');
                item.className = `medication-tracking-item ${isLowStock ? 'low-stock' : ''}`;
                
                let alertMessage = '';
                if (isLowStock && isUrgent) {
                    alertMessage = '<p class="alert-urgent">⚠️ LOW STOCK & REFILL DUE SOON!</p>';
                } else if (isLowStock) {
                    alertMessage = '<p class="alert-warning">⚠️ LOW STOCK</p>';
                } else if (isUrgent) {
                    alertMessage = '<p class="alert-info">📅 Refill due soon</p>';
                }
                
                item.innerHTML = `
                    <h4>${med.name}</h4>
                    <p><strong>Dosage:</strong> ${med.dosage}</p>
                    <p><strong>Quantity Remaining:</strong> ${med.quantity} ${med.unit}</p>
                    <p><strong>Next Alert Date:</strong> ${refillDate.toLocaleDateString('en-GB')}</p>
                    <p><strong>Days Until Refill:</strong> ${daysUntilRefill > 0 ? daysUntilRefill + ' days' : 'OVERDUE'}</p>
                    ${alertMessage}
                `;
                list.appendChild(item);
            });
        }
    },

    // Load all data
    async loadAll() {
        await this.loadPetInfo();
        await this.loadMedicalHistory();
        await this.loadVaccinations();
        await this.loadTreats();
        await this.loadHospitals();
        await this.loadGrowthTracking();
        await this.loadMedications();
    }
};

// Initialize data loading when page loads
window.addEventListener('load', function() {
    DataLoader.loadAll();
});
