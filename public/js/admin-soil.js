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
const soilType = document.getElementById("soilType");
const phLevel = document.getElementById("phLevel");
const moistureContent = document.getElementById("moistureContent");
const nutrientLevel = document.getElementById("nutrientLevel"); // New field
const soilList = document.getElementById("soil-list");
const soilId = document.getElementById("soil-id");

// Add soil data to Firebase and render it in the table
function addSoilToFirebase(soilTypeValue, phLevelValue, moistureContentValue, nutrientLevelValue) {
    const soilRef = ref(database, 'soil/' + Date.now());
    set(soilRef, {
        soilType: soilTypeValue,
        phLevel: phLevelValue,
        moistureContent: moistureContentValue,
        nutrientLevel: nutrientLevelValue // Save the new field
    }).then(() => {
        const newSoil = {
            soilType: soilTypeValue,
            phLevel: phLevelValue,
            moistureContent: moistureContentValue,
            nutrientLevel: nutrientLevelValue // Add new field to row
        };
        renderSoilRow(newSoil, soilRef.key); // Render new soil in the table
    });
}

// Update soil data in Firebase
function updateSoilInFirebase(id, soilTypeValue, phLevelValue, moistureContentValue, nutrientLevelValue) {
    const soilRef = ref(database, 'soil/' + id);
    set(soilRef, {
        soilType: soilTypeValue,
        phLevel: phLevelValue,
        moistureContent: moistureContentValue,
        nutrientLevel: nutrientLevelValue // Save updated field
    }).then(() => {
        fetchSoilData(); // Re-fetch and display updated data
    });
}

// Delete soil from Firebase
function deleteSoilFromFirebase(id) {
    const soilRef = ref(database, 'soil/' + id);
    remove(soilRef).then(() => {
        fetchSoilData(); // Re-fetch and display updated data after deletion
    });
}

// Render the soil data in the table
function renderSoilList(soilData) {
    soilList.innerHTML = ''; // Clear the existing table content
    for (let id in soilData) {
        const soil = soilData[id];
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${soil.soilType}</td>
            <td>${soil.phLevel}</td>
            <td>${soil.moistureContent}</td>
            <td>${soil.nutrientLevel}</td> <!-- New column -->
            <td>
                <button class="edit-btn" data-id="${id}" style="background-color: green; color: white;">Edit</button>
                <button class="delete-btn" data-id="${id}" style="background-color: red; color: white;">Delete</button>
            </td>
        `;

        // Add event listener to delete button
        const deleteButton = tr.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteSoil(id);
        });

        // Add event listener to edit button
        const editButton = tr.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
            editSoil(id, soil.soilType, soil.phLevel, soil.moistureContent, soil.nutrientLevel);
        });

        soilList.appendChild(tr);
    }
}

// Render a single row for the added or updated soil data
function renderSoilRow(soil, id) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${soil.soilType}</td>
        <td>${soil.phLevel}</td>
        <td>${soil.moistureContent}</td>
        <td>${soil.nutrientLevel}</td> <!-- New column -->
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
        editSoil(id, soil.soilType, soil.phLevel, soil.moistureContent, soil.nutrientLevel);
    });

    // Append the new row to the table
    soilList.appendChild(tr);
}

// Handle delete soil action
function deleteSoil(id) {
    deleteSoilFromFirebase(id);
}

// Handle edit soil action
function editSoil(id, soilTypeValue, phLevelValue, moistureContentValue, nutrientLevelValue) {
    soilId.value = id;
    soilType.value = soilTypeValue;
    phLevel.value = phLevelValue;
    moistureContent.value = moistureContentValue;
    nutrientLevel.value = nutrientLevelValue; // Set new field value
    document.getElementById("submit-btn").textContent = "Update Soil";
}

// Handle form submission (add or update soil data)
soilForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = soilId.value;
    const soilTypeValue = soilType.value;
    const phLevelValue = phLevel.value;
    const moistureContentValue = moistureContent.value;
    const nutrientLevelValue = nutrientLevel.value; // Get the value of new field

    if (id) {
        updateSoilInFirebase(id, soilTypeValue, phLevelValue, moistureContentValue, nutrientLevelValue);
        document.getElementById("submit-btn").textContent = "Add Soil";
        soilId.value = '';
    } else {
        addSoilToFirebase(soilTypeValue, phLevelValue, moistureContentValue, nutrientLevelValue);
    }

    // Reset form after submission
    soilType.value = '';
    phLevel.value = '';
    moistureContent.value = '';
    nutrientLevel.value = ''; // Reset the new field
});

// Fetch soil data from Firebase
function fetchSoilData() {
    const soilRef = ref(database, 'soil');
    get(soilRef).then((snapshot) => {
        if (snapshot.exists()) {
            const soilData = snapshot.val();
            renderSoilList(soilData);
        }
    });
}

// Initial fetch of soil data
fetchSoilData();