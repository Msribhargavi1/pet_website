// ========== APP NAVIGATION ==========
let currentScreen = 'dashboard';

function navigateTo(screen, param = null) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    // Show target screen
    const targetScreen = document.getElementById(`screen-${screen}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screen;
    }
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.screen === screen);
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Handle specific screen params
    if (screen === 'dog-profile' && param) {
        loadDogProfile(param);
    }
}

// ========== PROFILE TABS ==========
function switchProfileTab(tab) {
    document.querySelectorAll('.profile-tabs .tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(tab));
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const tabContent = document.getElementById(`profile-tab-${tab}`);
    if (tabContent) tabContent.classList.add('active');
}

// ========== VACCINATION FILTERS ==========
function filterVaccinations(filter) {
    const vaccScreen = document.getElementById('screen-vaccinations');
    vaccScreen.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase() === filter);
    });
    
    document.querySelectorAll('.vaccination-item').forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else {
            item.style.display = item.classList.contains(filter) ? 'flex' : 'none';
        }
    });
}

// ========== HOSPITAL TABLE FUNCTIONS ==========
function searchHospitalTable() {
    const searchTerm = document.getElementById('hospitalSearch').value.toLowerCase();
    
    // Search hospitals table
    const hospitalRows = document.querySelectorAll('#hospitalsTable tbody tr');
    hospitalRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
    
    // Search doctors table
    const doctorRows = document.querySelectorAll('#doctorsTable tbody tr');
    doctorRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function filterHospitalTable() {
    const filter = document.getElementById('hospitalFilter').value;
    
    // Filter hospitals table
    const hospitalRows = document.querySelectorAll('#hospitalsTable tbody tr');
    hospitalRows.forEach(row => {
        const location = row.dataset.location || '';
        row.style.display = (filter === 'all' || location === filter) ? '' : 'none';
    });
    
    // Filter doctors table
    const doctorRows = document.querySelectorAll('#doctorsTable tbody tr');
    doctorRows.forEach(row => {
        const location = row.dataset.location || '';
        row.style.display = (filter === 'all' || location === filter) ? '' : 'none';
    });
}

// ========== MEDICAL HISTORY FILTERS ==========
function filterMedicalRecords(filter) {
    const medScreen = document.getElementById('screen-medical');
    medScreen.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase() === filter);
    });
    
    document.querySelectorAll('.medical-record').forEach(record => {
        if (filter === 'all') {
            record.style.display = 'flex';
        } else {
            const recordType = record.querySelector('.record-type');
            if (recordType) {
                const type = recordType.textContent.toLowerCase();
                record.style.display = type === filter ? 'flex' : 'none';
            }
        }
    });
}

// ========== PHOTO VIEWER ==========
function openPhotoViewer(element) {
    const img = element.tagName === 'IMG' ? element : element.querySelector('img');
    if (img) {
        document.getElementById('modalPhoto').src = img.src;
        document.getElementById('photoViewerModal').classList.add('active');
    }
}

function closePhotoViewer() {
    document.getElementById('photoViewerModal').classList.remove('active');
}

// ========== MEDICAL DETAIL MODAL ==========
const medicalRecords = {
    1: { title: 'Immunity Booster', date: 'November 15, 2025', doctor: 'Dr. Hussain', hospital: 'Government Hospital, Tadipatri', type: 'Vaccination', notes: 'Annual immunity booster administered. Dog responded well.' },
    2: { title: 'Tick Treatment', date: 'October 20, 2025', doctor: 'Dr. Hussain', hospital: 'Government Hospital, Tadipatri', type: 'Treatment', notes: 'Tick infestation treated with topical medication.' },
    3: { title: 'Rabies Vaccination', date: 'April 10, 2025', doctor: 'Dr. Hussain', hospital: 'Government Hospital, Tadipatri', type: 'Vaccination', notes: 'Annual rabies vaccination. Next due: April 2026.' },
    4: { title: 'Portosystemic Shunt (PSS)', date: 'March 5, 2025', doctor: 'Dr. Hussain', hospital: 'Government Hospital, Tadipatri', type: 'Diagnosis', notes: 'Liver condition confirmed. Requires strict diet management. Avoid red meat, organ meat, and high-protein foods. Regular monitoring recommended.', medicines: ['Lactulose Syrup', 'Hepatic Support Tablets'] },
    5: { title: 'Portosystemic Shunt (PSS)', date: 'October 12, 2023', doctor: 'Dr. Srikanth', hospital: 'Government Hospital, Pullivendala', type: 'Diagnosis', notes: 'Initial PSS diagnosis. Recommended dietary changes and follow-up.' },
    6: { title: 'Shedding Treatment', date: 'May 18, 2022', doctor: 'Dr. Hussain', hospital: 'Government Hospital, Tadipatri', type: 'Treatment', notes: 'Excessive shedding treated with supplements and medicated shampoo.' },
    7: { title: 'First Vaccinations', date: 'January 15, 2021', doctor: 'Dr. Ratnadeep', hospital: 'Govardhana Veterinary Medicals, Anantapur', type: 'Vaccination', notes: 'Puppy vaccination series started. DHPP and deworming.' }
};

function showMedicalDetail(id) {
    const record = medicalRecords[id];
    if (!record) return;
    
    let html = `
        <h2>${record.title}</h2>
        <div class="detail-section">
            <p><strong>📅 Date:</strong> ${record.date}</p>
            <p><strong>👨‍⚕️ Doctor:</strong> ${record.doctor}</p>
            <p><strong>🏥 Hospital:</strong> ${record.hospital}</p>
            <p><strong>📋 Type:</strong> <span class="record-type ${record.type.toLowerCase()}">${record.type}</span></p>
        </div>
        <div class="detail-section">
            <h3>Notes</h3>
            <p>${record.notes}</p>
        </div>
    `;
    
    if (record.medicines) {
        html += `
            <div class="detail-section">
                <h3>💊 Medicines Prescribed</h3>
                <ul>${record.medicines.map(m => `<li>${m}</li>`).join('')}</ul>
            </div>
        `;
    }
    
    document.getElementById('medicalDetailContent').innerHTML = html;
    document.getElementById('medicalDetailModal').classList.add('active');
}

function closeMedicalDetail() {
    document.getElementById('medicalDetailModal').classList.remove('active');
}

// ========== AI CHAT ==========
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    const chatMessages = document.getElementById('chatMessages');
    
    // Add user message
    chatMessages.innerHTML += `
        <div class="chat-message user">
            <div class="message-avatar">👤</div>
            <div class="message-content"><p>${message}</p></div>
        </div>
    `;
    
    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    chatMessages.innerHTML += `
        <div class="chat-message bot typing">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        </div>
    `;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Get AI response
    setTimeout(() => {
        const typingMsg = chatMessages.querySelector('.typing');
        if (typingMsg) typingMsg.remove();
        
        const response = getAIResponse(message);
        chatMessages.innerHTML += `
            <div class="chat-message bot">
                <div class="message-avatar">🤖</div>
                <div class="message-content"><p>${response}</p></div>
            </div>
        `;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

function askQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

// ========== AI RESPONSE LOGIC ==========
function getAIResponse(message) {
    const msg = message.toLowerCase();
    
    // Diet related
    if (msg.includes('diet') || msg.includes('eat') || msg.includes('food') || msg.includes('feed')) {
        return "🍖 For Cherry's PSS condition, today's recommended meals:<br><br><b>Breakfast:</b> Chicken ½ cup + Rice ½ cup + Carrot 2 tbsp + 1 tsp coconut oil<br><b>Lunch:</b> Sweet potato ½ cup + Curd 2 tbsp<br><b>Dinner:</b> Fish ½ cup + Pumpkin 2 tbsp + pinch of turmeric<br><br>⚠️ Remember: Avoid red meat, organ meat, biscuits, and fried foods!";
    }
    
    // Vaccination related
    if (msg.includes('vaccin') || msg.includes('shot') || msg.includes('due')) {
        return "💉 Cherry's vaccination schedule:<br><br>✅ <b>Completed:</b><br>• Rabies - April 2025<br>• Immunity Booster - November 2025<br>• Deworming - November 2025<br><br>📅 <b>Upcoming:</b><br>• Rabies Booster - April 15, 2026<br>• DHPP - June 20, 2026";
    }
    
    // PSS related
    if (msg.includes('pss') || msg.includes('shunt') || msg.includes('liver')) {
        return "🩺 <b>About Cherry's PSS (Portosystemic Shunt):</b><br><br>PSS is a liver condition where blood bypasses the liver. Cherry was diagnosed in 2023.<br><br><b>Management:</b><br>• Low-protein diet (chicken, fish, egg whites)<br>• Avoid red meat & organ meat<br>• Daily coconut oil & turmeric<br>• Regular vet checkups<br><br>Cherry is doing well with proper diet management! 💪";
    }
    
    // Symptoms
    if (msg.includes('symptom') || msg.includes('watch') || msg.includes('sign') || msg.includes('sick')) {
        return "⚠️ <b>Symptoms to watch for in Cherry:</b><br><br><b>PSS Warning Signs:</b><br>• Disorientation or confusion<br>• Excessive drooling<br>• Seizures<br>• Loss of appetite<br><br><b>General Health:</b><br>• Vomiting or diarrhea<br>• Lethargy<br>• Difficulty breathing<br><br>If you notice any of these, contact Dr. Hussain immediately!";
    }
    
    // Weight/growth
    if (msg.includes('weight') || msg.includes('growth') || msg.includes('heavy')) {
        return "⚖️ <b>Cherry's Weight Info:</b><br><br>Current weight: 23 kg<br>Ideal range for Golden Retriever: 25-34 kg<br><br>Cherry is slightly underweight due to PSS diet restrictions. This is normal and managed. Regular monitoring is important!";
    }
    
    // Age
    if (msg.includes('age') || msg.includes('old') || msg.includes('birthday')) {
        return "🎂 Cherry was born in October 2021 in Anantapur. She's currently 4 years and 2 months old! Golden Retrievers typically live 10-12 years, so Cherry has many happy years ahead! 🐕";
    }
    
    // Doctor/hospital
    if (msg.includes('doctor') || msg.includes('vet') || msg.includes('hospital')) {
        return "🏥 <b>Cherry's Healthcare Providers:</b><br><br><b>Primary Vet:</b><br>Dr. Hussain<br>Government Hospital, Tadipatri<br><br><b>Previous Vets:</b><br>• Dr. Srikanth - Pullivendala<br>• Dr. Ratnadeep - Govardhana Veterinary, Anantapur<br><br>📞 Contact: 8978833504";
    }
    
    // Default response
    return "I'm here to help with Cherry's health! You can ask me about:<br>• 🍖 Diet recommendations<br>• 💉 Vaccination schedule<br>• 🩺 PSS management<br>• ⚠️ Symptoms to watch<br>• ⚖️ Weight & growth<br>• 🏥 Vet information";
}

// ========== MODAL FUNCTIONS ==========
function showAddVaccinationModal() {
    alert('Add Vaccination feature coming soon!');
}

function showAddMedicalRecordModal() {
    alert('Add Medical Record feature coming soon!');
}

function showAddDogModal() {
    alert('Add Dog feature coming soon!');
}

function uploadPhoto() {
    alert('Photo upload feature coming soon!');
}

function showEventDetails(id) {
    showMedicalDetail(id);
}

function loadDogProfile(dogId) {
    // Load specific dog profile data
    console.log('Loading profile for:', dogId);
}

function editProfile() {
    alert('Edit Profile feature coming soon!');
}

function addFamilyMember() {
    alert('Add Family Member feature coming soon!');
}

// ========== AUTH & USER MANAGEMENT ==========
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    return user;
}

function loadUserInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        document.getElementById('userName').textContent = user.name || 'Guest';
        if (user.role === 'admin') {
            document.body.classList.add('role-admin');
        }
        // Update settings
        const settingsName = document.getElementById('settingsUserName');
        const settingsEmail = document.getElementById('settingsUserEmail');
        if (settingsName) settingsName.textContent = user.name;
        if (settingsEmail) settingsEmail.textContent = user.email;
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const user = checkAuth();
    if (!user) return;
    
    // Load user info
    loadUserInfo();
    
    // Initialize dashboard
    navigateTo('dashboard');
    
    // Close modals on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePhotoViewer();
            closeMedicalDetail();
        }
    });
    
    // Close photo viewer on click outside
    document.getElementById('photoViewerModal')?.addEventListener('click', function(e) {
        if (e.target === this) closePhotoViewer();
    });
});

// ========== UTILITY FUNCTIONS ==========
function calculateDogAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    return `${years} years, ${months} months`;
}

// Update dog age on page
function updateDogAge() {
    const ageElements = document.querySelectorAll('.dog-age');
    ageElements.forEach(el => {
        el.textContent = calculateDogAge('2021-10-18');
    });
}

// Call on load
updateDogAge();
