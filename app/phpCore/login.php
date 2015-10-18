<?php

//LIVE DATABASE
$servername = "eu-cdbr-azure-north-d.cloudapp.net";
$username = "bd90192c1a23ec";
$password = "bfbfe307";
$db = "as_64dd0e9989faa02";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//getting info from textboxes
$userEmail = $_POST['userEmail'];
$userPassword = $_POST['userPassword'];
//



//testing and display
//echo $userName."  ".$userPassword;

//variables from db
$db_pass;
$db_salt;

//creating sprock and executing 
$get = mysqli_query($conn, 
	     "CALL CheckPassArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));
  
while ($row = mysqli_fetch_row($get))
{ 
   //test is working ok!
   //echo $row[0];
   //echo $row[1]; 
$db_pass = $row[0];
$db_salt = $row[1];
} 

	
	
$hash = crypt($userPassword, $db_salt);
if ($hash==$db_pass) 
{
	echo "pasword corest";
}
else
{
	 echo "pasword incorest";
}
//closing connection
$conn->close();





?>