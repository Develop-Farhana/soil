import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase Configuration
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
const db = getDatabase(app);

// Fetch and display the total distributor and soil count
window.onload = function() {
    // Reference to distributors and soil entries in Firebase
    const distributorRef = ref(db, 'distributors');
    const soilRef = ref(db, 'soil');

    // Get total number of distributors
    get(distributorRef).then(snapshot => {
        const distributorCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        document.getElementById('distributor-count').textContent = distributorCount;
    }).catch(error => {
        console.error("Error fetching distributors:", error);
    });

    // Get total number of soil entries
    get(soilRef).then(snapshot => {
        const soilCount = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        document.getElementById('soil-count').textContent = soilCount;
    }).catch(error => {
        console.error("Error fetching soil details:", error);
    });
};