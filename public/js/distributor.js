// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
const db = getDatabase(app);

// Function to fetch and display distributor data
function fetchDistributors() {
    const distributorRef = ref(db, 'distributors');
    onValue(distributorRef, (snapshot) => {
        const data = snapshot.val();
        const distributorCardsContainer = document.getElementById('distributorCards');
        distributorCardsContainer.innerHTML = ''; // Clear existing cards

        if (data) {
            for (const key in data) {
                const distributor = data[key];
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <h3>${distributor.distributorName}</h3>
                    <p><strong>Company:</strong> ${distributor.companyName}</p>
                    <p><strong>Experience:</strong> ${distributor.experience} years</p>
                `;
                distributorCardsContainer.appendChild(card);
            }
        }
    });
}

// Call the function to fetch and display distributors initially
fetchDistributors();

// Handle form submission
document.getElementById('distributorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const distributorName = document.getElementById('distributorName').value;
    const companyName = document.getElementById('companyName').value;
    const experience = document.getElementById('experience').value;

    // Debug logs to check values
    console.log('Distributor Name:', distributorName);
    console.log('Company Name:', companyName);
    console.log('Experience:', experience);

    // Save the data to Firebase Realtime Database
    const newDistributorRef = ref(db, 'distributors');
    const newDistributor = push(newDistributorRef);

    set(newDistributor, {
        distributorName: distributorName,
        companyName: companyName,
        experience: experience
    }).then(() => {
        alert('Distributor Information Saved!');
        document.getElementById('distributorForm').reset();
        fetchDistributors(); // Refresh the displayed cards
        window.location.href = 'admin.html'; // Redirect to admin.html
    }).catch((error) => {
        alert('Error saving data: ' + error.message);
    });
});