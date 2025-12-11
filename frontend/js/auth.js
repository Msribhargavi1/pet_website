// Demo Users Database
const demoUsers = [
    { id: 1, name: 'Admin User', email: 'admin@kiropets.com', phone: '9999999999', password: 'admin123', role: 'admin' },
    { id: 2, name: 'Pet Owner', email: 'owner@kiropets.com', phone: '8888888888', password: 'owner123', role: 'owner' },
    { id: 3, name: 'Dr. Veterinarian', email: 'vet@kiropets.com', phone: '7777777777', password: 'vet123', role: 'vet' },
    { id: 4, name: 'Srihari', email: 'srihari12@gmail.com', phone: '9876543210', password: 'srihari123', role: 'owner' },
    { id: 5, name: 'Srinivasulu', email: 'vasulu.cnu@gmail.com', phone: '9123456789', password: 'vasulu123', role: 'admin' },
    { id: 6, name: 'Sri Bhargavi', email: 'sribhargavi427@gmail.com', phone: '8978833504', password: 'admin123', role: 'admin' }
];

// Form Navigation
function showLogin() {
    hideAllForms();
    document.getElementById('loginForm').classList.add('active');
}

function showSignup() {
    hideAllForms();
    document.getElementById('signupForm').classList.add('active');
}

function showOTPLogin() {
    hideAllForms();
    document.getElementById('otpLoginForm').classList.add('active');
}

function showForgotPassword() {
    hideAllForms();
    document.getElementById('forgotPasswordForm').classList.add('active');
}

function hideAllForms() {
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
}

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const emailOrPhone = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', emailOrPhone, password);
    console.log('Available users:', demoUsers.map(u => u.email));
    
    // Find user
    const user = demoUsers.find(u => 
        (u.email.toLowerCase() === emailOrPhone.toLowerCase() || u.phone === emailOrPhone) && u.password === password
    );
    
    console.log('Found user:', user);
    
    if (user) {
        // Store user session
        const session = {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(session));
        
        showToast('Login successful! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showToast('Invalid email/phone or password', 'error');
    }
}

// Handle OTP Login
let generatedOTP = '';

function sendOTP() {
    const phone = document.getElementById('otpPhone').value;
    
    if (!phone || phone.length < 10) {
        showToast('Please enter a valid phone number', 'error');
        return;
    }
    
    // Check if phone exists
    const user = demoUsers.find(u => u.phone === phone);
    if (!user) {
        showToast('Phone number not registered', 'error');
        return;
    }
    
    // Generate OTP (demo: always 1234)
    generatedOTP = '1234';
    
    document.getElementById('otpInputSection').style.display = 'block';
    document.getElementById('sendOtpBtn').style.display = 'none';
    document.getElementById('verifyOtpBtn').style.display = 'block';
    
    showToast(`OTP sent! (Demo OTP: ${generatedOTP})`, 'info');
}

function handleOTPLogin(event) {
    event.preventDefault();
    
    const otpInputs = document.querySelectorAll('.otp-input');
    const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');
    const phone = document.getElementById('otpPhone').value;
    
    if (enteredOTP === generatedOTP) {
        const user = demoUsers.find(u => u.phone === phone);
        
        const session = {
            userId: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentUser', JSON.stringify(session));
        
        showToast('OTP verified! Redirecting...', 'success');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showToast('Invalid OTP', 'error');
    }
}

function resendOTP() {
    generatedOTP = '1234';
    showToast(`OTP resent! (Demo OTP: ${generatedOTP})`, 'info');
}

// Move to next OTP input
function moveToNext(current, nextIndex) {
    if (current.value.length === 1) {
        const inputs = document.querySelectorAll('.otp-input');
        if (nextIndex < inputs.length) {
            inputs[nextIndex].focus();
        }
    }
}

// Handle Signup
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const role = document.getElementById('signupRole').value;
    
    // Validation
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Check if email exists
    if (demoUsers.find(u => u.email === email)) {
        showToast('Email already registered', 'error');
        return;
    }
    
    // Add new user (demo only - won't persist)
    const newUser = {
        id: demoUsers.length + 1,
        name,
        email,
        phone,
        password,
        role
    };
    demoUsers.push(newUser);
    
    showToast('Account created successfully! Please login.', 'success');
    
    setTimeout(() => {
        showLogin();
    }, 1500);
}

// Handle Forgot Password
function handleForgotPassword(event) {
    event.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    const user = demoUsers.find(u => u.email === email);
    
    if (user) {
        showToast('Password reset link sent to your email!', 'success');
        setTimeout(() => {
            showLogin();
        }, 2000);
    } else {
        showToast('Email not found', 'error');
    }
}

// Toast Notification
function showToast(message, type = 'info') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Check if already logged in
function checkSession() {
    const session = localStorage.getItem('currentUser');
    if (session) {
        window.location.href = 'index.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});


// Quick login for testing
function quickLogin(role) {
    const users = {
        admin: { userId: 1, name: 'Admin User', email: 'admin@kiropets.com', role: 'admin' },
        owner: { userId: 2, name: 'Pet Owner', email: 'owner@kiropets.com', role: 'owner' }
    };
    
    const user = users[role];
    if (user) {
        user.loginTime = new Date().toISOString();
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    }
}
