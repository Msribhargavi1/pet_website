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
});
