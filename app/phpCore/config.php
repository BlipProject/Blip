<?php
//LIVE DATABASE
$servername = "eu-cdbr-azure-north-d.cloudapp.net";
$username = "bd90192c1a23ec";
$password = "bfbfe307";
$db = "as_64dd0e9989faa02";
$conn = mysqli_connect($servername, $username, $password, $db);
// Checking connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>
