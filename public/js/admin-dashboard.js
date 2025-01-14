import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, push, child, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

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
const auth = getAuth(app);

// Fetch soil data from Firebase
function fetchSoilData() {
    const soilRef = ref(db, 'soil');
    get(soilRef)
        .then((snapshot) => {
            const soilData = snapshot.val();
            const soilTableBody = document.querySelector("#soil-table tbody");
            soilTableBody.innerHTML = '';
            for (const key in soilData) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${soilData[key].name}</td>
                    <td>${soilData[key].type}</td>
                    <td>${soilData[key].structure}</td>
                    <td>${soilData[key].degradation}</td>
                    <td><button onclick="deleteSoil('${key}')">Delete</button></td>
                `;
                soilTableBody.appendChild(row);
            }
        });
}

// Fetch distributor data from Firebase
function fetchDistributorData() {
    const distributorRef = ref(db, 'distributors');
    get(distributorRef)
        .then((snapshot) => {
            const distributorData = snapshot.val();
            const distributorTableBody = document.querySelector("#distributor-table tbody");
            distributorTableBody.innerHTML = '';
            for (const key in distributorData) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${distributorData[key].name}</td>
                    <td>${distributorData[key].contact}</td>
                    <td><button onclick="deleteDistributor('${key}')">Delete</button></td>
                `;
                distributorTableBody.appendChild(row);
            }
        });
}

// Logout
document.getElementById("logout-btn").addEventListener("click", function() {
    signOut(auth)
        .then(() => {
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Logout Failed:", error);
        });
});

// Add soil details button functionality
document.getElementById("add-soil-btn").addEventListener("click", function() {
    window.location.href = "soil-details.html";
});

// Add distributor details button functionality
document.getElementById("add-distributor-btn").addEventListener("click", function() {
    window.location.href = "distributor-details.html";
});

// On page load, fetch the data
window.onload = function() {
    fetchSoilData();
    fetchDistributorData();
};

// Delete soil record
function deleteSoil(soilKey) {
    const soilRef = ref(db, 'soil/' + soilKey);
    set(soilRef, null)
        .then(() => {
            alert('Soil record deleted successfully');
            fetchSoilData(); // Refresh the data after deletion
        })
        .catch((error) => {
            console.error("Error deleting soil:", error);
        });
}

// Delete distributor record
function deleteDistributor(distributorKey) {
    const distributorRef = ref(db, 'distributors/' + distributorKey);
    set(distributorRef, null)
        .then(() => {
            alert('Distributor record deleted successfully');
            fetchDistributorData(); // Refresh the data after deletion
        })
        .catch((error) => {
            console.error("Error deleting distributor:", error);
        });
}