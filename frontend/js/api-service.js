// API Service for Backend Communication
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}

// Pet Info API
const PetAPI = {
    getAll: () => apiCall('/pets'),
    getById: (id) => apiCall(`/pets/${id}`),
    create: (petData) => apiCall('/pets', 'POST', petData),
    update: (id, petData) => apiCall(`/pets/${id}`, 'PUT', petData),
    delete: (id) => apiCall(`/pets/${id}`, 'DELETE')
};

// Medical History API
const MedicalHistoryAPI = {
    getAll: () => apiCall('/medical-history'),
    getByPetId: (petId) => apiCall(`/medical-history/pet/${petId}`),
    getById: (id) => apiCall(`/medical-history/${id}`),
    create: (data) => apiCall('/medical-history', 'POST', data),
    update: (id, data) => apiCall(`/medical-history/${id}`, 'PUT', data),
    delete: (id) => apiCall(`/medical-history/${id}`, 'DELETE')
};

// Medication API
const MedicationAPI = {
    getAll: () => apiCall('/medications'),
    getByPetId: (petId) => apiCall(`/medications/pet/${petId}`),
    getActiveByPetId: (petId) => apiCall(`/medications/pet/${petId}/active`),
    getById: (id) => apiCall(`/medications/${id}`),
    create: (data) => apiCall('/medications', 'POST', data),
    update: (id, data) => apiCall(`/medications/${id}`, 'PUT', data),
    delete: (id) => apiCall(`/medications/${id}`, 'DELETE')
};

// Vaccination API
const VaccinationAPI = {
    getAll: () => apiCall('/vaccinations'),
    getByPetId: (petId) => apiCall(`/vaccinations/pet/${petId}`),
    getById: (id) => apiCall(`/vaccinations/${id}`),
    create: (data) => apiCall('/vaccinations', 'POST', data),
    update: (id, data) => apiCall(`/vaccinations/${id}`, 'PUT', data),
    delete: (id) => apiCall(`/vaccinations/${id}`, 'DELETE')
};

// Growth Tracking API
const GrowthTrackingAPI = {
    getAll: () => apiCall('/growth-tracking'),
    getByPetId: (petId) => apiCall(`/growth-tracking/pet/${petId}`),
    getById: (id) => apiCall(`/growth-tracking/${id}`),
    create: (data) => apiCall('/growth-tracking', 'POST', data),
    update: (id, data) => apiCall(`/growth-tracking/${id}`, 'PUT', data),
    delete: (id) => apiCall(`/growth-tracking/${id}`, 'DELETE')
};

// Diet Plan API
const DietPlanAPI = {
    getAll: () => apiCall('/diet-plan'),
    getByPetId: (petId) => apiCall(`/diet-plan/pet/${petId}`),
    getById: (id) => apiCall(`/diet-plan/${id}`),
    create: (data) => apiCall('/diet-plan', 'POST', data),
    update: (id, data) => apiCall(`/diet-plan/${id}`, 'PUT', data),
    delete: (id) => apiCall(`/diet-plan/${id}`, 'DELETE')
};

// Album API
const AlbumAPI = {
    getAll: () => apiCall('/album'),
    getByPetId: (petId) => apiCall(`/album/pet/${petId}`),
    getByPetIdAndYear: (petId, year) => apiCall(`/album/pet/${petId}/year/${year}`),
    getById: (id) => apiCall(`/album/${id}`),
    create: (data) => apiCall('/album', 'POST', data),
    update: (id, data) => apiCall(`/album/${id}`, 'PUT', data),
    delete: (id) => apiCall(`/album/${id}`, 'DELETE')
};

// Export APIs
window.PetAPI = PetAPI;
window.MedicalHistoryAPI = MedicalHistoryAPI;
window.MedicationAPI = MedicationAPI;
window.VaccinationAPI = VaccinationAPI;
window.GrowthTrackingAPI = GrowthTrackingAPI;
window.DietPlanAPI = DietPlanAPI;
window.AlbumAPI = AlbumAPI;
