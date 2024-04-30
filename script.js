// Import and configure the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyA8VOag8YJMlqZVE3UCEe4XFzHfUuu21iM",
  authDomain: "gasfireloadsenseweb.firebaseapp.com",
  projectId: "gasfireloadsenseweb",
  storageBucket: "gasfireloadsenseweb.appspot.com",
  messagingSenderId: "395220947391",
  appId: "1:395220947391:web:ef153162176ccb75f7d10a",
  measurementId: "G-RYLRFP6PYN"
};
// Initialize Firebase app and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the 'device_activity' collection in Firestore
const activitiesRef = collection(db, "device_activity");

// Function to add a new activity to Firestore
async function addActivity(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const activityType = document.getElementById("activity_type").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Create an activity object
    const activity = {
        activityType,
        date,
        time,
        timestamp: new Date() // Use current timestamp
    };

    // Add the activity to Firestore
    try {
        await addDoc(activitiesRef, activity);
        alert("Activity added successfully!");
        // Reload the dashboard to reflect the new activity
        loadDashboard();
    } catch (error) {
        console.error("Error adding activity:", error);
        alert("Failed to add activity.");
    }
}

// Function to load recent activities from Firestore and display them
async function loadDashboard() {
    // Query recent activities (limit to 10, order by timestamp descending)
    const recentActivitiesQuery = query(
        activitiesRef,
        orderBy("timestamp", "desc"),
        limit(10)
    );

    try {
        const querySnapshot = await getDocs(recentActivitiesQuery);
        const tableBody = document.getElementById("dashboard-table-body");
        // Clear existing rows in the table body
        tableBody.innerHTML = "";

        // Iterate over the query snapshot and create rows for each activity
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = document.createElement("tr");

            // Create table cells (td) for each field and set the inner text
            const activityTypeCell = document.createElement("td");
            activityTypeCell.innerText = data.activityType;

            const dateCell = document.createElement("td");
            dateCell.innerText = data.date;

            const timeCell = document.createElement("td");
            timeCell.innerText = data.time;

            const timestampCell = document.createElement("td");
            // Convert timestamp to local date and time format
            timestampCell.innerText = new Date(data.timestamp).toLocaleString();

            // Append the cells to the row
            row.appendChild(activityTypeCell);
            row.appendChild(dateCell);
            row.appendChild(timeCell);
            row.appendChild(timestampCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        alert("Failed to load dashboard.");
    }
}

// Attach form submit event listener
document.getElementById("activityForm").addEventListener("submit", addActivity);

// Load the dashboard when the page loads
window.addEventListener("load", loadDashboard);