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

// Get reference to the container where soil cards will be displayed
const soilList = document.getElementById("soil-list");

// Render the soil data in card format
function renderSoilCards(soilData) {
    soilList.innerHTML = ''; // Clear the existing content
    for (let id in soilData) {
        const soil = soilData[id];
        const soilCard = document.createElement("div");
        soilCard.classList.add("soil-card");

        soilCard.innerHTML = `
            <h3>Soil Type: ${soil.soilType}</h3>
            <p><strong>pH Level:</strong> ${soil.phLevel}</p>
            <p><strong>Moisture Content:</strong> ${soil.moistureContent}</p>
            <p><strong>Nutrient Level:</strong> ${soil.nutrientLevel}</p>
        `;

        soilList.appendChild(soilCard);
    }
}

// Fetch soil data from Firebase
function fetchSoilData() {
    const soilRef = ref(database, 'soil');
    get(soilRef).then((snapshot) => {
        if (snapshot.exists()) {
            const soilData = snapshot.val();
            renderSoilCards(soilData);
        }
    });
}

// Initial fetch of soil data
fetchSoilData();