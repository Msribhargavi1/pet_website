// ========== ADMIN PANEL NAVIGATION ==========
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update menu active state
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.menu-item')?.classList.add('active');
}

// ========== USER MANAGEMENT ==========
function showAddUserModal() {
    alert('Add User modal coming soon!');
}

function resetPassword(userId) {
    if (confirm(`Reset password for user ID ${userId}?`)) {
        alert('Password reset email sent!');
    }
}

function toggleUserStatus(userId) {
    if (confirm(`Toggle status for user ID ${userId}?`)) {
        alert('User status updated!');
        location.reload();
    }
}

// ========== DOG MANAGEMENT ==========
function viewDogDetails(dogId) {
    alert(`Viewing details for dog ID ${dogId}`);
}

// ========== MASTER DATA ==========
function showAddVaccineModal() {
    alert('Add Vaccine Type modal coming soon!');
}

function showAddBreedModal() {
    alert('Add Breed modal coming soon!');
}

function showAddDiseaseModal() {
    alert('Add Disease modal coming soon!');
}

// ========== AUTH CHECK ==========
function checkAdminAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user) {
        window.location.href = 'login.html';
        return null;
    }
    if (user.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

function loadAdminInfo() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (user) {
        document.getElementById('userName').textContent = user.name || 'Admin';
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// ========== SEARCH FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    // Check admin auth
    const user = checkAdminAuth();
    if (!user) return;
    
    loadAdminInfo();
    
    // User search
    const userSearch = document.getElementById('userSearch');
    if (userSearch) {
        userSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            document.querySelectorAll('#usersTableBody tr').forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }
    
    // Dog search
    const dogSearch = document.getElementById('dogSearch');
    if (dogSearch) {
        dogSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            document.querySelectorAll('#dogsTableBody tr').forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }
});
