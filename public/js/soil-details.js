// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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
const db = getFirestore(app);

// Elements from the HTML
const soilForm = document.getElementById("soil-form");
const soilIdInput = document.getElementById("soil-id");
const soilTypeInput = document.getElementById("soil-type");
const phLevelInput = document.getElementById("ph-level");
const locationInput = document.getElementById("location");
const submitBtn = document.getElementById("submit-btn");
const soilList = document.getElementById("soil-list");

// Function to add soil details
const addSoil = async(e) => {
    e.preventDefault();

    const soilType = soilTypeInput.value;
    const phLevel = phLevelInput.value;
    const location = locationInput.value;

    try {
        // Add a new document to the Firestore collection
        const docRef = await addDoc(collection(db, "soilDetails"), {
            soilType,
            phLevel,
            location
        });

        console.log("Document written with ID: ", docRef.id);
        resetForm();
        loadSoils(); // Reload soil details
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

// Function to delete soil details
const deleteSoil = async(id) => {
    try {
        await deleteDoc(doc(db, "soilDetails", id));
        console.log("Document successfully deleted!");
        loadSoils(); // Reload soil details
    } catch (e) {
        console.error("Error deleting document: ", e);
    }
};

// Function to edit soil details
const editSoil = async(id) => {
    const soilDoc = doc(db, "soilDetails", id);
    const docSnap = await getDoc(soilDoc);
    if (docSnap.exists()) {
        const soil = docSnap.data();
        soilIdInput.value = id;
        soilTypeInput.value = soil.soilType;
        phLevelInput.value = soil.phLevel;
        locationInput.value = soil.location;
        submitBtn.textContent = "Update Soil"; // Change button text for update
    } else {
        console.log("No such document!");
    }
};

// Function to update soil details
const updateSoil = async(e) => {
    e.preventDefault();

    const id = soilIdInput.value;
    const soilType = soilTypeInput.value;
    const phLevel = phLevelInput.value;
    const location = locationInput.value;

    const soilDoc = doc(db, "soilDetails", id);
    try {
        await updateDoc(soilDoc, {
            soilType,
            phLevel,
            location
        });

        console.log("Document successfully updated!");
        resetForm();
        loadSoils(); // Reload soil details
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};

// Function to reset form
const resetForm = () => {
    soilForm.reset();
    soilIdInput.value = "";
    submitBtn.textContent = "Add Soil"; // Reset button text for add
};

// Function to load soil details
const loadSoils = async() => {
    const querySnapshot = await getDocs(collection(db, "soilDetails"));
    soilList.innerHTML = ""; // Clear current list

    querySnapshot.forEach((doc) => {
        const soil = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${soil.soilType}</td>
            <td>${soil.phLevel}</td>
            <td>${soil.location}</td>
            <td>
                <button class="edit" onclick="editSoil('${doc.id}')">Edit</button>
                <button class="delete" onclick="deleteSoil('${doc.id}')">Delete</button>
            </td>
        `;

        soilList.appendChild(row);
    });
};

// Event listeners
soilForm.addEventListener("submit", (e) => {
    if (soilIdInput.value) {
        updateSoil(e); // Update soil if an ID is present
    } else {
        addSoil(e); // Add new soil
    }
});

// Initial loading of soil details
loadSoils();