// Import Firebase and Firebase Database functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, get, remove } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Get references
const soilForm = document.getElementById("soil-form");
const soilType = document.getElementById("soil-type");
const phLevel = document.getElementById("ph-level");
const location = document.getElementById("location");
const soilList = document.getElementById("soil-list");
const soilId = document.getElementById("soil-id");

// Add soil details to Firebase and immediately render the new soil in the table
function addSoilToFirebase(type, ph, loc) {
    const soilRef = ref(database, 'soilDetails/' + Date.now());
    set(soilRef, {
        type: type,
        phLevel: ph,
        location: loc
    }).then(() => {
        // After adding the soil, directly render the new soil in the table
        const newSoil = {
            type: type,
            phLevel: ph,
            location: loc
        };
        renderSoilRow(newSoil, soilRef.key); // Render the new row with the soil
    });
}

// Update soil details in Firebase
function updateSoilInFirebase(id, type, ph, loc) {
    const soilRef = ref(database, 'soilDetails/' + id);
    set(soilRef, {
        type: type,
        phLevel: ph,
        location: loc
    }).then(() => {
        fetchSoils(); // Re-fetch soils to show updated data
    });
}

// Delete soil from Firebase
function deleteSoilFromFirebase(id) {
    const soilRef = ref(database, 'soilDetails/' + id);
    remove(soilRef).then(() => {
        fetchSoils(); // Re-fetch soils after deletion
    });
}

// Render soils list as a table
function renderSoilList(soils) {
    soilList.innerHTML = ''; // Clear the table body
    for (let id in soils) {
        const soil = soils[id];
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${soil.type}</td>
            <td>${soil.phLevel}</td>
            <td>${soil.location}</td>
            <td>
                <button class="edit-btn" data-id="${id}" style="background-color: green; color: white;">Edit</button>
                <button class="delete-btn" data-id="${id}" style="background-color: red; color: white;">Delete</button>
            </td>
        `;

        // Add event listener to the delete button
        const deleteButton = tr.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteSoil(id);
        });

        // Add event listener to the edit button
        const editButton = tr.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
            editSoil(id, soil.type, soil.phLevel, soil.location);
        });

        soilList.appendChild(tr);
    }
}

// Function to render a single soil row (for immediate display after adding)
function renderSoilRow(soil, id) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${soil.type}</td>
        <td>${soil.phLevel}</td>
        <td>${soil.location}</td>
        <td>
            <button class="edit-btn" data-id="${id}" style="background-color: green; color: white;">Edit</button>
            <button class="delete-btn" data-id="${id}" style="background-color: red; color: white;">Delete</button>
        </td>
    `;

    // Add event listener to the delete button
    const deleteButton = tr.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
        deleteSoil(id);
    });

    // Add event listener to the edit button
    const editButton = tr.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        editSoil(id, soil.type, soil.phLevel, soil.location);
    });

    // Append the new row to the table
    soilList.appendChild(tr);
}

// Delete soil
function deleteSoil(id) {
    deleteSoilFromFirebase(id);
}

// Edit soil
function editSoil(id, type, ph, loc) {
    soilId.value = id;
    soilType.value = type;
    phLevel.value = ph;
    location.value = loc;
    document.getElementById("submit-btn").textContent = "Update Soil";
}

// Handle form submission (add or update soil)
soilForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = soilId.value;
    const type = soilType.value;
    const ph = phLevel.value;
    const loc = location.value;

    if (id) {
        updateSoilInFirebase(id, type, ph, loc);
        document.getElementById("submit-btn").textContent = "Add Soil";
        soilId.value = '';
    } else {
        addSoilToFirebase(type, ph, loc);
    }

    soilType.value = '';
    phLevel.value = '';
    location.value = '';
});

// Fetch soils from Firebase
function fetchSoils() {
    const soilsRef = ref(database, 'soilDetails');
    get(soilsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const soils = snapshot.val();
            renderSoilList(soils);
        }
    });
}

// Initial fetch of soils
fetchSoils();