// Import Firebase and Firebase Database functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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
const database = getDatabase(app);

// Get reference to the distributor list container
const distributorList = document.getElementById("distributor-list");

// Render distributors list as cards
function renderDistributorList(distributors) {
    distributorList.innerHTML = ''; // Clear the container
    for (let id in distributors) {
        const distributor = distributors[id];

        // Create the card element
        const card = document.createElement("div");
        card.classList.add("card");

        // Ensure safe content rendering by sanitizing the content
        const safeName = distributor.name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeEmail = distributor.email.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const safeProduct = distributor.product.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // Add the distributor details to the card
        card.innerHTML = `
            <h2> Name: ${safeName}</h2>
            <p>Email: ${safeEmail}</p>
            <p class="product-type">Product Type: ${safeProduct}</p>
        `;

        // Append the card to the distributor list container
        distributorList.appendChild(card);
    }
}

// Fetch distributors from Firebase
function fetchDistributors() {
    const distributorsRef = ref(database, 'distributors');
    get(distributorsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const distributors = snapshot.val();
            renderDistributorList(distributors);
        } else {
            distributorList.innerHTML = '<p>No distributors found.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching data from Firebase:", error);
        distributorList.innerHTML = '<p>Failed to load distributors. Please try again later.</p>';
    });
}

// Initial fetch of distributors
fetchDistributors();