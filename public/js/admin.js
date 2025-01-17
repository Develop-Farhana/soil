// Elements
const loginSection = document.getElementById('login-section');
const adminDashboard = document.getElementById('admin-dashboard');
const logoutBtn = document.getElementById('logout-btn');

// Check if user is logged in
onAuthStateChanged(auth, user => {
    if (user) {
        // User is logged in, show the admin dashboard
        loginSection.style.display = 'none';
        adminDashboard.style.display = 'block';
    } else {
        // User is not logged in, show the login section and redirect to login page
        loginSection.style.display = 'block';
        adminDashboard.style.display = 'none';
        window.location.href = "login.html"; // Redirect to login page
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // Logged out successfully, redirect to login page
            window.location.href = "admin-login.html"; // Redirect to login page
        })
        .catch((error) => {
            console.error('Logout error:', error.message);
        });
});