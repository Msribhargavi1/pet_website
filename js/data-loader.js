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

    // Load all data
    async loadAll() {
        await this.loadPetInfo();
        await this.loadMedicalHistory();
        await this.loadVaccinations();
        await this.loadTreats();
        await this.loadHospitals();
    }
};

// Initialize data loading when page loads
window.addEventListener('load', function() {
    DataLoader.loadAll();
});
