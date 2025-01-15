import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBttPB8Fpk9d6i3V_lrZL_4DhXbxGy_Oq4",
    authDomain: "soil-1d203.firebaseapp.com",
    projectId: "soil-1d203",
    storageBucket: "soil-1d203.firebasestorage.app",
    messagingSenderId: "220388350205",
    appId: "1:220388350205:web:181ba7e0fc9e26802ec694"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Correct use of modular SDK

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