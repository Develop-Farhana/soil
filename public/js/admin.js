import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Your Firebase configuration
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
const auth = getAuth(app);
const db = getDatabase(app);

// Event listeners
document.getElementById('login-btn').addEventListener('click', adminLogin);
document.getElementById('logout-btn').addEventListener('click', adminLogout);
document.getElementById('submit-distributor').addEventListener('click', postDistributorDetails);
document.getElementById('post-soil-btn').addEventListener('click', showSoilForm);

// Modal elements
const modal = document.getElementById('soil-modal');
const closeModalButton = document.getElementById('close-modal');

// Admin Login function
function adminLogin() {
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById('admin-login').style.display = 'none';
            document.getElementById('admin-dashboard').style.display = 'block';
        })
        .catch(error => {
            console.error('Login Failed:', error);
            alert('Login Failed: ' + error.message);
        });
}

// Admin Logout function
// Admin Logout function
function adminLogout() {
    signOut(auth)
        .then(() => {
            // When logout is successful, redirect to the login page
            window.location.href = '/admin-login.html'; // Adjust the path to your login page URL

            // If you have a separate login page, you can replace '#admin-login' with the actual URL
            // Example: window.location.href = '/login.html';
        })
        .catch(error => {
            console.error('Logout Failed:', error);
            alert('Logout Failed: ' + error.message);
        });
}

// Show the form for posting soil details inside the modal
function showSoilForm() {
    modal.style.display = "block";

    const formContainer = document.getElementById('soil-form-container');
    formContainer.innerHTML = ''; // Clear any existing content

    const form = document.createElement('form');
    form.id = 'soil-details-form';

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Soil Name: ';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'soil-name';
    nameInput.required = true;

    const typeLabel = document.createElement('label');
    typeLabel.textContent = 'Soil Type: ';
    const typeInput = document.createElement('input');
    typeInput.type = 'text';
    typeInput.id = 'soil-type';
    typeInput.required = true;

    const structureLabel = document.createElement('label');
    structureLabel.textContent = 'Soil Structure: ';
    const structureInput = document.createElement('input');
    structureInput.type = 'text';
    structureInput.id = 'soil-structure';
    structureInput.required = true;

    const degradationLabel = document.createElement('label');
    degradationLabel.textContent = 'Soil Degradation: ';
    const degradationInput = document.createElement('input');
    degradationInput.type = 'text';
    degradationInput.id = 'soil-degradation';
    degradationInput.required = true;

    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Soil Description: ';
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'soil-description';
    descriptionInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Submit Soil Details';
    submitButton.addEventListener('click', postSoilDetails);

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(typeLabel);
    form.appendChild(typeInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(structureLabel);
    form.appendChild(structureInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(degradationLabel);
    form.appendChild(degradationInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(document.createElement('br'));
    form.appendChild(submitButton);

    formContainer.appendChild(form);
}

// Post Soil Details function
function postSoilDetails() {
    const soilName = document.getElementById('soil-name').value;
    const soilType = document.getElementById('soil-type').value;
    const soilStructure = document.getElementById('soil-structure').value;
    const soilDegradation = document.getElementById('soil-degradation').value;
    const soilDescription = document.getElementById('soil-description').value;

    if (soilName && soilType && soilStructure && soilDegradation && soilDescription) {
        push(ref(db, 'soil'), {
                name: soilName,
                type: soilType,
                structure: soilStructure,
                degradation: soilDegradation,
                description: soilDescription
            })
            .then(() => {
                alert('Soil details posted successfully!');
                modal.style.display = "none"; // Close the modal
            })
            .catch(error => {
                console.error('Error posting soil details:', error);
                alert('Error posting soil details: ' + error.message);
            });
    } else {
        alert('Please fill in all fields');
    }
}

// Close the modal when the close button is clicked
closeModalButton.addEventListener('click', function() {
    modal.style.display = "none"; // Hide the modal
});

// Close the modal if user clicks outside of the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Function for posting distributor details
function postDistributorDetails() {
    const distributorName = document.getElementById('distributor-name').value;
    const distributorContact = document.getElementById('distributor-contact').value;

    if (distributorName && distributorContact) {
        push(ref(db, 'distributors'), {
                name: distributorName,
                contact: distributorContact
            })
            .then(() => {
                alert('Distributor details posted successfully!');
            })
            .catch(error => {
                console.error('Error posting distributor details:', error);
                alert('Error posting distributor details: ' + error.message);
            });
    } else {
        alert('Please fill in all distributor details');
    }
}