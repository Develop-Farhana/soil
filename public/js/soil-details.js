import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Get the form and button elements
const soilForm = document.getElementById("soil-form");
const submitButton = document.getElementById("submit-soil-details");

// Handle form submission
submitButton.addEventListener("click", function() {
    const soilName = document.getElementById("soil-name").value;
    const soilType = document.getElementById("soil-type").value;
    const soilStructure = document.getElementById("soil-structure").value;
    const soilDegradation = document.getElementById("soil-degradation").value;
    const soilDescription = document.getElementById("soil-description").value;

    // Validate the form
    if (soilName && soilType && soilStructure && soilDegradation && soilDescription) {
        const soilRef = ref(db, 'soil');
        const newSoilRef = push(soilRef); // Push new data

        // Set the values in Firebase
        set(newSoilRef, {
            name: soilName,
            type: soilType,
            structure: soilStructure,
            degradation: soilDegradation,
            description: soilDescription
        }).then(() => {
            alert("Soil details posted successfully!");
            soilForm.reset(); // Reset the form after successful submission

            // Redirect to the soil-list.html page
            window.location.href = "soil-list.html";
        }).catch((error) => {
            console.error("Error posting soil details:", error);
        });
    } else {
        alert("Please fill out all fields.");
    }
});