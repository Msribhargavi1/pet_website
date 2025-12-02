// Calculate pet age
function calculateAge() {
    const dob = new Date('2021-10-18');
    const today = new Date();
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    document.getElementById('petAge').textContent = `${years} years, ${months} months`;
}

// Image upload
document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('petImage').src = event.target.result;
            localStorage.setItem('petImage', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Load saved image
function loadSavedImage() {
    const savedImage = localStorage.getItem('petImage');
    if (savedImage) {
        document.getElementById('petImage').src = savedImage;
    }
    
    // Handle image load errors
    const petImage = document.getElementById('petImage');
    petImage.onerror = function() {
        console.error('Failed to load image. Please check the file path.');
        // Clear broken localStorage image
        localStorage.removeItem('petImage');
    };
}

// Diet management
function addDiet() {
    const input = document.getElementById('dietInput');
    const value = input.value.trim();
    
    if (value) {
        const dietList = document.getElementById('dietList');
        if (dietList.children[0].textContent.includes('Add diet items')) {
            dietList.innerHTML = '';
        }
        
        const li = document.createElement('li');
        li.innerHTML = `${value} <button class="remove-btn" onclick="removeItem(this)">Remove</button>`;
        dietList.appendChild(li);
        
        input.value = '';
        saveDiet();
    }
}

function addTreat() {
    const input = document.getElementById('treatInput');
    const value = input.value.trim();
    
    if (value) {
        const treatsList = document.getElementById('treatsList');
        if (treatsList.children[0].textContent.includes('Add treat items')) {
            treatsList.innerHTML = '';
        }
        
        const li = document.createElement('li');
        li.innerHTML = `${value} <button class="remove-btn" onclick="removeItem(this)">Remove</button>`;
        treatsList.appendChild(li);
        
        input.value = '';
        saveTreats();
    }
}

function removeItem(btn) {
    btn.parentElement.remove();
    saveDiet();
    saveTreats();
}

function saveDiet() {
    const dietList = document.getElementById('dietList');
    const items = Array.from(dietList.children).map(li => li.textContent.replace('Remove', '').trim());
    localStorage.setItem('diet', JSON.stringify(items));
}

function saveTreats() {
    const treatsList = document.getElementById('treatsList');
    const items = Array.from(treatsList.children).map(li => li.textContent.replace('Remove', '').trim());
    localStorage.setItem('treats', JSON.stringify(items));
}

function loadDiet() {
    const savedDiet = localStorage.getItem('diet');
    if (savedDiet) {
        const items = JSON.parse(savedDiet);
        const dietList = document.getElementById('dietList');
        if (items.length > 0) {
            dietList.innerHTML = '';
            items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `${item} <button class="remove-btn" onclick="removeItem(this)">Remove</button>`;
                dietList.appendChild(li);
            });
        }
    }
    
    const savedTreats = localStorage.getItem('treats');
    if (savedTreats) {
        const items = JSON.parse(savedTreats);
        const treatsList = document.getElementById('treatsList');
        if (items.length > 0) {
            treatsList.innerHTML = '';
            items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `${item} <button class="remove-btn" onclick="removeItem(this)">Remove</button>`;
                treatsList.appendChild(li);
            });
        }
    }
}

// Medicine management
function addMedicine() {
    const nameInput = document.getElementById('medicineInput');
    const dosageInput = document.getElementById('dosageInput');
    const name = nameInput.value.trim();
    const dosage = dosageInput.value.trim();
    
    if (name && dosage) {
        const medicineList = document.getElementById('medicineList');
        if (medicineList.children[0] && medicineList.children[0].tagName === 'P') {
            medicineList.innerHTML = '';
        }
        
        const div = document.createElement('div');
        div.className = 'medicine-item';
        div.innerHTML = `
            <h4>${name}</h4>
            <p>Dosage: ${dosage}</p>
            <button class="remove-btn" onclick="removeMedicine(this)">Remove</button>
        `;
        medicineList.appendChild(div);
        
        nameInput.value = '';
        dosageInput.value = '';
        saveMedicines();
    }
}

function removeMedicine(btn) {
    btn.parentElement.remove();
    saveMedicines();
}

function saveMedicines() {
    const medicineList = document.getElementById('medicineList');
    const items = Array.from(medicineList.children).map(div => ({
        name: div.querySelector('h4').textContent,
        dosage: div.querySelector('p').textContent.replace('Dosage: ', '')
    }));
    localStorage.setItem('medicines', JSON.stringify(items));
}

function loadMedicines() {
    const savedMedicines = localStorage.getItem('medicines');
    if (savedMedicines) {
        const items = JSON.parse(savedMedicines);
        const medicineList = document.getElementById('medicineList');
        if (items.length > 0) {
            medicineList.innerHTML = '';
            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'medicine-item';
                div.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>Dosage: ${item.dosage}</p>
                    <button class="remove-btn" onclick="removeMedicine(this)">Remove</button>
                `;
                medicineList.appendChild(div);
            });
        }
    }
}

// Next due date
function setNextDue() {
    const dateInput = document.getElementById('nextDueDate');
    const typeInput = document.getElementById('nextDueType');
    const date = dateInput.value;
    const type = typeInput.value.trim();
    
    if (date && type) {
        const dueDate = new Date(date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dueDate.toLocaleDateString('en-US', options);
        
        const dueDisplay = document.getElementById('dueDisplay');
        dueDisplay.innerHTML = `Next ${type} vaccination due on: ${formattedDate}`;
        
        localStorage.setItem('nextDue', JSON.stringify({ date: formattedDate, type }));
        
        dateInput.value = '';
        typeInput.value = '';
    }
}

function loadNextDue() {
    const savedDue = localStorage.getItem('nextDue');
    if (savedDue) {
        const { date, type } = JSON.parse(savedDue);
        const dueDisplay = document.getElementById('dueDisplay');
        dueDisplay.innerHTML = `Next ${type} vaccination due on: ${date}`;
    }
}

// Initialize on page load
window.addEventListener('load', function() {
    calculateAge();
    loadSavedImage();
    loadDiet();
    loadMedicines();
    loadNextDue();
    
    // Add event listeners to symptom checkboxes
    const symptomCheckboxes = document.querySelectorAll('.symptoms-grid input[type="checkbox"]');
    symptomCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Hide results immediately when any checkbox is unchecked
            if (!this.checked) {
                const result = document.getElementById('symptomsResult');
                result.className = 'symptoms-result';
                result.innerHTML = '';
            }
        });
    });
});


// Growth & Weight Tracking
function addTracking() {
    const date = document.getElementById('trackingDate').value;
    const weight = document.getElementById('weightInput').value;
    const height = document.getElementById('heightInput').value;
    
    if (date && weight && height) {
        const trackingList = document.getElementById('trackingList');
        
        const dateObj = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        
        const item = document.createElement('div');
        item.className = 'tracking-item';
        item.innerHTML = `
            <p><strong>Date:</strong> ${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}</p>
            <p><strong>Height:</strong> ${height} cm</p>
            <p><strong>Weight:</strong> ${weight} kg</p>
            <p><strong>Notes:</strong> <input type="text" placeholder="Add notes..." class="tracking-notes" /></p>
            <button class="remove-btn" onclick="this.parentElement.remove(); saveTracking();">Remove</button>
        `;
        trackingList.appendChild(item);
        
        document.getElementById('trackingDate').value = '';
        document.getElementById('weightInput').value = '';
        document.getElementById('heightInput').value = '';
        
        saveTracking();
    }
}

function saveTracking() {
    const trackingList = document.getElementById('trackingList');
    const items = Array.from(trackingList.children).map(item => item.innerHTML);
    localStorage.setItem('tracking', JSON.stringify(items));
}

// Vaccination Reminder System
function setReminder() {
    const vaccine = document.getElementById('reminderVaccine').value;
    const date = document.getElementById('reminderDate').value;
    const method = document.getElementById('reminderMethod').value;
    
    if (vaccine && date && method) {
        const reminderList = document.getElementById('reminderList');
        
        if (reminderList.children[0]?.tagName === 'P') {
            reminderList.innerHTML = '';
        }
        
        const dueDate = new Date(date);
        const today = new Date();
        const daysUntil = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
        
        let status = 'upcoming';
        if (daysUntil < 0) status = 'overdue';
        else if (daysUntil <= 7) status = 'upcoming';
        
        const item = document.createElement('div');
        item.className = `reminder-item ${status}`;
        item.innerHTML = `
            <div>
                <h4>${vaccine}</h4>
                <p>Due: ${dueDate.toLocaleDateString()}</p>
                <p>Reminder: ${method.toUpperCase()}</p>
                <p><strong>${daysUntil < 0 ? 'OVERDUE!' : `${daysUntil} days remaining`}</strong></p>
            </div>
            <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
        `;
        reminderList.appendChild(item);
        
        document.getElementById('reminderVaccine').value = '';
        document.getElementById('reminderDate').value = '';
        document.getElementById('reminderMethod').value = '';
        
        saveReminders();
    }
}

function saveReminders() {
    const reminderList = document.getElementById('reminderList');
    const items = Array.from(reminderList.children).map(item => item.innerHTML);
    localStorage.setItem('reminders', JSON.stringify(items));
}

// Symptoms Checker
function checkSymptoms() {
    const checkboxes = document.querySelectorAll('.symptoms-grid input[type="checkbox"]:checked');
    const symptoms = Array.from(checkboxes).map(cb => cb.value);
    const result = document.getElementById('symptomsResult');
    
    if (symptoms.length === 0) {
        result.className = 'symptoms-result';
        result.innerHTML = '';
        return;
    }
    
    const criticalSymptoms = ['breathing', 'seizures', 'fever'];
    const moderateSymptoms = ['vomiting', 'diarrhea', 'lethargy'];
    
    const hasCritical = symptoms.some(s => criticalSymptoms.includes(s));
    const hasModerate = symptoms.some(s => moderateSymptoms.includes(s));
    
    let severity = 'low';
    let message = '';
    let advice = '';
    
    if (hasCritical) {
        severity = 'high';
        message = '⚠️ CRITICAL - Immediate Veterinary Care Required!';
        advice = `
            <p><strong>Symptoms detected:</strong> ${symptoms.join(', ')}</p>
            <p>These symptoms require immediate veterinary attention. Please contact your vet or visit the nearest emergency clinic.</p>
            <p><strong>Nearest Hospital:</strong> Government Hospital, Tadipatri - Dr. Hussain</p>
            <p><strong>Contact:</strong> 8978833504</p>
        `;
    } else if (hasModerate || symptoms.length >= 3) {
        severity = 'medium';
        message = '⚠️ MODERATE - Veterinary Consultation Recommended';
        advice = `
            <p><strong>Symptoms detected:</strong> ${symptoms.join(', ')}</p>
            <p>These symptoms should be monitored closely. Schedule a vet appointment within 24-48 hours.</p>
            <p>Monitor for worsening symptoms and ensure Cherry stays hydrated.</p>
        `;
    } else {
        severity = 'low';
        message = 'ℹ️ MILD - Monitor and Home Care';
        advice = `
            <p><strong>Symptoms detected:</strong> ${symptoms.join(', ')}</p>
            <p>These symptoms are mild. Monitor Cherry closely and ensure proper rest, hydration, and diet.</p>
            <p>If symptoms persist for more than 24 hours or worsen, consult your veterinarian.</p>
        `;
    }
    
    result.className = `symptoms-result show ${severity}`;
    result.innerHTML = `
        <h3>${message}</h3>
        ${advice}
    `;
}

// Medication Tracking
function addMedicationTracking() {
    const name = document.getElementById('medName').value;
    const dosage = document.getElementById('medDosage').value;
    const quantity = document.getElementById('medQuantity').value;
    const refillDate = document.getElementById('medRefillDate').value;
    
    if (name && dosage && quantity && refillDate) {
        const list = document.getElementById('medicationTrackingList');
        
        if (list.children[0]?.tagName === 'P') {
            list.innerHTML = '';
        }
        
        const lowStock = parseInt(quantity) <= 5;
        
        const item = document.createElement('div');
        item.className = `medication-tracking-item ${lowStock ? 'low-stock' : ''}`;
        item.innerHTML = `
            <h4>${name}</h4>
            <p><strong>Dosage:</strong> ${dosage}</p>
            <p><strong>Quantity Remaining:</strong> ${quantity} ${lowStock ? '⚠️ LOW STOCK' : ''}</p>
            <p><strong>Refill Date:</strong> ${new Date(refillDate).toLocaleDateString()}</p>
            <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
        `;
        list.appendChild(item);
        
        document.getElementById('medName').value = '';
        document.getElementById('medDosage').value = '';
        document.getElementById('medQuantity').value = '';
        document.getElementById('medRefillDate').value = '';
        
        saveMedicationTracking();
    }
}

function saveMedicationTracking() {
    const list = document.getElementById('medicationTrackingList');
    const items = Array.from(list.children).map(item => item.innerHTML);
    localStorage.setItem('medicationTracking', JSON.stringify(items));
}

// Family Access
function addFamilyMember() {
    const name = document.getElementById('familyName').value;
    const email = document.getElementById('familyEmail').value;
    const role = document.getElementById('familyRole').value;
    
    if (name && email && role) {
        const list = document.getElementById('familyList');
        
        if (list.children[0]?.tagName === 'P') {
            list.innerHTML = '';
        }
        
        const item = document.createElement('div');
        item.className = 'family-member';
        item.innerHTML = `
            <div>
                <h4>${name}</h4>
                <p>${email}</p>
            </div>
            <div>
                <span class="role ${role}">${role.toUpperCase()}</span>
                <button class="remove-btn" onclick="this.parentElement.parentElement.remove()" style="margin-left: 10px;">Remove</button>
            </div>
        `;
        list.appendChild(item);
        
        document.getElementById('familyName').value = '';
        document.getElementById('familyEmail').value = '';
        document.getElementById('familyRole').value = '';
        
        saveFamilyMembers();
    }
}

function saveFamilyMembers() {
    const list = document.getElementById('familyList');
    const items = Array.from(list.children).map(item => item.innerHTML);
    localStorage.setItem('familyMembers', JSON.stringify(items));
}

// AI Chatbot functions are now in ai-assistant.js


// Toggle diet day dropdown
function toggleDietDay(dayId) {
    const content = document.getElementById(dayId);
    const button = content.previousElementSibling;
    const arrow = button.querySelector('.arrow');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('active');
        arrow.style.transform = 'rotate(180deg)';
    }
}


// Toggle album year dropdown
function toggleAlbumYear(yearId) {
    const content = document.getElementById(yearId);
    const button = content.previousElementSibling;
    const arrow = button.querySelector('.arrow');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('active');
        arrow.style.transform = 'rotate(180deg)';
    }
}
