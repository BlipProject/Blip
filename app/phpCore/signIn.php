<?php

//LIVE DATABASE
$servername = "eu-cdbr-azure-north-d.cloudapp.net";
$username = "bd90192c1a23ec";
$password = "bfbfe307";
$db = "as_64dd0e9989faa02";



 //$servername = "localhost";
	//$username = "root";
	//$password = "";
	//$db = "search_test";



	//getting info from textboxes
	$userName = $_POST['userName'];
	$userPassword = $_POST['userPassword'];
	$userEmail= $_POST['email'];	
	//$userNationality = $_POST['country'];


/*	//testing and display

	echo $userName."  ".$userPassword;

    // ok!
*/
  
    // ENCRIPTING PASSWORD
	$cost =10;
	$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
	$salt = sprintf("$2a$%02d$", $cost) . $salt;
	$hash = crypt($userPassword, $salt);
	//testing hash

	//echo $hash;

	// ok!

	


// Create connection
$conn = mysqli_connect($servername, $username, $password, $db);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//$sql = "INSERT INTO user (UserName, UserPassword, PasswordSalt, UserEmail) where UserName='$userName' and UserPassword = '$userPassword' and PasswordSalt = '$salt' and UserEmail = '$userEmail'");
$sql = "INSERT INTO user (UserName, UserPassword, PasswordSalt, UserEmail, UserNationality, BaseCity, BaseCountry )
VALUES ('$userName', '$hash', '$salt', '$userEmail', 61, 'KRAKOW', 'IRELAND')";

if ($conn->query($sql) === TRUE) 
{
	//signin succes
    echo "New record created successfully";
} 
else {
	//signin failed
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

/*
$query =mysql_query("select userID from tbl_users where Name='$userName' and Password = '$userPassword'limit 1");
if (mysql_num_rows($query)==1) {
	//login succes
}else{
//login failed
	$errorMsg="Invalid Login";

}




signin.php

//getting info from textboxes
	$userName = $_POST['name'];
	$userEmail=$_POST['email'];
	$userPassword = $_POST['password'];

	//testing and display

	//echo $userPassword;
	echo $userEmail;
	//echo $userPassword;

    // ok!

*/	




?>