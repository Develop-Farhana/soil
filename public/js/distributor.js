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
const distributorForm = document.getElementById("distributorForm");
const distributorName = document.getElementById("distributorName");
const distributorEmail = document.getElementById("distributorEmail");
const distributorProduct = document.getElementById("distributorProduct");
const distributorList = document.getElementById("distributor-list");
const distributorId = document.getElementById("distributor-id");

// Add distributor details to Firebase and immediately render the new distributor in the table
function addDistributorToFirebase(name, email, product) {
    const distributorRef = ref(database, 'distributors/' + Date.now());
    set(distributorRef, {
        name: name,
        email: email,
        product: product
    }).then(() => {
        // After adding the distributor, directly render the new distributor in the table
        const newDistributor = {
            name: name,
            email: email,
            product: product
        };
        renderDistributorRow(newDistributor, distributorRef.key); // Render the new row with the distributor
    });
}

// Update distributor details in Firebase
function updateDistributorInFirebase(id, name, email, product) {
    const distributorRef = ref(database, 'distributors/' + id);
    set(distributorRef, {
        name: name,
        email: email,
        product: product
    }).then(() => {
        fetchDistributors(); // Re-fetch distributors to show updated data
    });
}

// Delete distributor from Firebase
function deleteDistributorFromFirebase(id) {
    const distributorRef = ref(database, 'distributors/' + id);
    remove(distributorRef).then(() => {
        fetchDistributors(); // Re-fetch distributors after deletion
    });
}

// Render distributors list as a table
function renderDistributorList(distributors) {
    distributorList.innerHTML = ''; // Clear the table body
    for (let id in distributors) {
        const distributor = distributors[id];
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${distributor.name}</td>
            <td>${distributor.email}</td>
            <td>${distributor.product}</td>
            <td>
                <button class="edit-btn" data-id="${id}" style="background-color: green; color: white;">Edit</button>
                <button class="delete-btn" data-id="${id}" style="background-color: red; color: white;">Delete</button>
            </td>
        `;

        // Add event listener to the delete button
        const deleteButton = tr.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
            deleteDistributor(id);
        });

        // Add event listener to the edit button
        const editButton = tr.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
            editDistributor(id, distributor.name, distributor.email, distributor.product);
        });

        distributorList.appendChild(tr);
    }
}

// Function to render a single distributor row (for immediate display after adding)
function renderDistributorRow(distributor, id) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${distributor.name}</td>
        <td>${distributor.email}</td>
        <td>${distributor.product}</td>
        <td>
            <button class="edit-btn" data-id="${id}" style="background-color: green; color: white;">Edit</button>
            <button class="delete-btn" data-id="${id}" style="background-color: red; color: white;">Delete</button>
        </td>
    `;

    // Add event listener to the delete button
    const deleteButton = tr.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => {
        deleteDistributor(id);
    });

    // Add event listener to the edit button
    const editButton = tr.querySelector(".edit-btn");
    editButton.addEventListener("click", () => {
        editDistributor(id, distributor.name, distributor.email, distributor.product);
    });

    // Append the new row to the table
    distributorList.appendChild(tr);
}

// Delete distributor
function deleteDistributor(id) {
    deleteDistributorFromFirebase(id);
}

// Edit distributor
function editDistributor(id, name, email, product) {
    distributorId.value = id;
    distributorName.value = name;
    distributorEmail.value = email;
    distributorProduct.value = product;
    document.getElementById("submit-btn").textContent = "Update Distributor";
}

// Handle form submission (add or update distributor)
distributorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = distributorId.value;
    const name = distributorName.value;
    const email = distributorEmail.value;
    const product = distributorProduct.value;

    if (id) {
        updateDistributorInFirebase(id, name, email, product);
        document.getElementById("submit-btn").textContent = "Add Distributor";
        distributorId.value = '';
    } else {
        addDistributorToFirebase(name, email, product);
    }

    distributorName.value = '';
    distributorEmail.value = '';
    distributorProduct.value = '';
});

// Fetch distributors from Firebase
function fetchDistributors() {
    const distributorsRef = ref(database, 'distributors');
    get(distributorsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const distributors = snapshot.val();
            renderDistributorList(distributors);
        }
    });
}

// Initial fetch of distributors
fetchDistributors();