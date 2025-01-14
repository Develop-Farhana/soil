// Import the necessary Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';

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

// Function to fetch distributor data and display as cards
function loadDistributorData() {
    const distributorRef = ref(db, 'distributors');
    get(distributorRef).then((snapshot) => {
        const data = snapshot.val();
        const distributorCards = document.getElementById('distributorCards');

        // Clear existing cards if any
        distributorCards.innerHTML = '';

        // Iterate over data and create cards
        for (let key in data) {
            const distributor = data[key];
            const card = document.createElement('div');
            card.classList.add('card');

            // Insert distributor data into the card
            card.innerHTML = `
                <h3>${distributor.distributorName}</h3>
                <p class="company-name">${distributor.companyName}</p>
                <p class="experience">Experience: ${distributor.experience} years</p>
            `;

            distributorCards.appendChild(card);
        }
    }).catch((error) => {
        console.error('Error fetching data: ', error);
    });
}

// Load distributor data when the page loads
window.onload = loadDistributorData;