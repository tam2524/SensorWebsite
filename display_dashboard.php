<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "device_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch recent activities
$sql = "SELECT * FROM device_history ORDER BY timestamp DESC LIMIT 10";
$result = $conn->query($sql);

// Display recent activities in a table
if ($result->num_rows > 0) {
    echo "<table>";
    echo "<tr><th>Device ID</th><th>Activity</th><th>Timestamp</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $row['device_id'] . "</td><td>" . $row['activity'] . "</td><td>" . $row['timestamp'] . "</td></tr>";
    }
    echo "</table>";
} else {
    echo "No recent activities found.";
}

// Close connection
$conn->close();
?>
