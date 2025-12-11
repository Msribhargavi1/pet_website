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


// Toggle diet day dropdown (starts collapsed)
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

// Scroll diet plan days
function scrollDietPlan(direction) {
    const scroller = document.querySelector('.diet-days-scroller');
    const scrollAmount = 320; // Width of one day card plus gap
    
    if (direction === 'left') {
        scroller.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        scroller.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}


// Toggle album year dropdown (starts collapsed)
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


// Medication View Functions
function changeMedicationView() {
    const viewType = document.getElementById('medViewType').value;
    const cardsList = document.getElementById('medicationTrackingList');
    const table = document.getElementById('medicationTable');
    
    if (viewType === 'table') {
        cardsList.style.display = 'none';
        table.style.display = 'block';
        updateMedicationTable();
    } else {
        cardsList.style.display = 'grid';
        table.style.display = 'none';
    }
}

function updateMedicationTable() {
    const tbody = document.getElementById('medicationTableBody');
    const cards = document.querySelectorAll('.medication-tracking-item');
    tbody.innerHTML = '';
    
    cards.forEach(card => {
        const name = card.querySelector('h4').textContent;
        const dosage = card.querySelector('p:nth-child(2)').textContent.replace('Dosage: ', '');
        const quantity = card.querySelector('p:nth-child(3)').textContent.replace('Quantity Remaining: ', '');
        const alertDate = card.querySelector('p:nth-child(4)').textContent.replace('Next Alert Date: ', '');
        const daysUntil = card.querySelector('p:nth-child(5)').textContent.replace('Days Until Refill: ', '');
        
        let status = 'Normal';
        let statusClass = 'status-normal';
        if (card.querySelector('.alert-urgent')) {
            status = 'Urgent';
            statusClass = 'status-urgent';
        } else if (card.querySelector('.alert-warning')) {
            status = 'Low Stock';
            statusClass = 'status-warning';
        } else if (card.querySelector('.alert-info')) {
            status = 'Due Soon';
            statusClass = 'status-info';
        }
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${dosage}</td>
            <td>${quantity}</td>
            <td>${alertDate}</td>
            <td>${daysUntil}</td>
            <td><span class="status-badge ${statusClass}">${status}</span></td>
        `;
        tbody.appendChild(row);
    });
}

function applyMedicationFilters() {
    const typeFilter = document.getElementById('medTypeFilter').value;
    const alertFilter = document.getElementById('medAlertFilter').value;
    const stockFilter = document.getElementById('medStockFilter').value;
    const sortBy = document.getElementById('medSortBy').value;
    
    let cards = Array.from(document.querySelectorAll('.medication-tracking-item'));
    
    // Filter by type
    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        let showType = typeFilter === 'all';
        
        if (typeFilter === 'syrup' && name.includes('syrup')) showType = true;
        if (typeFilter === 'tablet' && name.includes('tablet')) showType = true;
        if (typeFilter === 'capsule' && name.includes('capsule')) showType = true;
        if (typeFilter === 'chew' && name.includes('chew')) showType = true;
        if (typeFilter === 'powder' && name.includes('powder')) showType = true;
        
        card.dataset.showType = showType;
    });
    
    // Filter by alert range
    cards.forEach(card => {
        const daysText = card.querySelector('p:nth-child(5)').textContent;
        const daysMatch = daysText.match(/(\d+) days|OVERDUE/);
        let days = daysMatch ? (daysMatch[1] ? parseInt(daysMatch[1]) : -1) : 999;
        
        let showAlert = alertFilter === 'all';
        if (alertFilter === 'overdue' && days < 0) showAlert = true;
        if (alertFilter === 'week' && days >= 0 && days <= 7) showAlert = true;
        if (alertFilter === 'month' && days >= 0 && days <= 30) showAlert = true;
        if (alertFilter === 'future' && days > 30) showAlert = true;
        
        card.dataset.showAlert = showAlert;
    });
    
    // Filter by stock status
    cards.forEach(card => {
        const quantityText = card.querySelector('p:nth-child(3)').textContent;
        const quantityMatch = quantityText.match(/(\d+)/);
        const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 0;
        
        let showStock = stockFilter === 'all';
        if (stockFilter === 'critical' && quantity <= 3) showStock = true;
        if (stockFilter === 'low' && quantity <= 5) showStock = true;
        if (stockFilter === 'medium' && quantity > 5 && quantity <= 15) showStock = true;
        if (stockFilter === 'good' && quantity > 15) showStock = true;
        
        card.dataset.showStock = showStock;
    });
    
    // Apply all filters
    cards.forEach(card => {
        const show = card.dataset.showType === 'true' && 
                    card.dataset.showAlert === 'true' && 
                    card.dataset.showStock === 'true';
        card.style.display = show ? 'block' : 'none';
    });
    
    // Sort medications
    const visibleCards = cards.filter(card => card.style.display !== 'none');
    const container = document.getElementById('medicationTrackingList');
    
    visibleCards.sort((a, b) => {
        if (sortBy === 'name') {
            return a.querySelector('h4').textContent.localeCompare(b.querySelector('h4').textContent);
        } else if (sortBy === 'date') {
            const dateA = new Date(a.querySelector('p:nth-child(4)').textContent.split(': ')[1]);
            const dateB = new Date(b.querySelector('p:nth-child(4)').textContent.split(': ')[1]);
            return dateA - dateB;
        } else if (sortBy === 'quantity') {
            const qtyA = parseInt(a.querySelector('p:nth-child(3)').textContent.match(/(\d+)/)[1]);
            const qtyB = parseInt(b.querySelector('p:nth-child(3)').textContent.match(/(\d+)/)[1]);
            return qtyA - qtyB;
        } else if (sortBy === 'status') {
            const statusA = a.querySelector('.alert-urgent') ? 0 : a.querySelector('.alert-warning') ? 1 : a.querySelector('.alert-info') ? 2 : 3;
            const statusB = b.querySelector('.alert-urgent') ? 0 : b.querySelector('.alert-warning') ? 1 : b.querySelector('.alert-info') ? 2 : 3;
            return statusA - statusB;
        }
        return 0;
    });
    
    visibleCards.forEach(card => container.appendChild(card));
    
    // Update table if in table view
    if (document.getElementById('medViewType').value === 'table') {
        updateMedicationTable();
    }
}

function toggleMedicationForm() {
    const formContainer = document.getElementById('medicationFormContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}

// Growth Tracking View Functions
function changeGrowthView() {
    const viewType = document.getElementById('growthViewType').value;
    const chart = document.getElementById('trackingChart');
    const table = document.getElementById('trackingTable');
    const list = document.getElementById('trackingList');
    
    // Hide all views
    chart.style.display = 'none';
    table.style.display = 'none';
    list.style.display = 'none';
    
    if (viewType === 'table') {
        table.style.display = 'block';
        updateGrowthTable();
    } else if (viewType === 'comparison') {
        list.style.display = 'grid';
    } else {
        chart.style.display = 'block';
    }
}

function updateGrowthTable() {
    const tbody = document.getElementById('trackingTableBody');
    const items = document.querySelectorAll('.tracking-item');
    tbody.innerHTML = '';
    
    items.forEach(item => {
        const paragraphs = item.querySelectorAll('p');
        const date = paragraphs[0].textContent.replace('Date: ', '');
        const age = paragraphs[1]?.textContent.replace('Age: ', '') || 'N/A';
        const height = paragraphs[2]?.textContent.replace('Height: ', '') || paragraphs[1]?.textContent.replace('Height: ', '');
        const weight = paragraphs[3]?.textContent.replace('Weight: ', '') || paragraphs[2]?.textContent.replace('Weight: ', '');
        const notes = paragraphs[4]?.textContent.replace('Notes: ', '') || 'N/A';
        
        const dateParts = date.split(' ');
        const month = dateParts[0] || '';
        const year = dateParts[1] || '';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${year}</td>
            <td>${month}</td>
            <td>${age}</td>
            <td>${height}</td>
            <td>${weight}</td>
            <td>${notes}</td>
        `;
        tbody.appendChild(row);
    });
}

function applyGrowthFilters() {
    const yearFilter = document.getElementById('growthYearFilter').value;
    const unitsFilter = document.getElementById('growthUnitsFilter').value;
    const items = document.querySelectorAll('.tracking-item');
    
    items.forEach(item => {
        const dateText = item.querySelector('p').textContent;
        const year = dateText.split(' ')[2]; // Extract year from "Date: Month Year"
        
        // Filter by year
        const showYear = yearFilter === 'all' || year === yearFilter;
        item.style.display = showYear ? 'block' : 'none';
        
        // Convert units if needed
        if (showYear && unitsFilter === 'imperial') {
            const heightP = item.querySelector('p:nth-child(3)') || item.querySelector('p:nth-child(2)');
            const weightP = item.querySelector('p:nth-child(4)') || item.querySelector('p:nth-child(3)');
            
            if (heightP && heightP.textContent.includes('cm')) {
                const heightCm = parseFloat(heightP.textContent.match(/[\d.]+/)[0]);
                const heightIn = (heightCm / 2.54).toFixed(1);
                heightP.innerHTML = heightP.innerHTML.replace(/[\d.]+ cm/, heightIn + ' in');
            }
            
            if (weightP && weightP.textContent.includes('kg')) {
                const weightKg = parseFloat(weightP.textContent.match(/[\d.]+/)[0]);
                const weightLbs = (weightKg * 2.205).toFixed(1);
                weightP.innerHTML = weightP.innerHTML.replace(/[\d.]+ kg/, weightLbs + ' lbs');
            }
        } else if (showYear && unitsFilter === 'metric') {
            // Convert back to metric if needed
            const heightP = item.querySelector('p:nth-child(3)') || item.querySelector('p:nth-child(2)');
            const weightP = item.querySelector('p:nth-child(4)') || item.querySelector('p:nth-child(3)');
            
            if (heightP && heightP.textContent.includes('in')) {
                const heightIn = parseFloat(heightP.textContent.match(/[\d.]+/)[0]);
                const heightCm = (heightIn * 2.54).toFixed(0);
                heightP.innerHTML = heightP.innerHTML.replace(/[\d.]+ in/, heightCm + ' cm');
            }
            
            if (weightP && weightP.textContent.includes('lbs')) {
                const weightLbs = parseFloat(weightP.textContent.match(/[\d.]+/)[0]);
                const weightKg = (weightLbs / 2.205).toFixed(1);
                weightP.innerHTML = weightP.innerHTML.replace(/[\d.]+ lbs/, weightKg + ' kg');
            }
        }
    });
    
    // Update table if in table view
    if (document.getElementById('growthViewType').value === 'table') {
        updateGrowthTable();
    }
    
    // Update chart if in chart view
    if (document.getElementById('growthViewType').value === 'chart') {
        // Chart will automatically reflect filtered items
    }
}

function toggleGrowthForm() {
    const formContainer = document.getElementById('trackingFormContainer');
    formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
}


// Clear all medication filters
function clearMedicationFilters() {
    document.getElementById('medPetFilter').value = 'cherry';
    document.getElementById('medTypeFilter').value = 'all';
    document.getElementById('medAlertFilter').value = 'all';
    document.getElementById('medStockFilter').value = 'all';
    document.getElementById('medSortBy').value = 'name';
    document.getElementById('medViewType').value = 'cards';
    
    // Show all medications
    const cards = document.querySelectorAll('.medication-tracking-item');
    cards.forEach(card => {
        card.style.display = 'block';
    });
    
    // Reset view to cards
    document.getElementById('medicationTrackingList').style.display = 'grid';
    document.getElementById('medicationTable').style.display = 'none';
}

// Clear all growth filters
function clearGrowthFilters() {
    document.getElementById('growthPetFilter').value = 'cherry';
    document.getElementById('growthYearFilter').value = 'all';
    document.getElementById('growthUnitsFilter').value = 'metric';
    document.getElementById('growthViewType').value = 'chart';
    
    // Show all items
    const items = document.querySelectorAll('.tracking-item');
    items.forEach(item => {
        item.style.display = 'block';
    });
    
    // Reset view to chart
    document.getElementById('trackingChart').style.display = 'block';
    document.getElementById('trackingTable').style.display = 'none';
    document.getElementById('trackingList').style.display = 'none';
    
    // Reset units to metric
    applyGrowthFilters();
}


// Enhanced Album Filter Functions
function applyAlbumFilters() {
    const yearFilter = document.getElementById('albumYearFilter').value;
    const categoryFilter = document.getElementById('albumCategoryFilter').value;
    const petFilter = document.getElementById('albumPetFilter').value;
    const locationFilter = document.getElementById('albumLocationFilter').value;
    const sortFilter = document.getElementById('albumSortFilter').value;
    
    // Hide placeholder and show album accordion
    const placeholder = document.getElementById('albumPlaceholder');
    const accordion = document.querySelector('.album-accordion');
    if (placeholder) placeholder.style.display = 'none';
    if (accordion) accordion.style.display = 'block';
    
    const years = ['2025', '2024', '2023', '2022', '2021'];
    const yearSections = [];
    
    // Collect all year sections
    years.forEach(year => {
        const section = document.querySelector(`#album${year}`)?.parentElement;
        if (section) {
            yearSections.push({ year, section });
        }
    });
    
    // Filter by year
    yearSections.forEach(({ year, section }) => {
        if (yearFilter === 'all' || year === yearFilter) {
            section.style.display = 'block';
            document.getElementById(`album${year}`).style.display = 'block';
            
            // Auto-expand the year section
            const content = document.getElementById(`album${year}`);
            content.classList.add('active');
        } else {
            section.style.display = 'none';
            document.getElementById(`album${year}`).style.display = 'none';
        }
    });
    
    // Filter photos within visible years
    yearSections.forEach(({ year, section }) => {
        if (section.style.display !== 'none') {
            const photos = section.querySelectorAll('.photo-item');
            let hasVisiblePhotos = false;
            
            photos.forEach(photo => {
                let show = true;
                
                // Category filter
                if (categoryFilter !== 'all') {
                    const caption = photo.querySelector('.photo-caption')?.textContent.toLowerCase() || '';
                    show = show && caption.includes(categoryFilter);
                }
                
                // Pet filter
                if (petFilter !== 'all' && petFilter !== 'cherry') {
                    show = false;
                }
                
                // Location filter
                if (locationFilter !== 'all') {
                    const location = photo.dataset.location || 'others';
                    show = show && location === locationFilter;
                }
                
                photo.style.display = show ? 'block' : 'none';
                if (show) hasVisiblePhotos = true;
            });
            
            // Auto-expand if filters are applied and there are visible photos
            if (hasVisiblePhotos && (categoryFilter !== 'all' || locationFilter !== 'all')) {
                const content = document.getElementById(`album${year}`);
                const button = content.previousElementSibling;
                content.classList.add('active');
            }
        }
    });
    
    // Sort years
    if (accordion && yearSections.length > 0) {
        if (sortFilter === 'oldest') {
            yearSections.reverse().forEach(({ section }) => {
                accordion.appendChild(section);
            });
        } else {
            yearSections.forEach(({ section }) => {
                accordion.appendChild(section);
            });
        }
    }
}

function clearAlbumFilters() {
    // Reset all filter dropdowns
    document.getElementById('albumYearFilter').value = 'all';
    document.getElementById('albumCategoryFilter').value = 'all';
    document.getElementById('albumPetFilter').value = 'cherry';
    document.getElementById('albumLocationFilter').value = 'all';
    document.getElementById('albumSortFilter').value = 'newest';
    
    // Show placeholder and hide album accordion
    const placeholder = document.getElementById('albumPlaceholder');
    const accordion = document.querySelector('.album-accordion');
    if (placeholder) placeholder.style.display = 'block';
    if (accordion) accordion.style.display = 'none';
    
    // Reset all year sections
    const years = ['2025', '2024', '2023', '2022', '2021'];
    years.forEach(year => {
        const content = document.getElementById(`album${year}`);
        if (content) {
            const section = content.parentElement;
            if (section) section.style.display = 'block';
            content.style.display = 'block';
            content.classList.remove('active');
            
            const button = content.previousElementSibling;
            if (button) {
                const arrow = button.querySelector('.arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
            
            // Show all photos
            const photos = content.querySelectorAll('.photo-item');
            photos.forEach(photo => {
                photo.style.display = 'block';
            });
        }
    });
}

function collapseAllAlbum() {
    const years = ['2025', '2024', '2023', '2022', '2021'];
    years.forEach(year => {
        const content = document.getElementById(`album${year}`);
        if (content) {
            content.classList.remove('active');
            const button = content.previousElementSibling;
            if (button) {
                const arrow = button.querySelector('.arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        }
    });
}


// Simple Album Show/Hide Functions
function showAlbumPhotos() {
    const placeholder = document.getElementById('albumPlaceholder');
    const accordion = document.querySelector('.album-accordion');
    
    if (placeholder) placeholder.style.display = 'none';
    if (accordion) accordion.style.display = 'block';
    
    // Expand all year sections
    const years = ['2025', '2024', '2023', '2022', '2021'];
    years.forEach(year => {
        const content = document.getElementById(`album${year}`);
        if (content) {
            content.classList.add('active');
            const section = content.parentElement;
            if (section) section.style.display = 'block';
        }
    });
}

function hideAlbumPhotos() {
    const placeholder = document.getElementById('albumPlaceholder');
    const accordion = document.querySelector('.album-accordion');
    
    if (placeholder) placeholder.style.display = 'block';
    if (accordion) accordion.style.display = 'none';
    
    // Collapse all year sections
    const years = ['2025', '2024', '2023', '2022', '2021'];
    years.forEach(year => {
        const content = document.getElementById(`album${year}`);
        if (content) {
            content.classList.remove('active');
        }
    });
}


// Authentication Functions
function checkAuth() {
    const session = localStorage.getItem('userSession');
    if (!session) {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(session);
}

function initUserSession() {
    const session = checkAuth();
    if (session) {
        // Update user bar
        document.getElementById('userName').textContent = session.name;
        const roleElement = document.getElementById('userRole');
        roleElement.textContent = session.role.charAt(0).toUpperCase() + session.role.slice(1);
        
        // Add role class to body for CSS-based visibility
        document.body.classList.add(`role-${session.role}`);
        
        // Add role-specific styling
        if (session.role === 'admin') {
            roleElement.classList.add('admin');
        } else if (session.role === 'vet') {
            roleElement.classList.add('vet');
        }
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userSession');
        window.location.href = 'login.html';
    }
}

// Get current user role
function getCurrentUserRole() {
    const session = localStorage.getItem('userSession');
    if (session) {
        return JSON.parse(session).role;
    }
    return null;
}

// Check if user has permission
function hasPermission(requiredRole) {
    const userRole = getCurrentUserRole();
    if (!userRole) return false;
    
    const roleHierarchy = {
        'admin': 3,
        'vet': 2,
        'owner': 1
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', () => {
    // Skip auth check for demo - comment out the next line to enable auth
    // initUserSession();
    
    // For demo, show default user
    const userBar = document.getElementById('userBar');
    if (userBar) {
        const session = localStorage.getItem('userSession');
        if (session) {
            initUserSession();
        } else {
            document.getElementById('userName').textContent = 'Guest';
            document.getElementById('userRole').textContent = 'Demo Mode';
        }
    }
});
