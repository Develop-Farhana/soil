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
const db = getDatabase(app);

// Fetch and display all soil data as cards
function fetchSoilData() {
    const soilRef = ref(db, 'soil');
    get(soilRef)
        .then((snapshot) => {
            const soilData = snapshot.val();
            const cardsContainer = document.getElementById("soil-cards-container");
            cardsContainer.innerHTML = ''; // Clear previous data

            // Loop through the soil data and create cards
            for (const key in soilData) {
                const card = document.createElement("div");
                card.classList.add("soil-card");
                card.innerHTML = `
                    <h2>${soilData[key].name}</h2>
                    <p><strong>Type:</strong> ${soilData[key].type}</p>
                    <p><strong>Structure:</strong> ${soilData[key].structure}</p>
                    <p><strong>Degradation:</strong> ${soilData[key].degradation}</p>
                    <p><strong>Description:</strong> ${soilData[key].description}</p>
                `;
                cardsContainer.appendChild(card);
            }
        })
        .catch((error) => {
            console.error("Error fetching soil data:", error);
        });
}

// Fetch and display all distributor data as cards
function fetchDistributorData() {
    const distributorRef = ref(db, 'distributors');
    get(distributorRef)
        .then((snapshot) => {
            const distributorData = snapshot.val();
            const cardsContainer = document.getElementById("distributor-cards-container");
            cardsContainer.innerHTML = ''; // Clear previous data

            // Loop through the distributor data and create cards
            for (const key in distributorData) {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <h2>${distributorData[key].name}</h2>
                    <p><strong>Company Name:</strong> ${distributorData[key].companyName}</p>
                    <p><strong>Experience:</strong> ${distributorData[key].experience} years</p>
                `;
                cardsContainer.appendChild(card);
            }
        })
        .catch((error) => {
            console.error("Error fetching distributor data:", error);
        });
}

// Filter data based on search input
function filterData() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const soilCards = document.querySelectorAll(".soil-card");
    const distributorCards = document.querySelectorAll("#distributor-cards-container .card");

    soilCards.forEach(card => {
        const name = card.querySelector("h2").textContent.toLowerCase();
        const type = card.querySelector("p:nth-child(2)").textContent.toLowerCase();
        card.style.display = name.includes(searchQuery) || type.includes(searchQuery) ? "" : "none";
    });

    distributorCards.forEach(card => {
        const name = card.querySelector("h2").textContent.toLowerCase();
        const companyName = card.querySelector("p:nth-child(2)").textContent.toLowerCase();
        card.style.display = name.includes(searchQuery) || companyName.includes(searchQuery) ? "" : "none";
    });
}

// Add event listener for search functionality
document.getElementById('search-bar').addEventListener('keyup', filterData);

// On page load, fetch both soil and distributor data
window.onload = function() {
    fetchSoilData();
    fetchDistributorData();
};