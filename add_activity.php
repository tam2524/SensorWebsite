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

// Retrieve form data
$activity_type = $_POST['activity_type'];
$date = $_POST['date'];
$time = $_POST['time'];

// Insert activity into the database
$sql = "INSERT INTO device_activity (activity_type, date, time) 
        VALUES ('$activity_type', '$date', '$time')";

if ($conn->query($sql) === TRUE) {
    echo "New activity added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
<a href="index.html">Go back</a>
