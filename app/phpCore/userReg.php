<?php
//LIVE DATABASE
$servername = "eu-cdbr-azure-north-d.cloudapp.net";
$username = "bd90192c1a23ec";
$password = "bfbfe307";
$db = "as_64dd0e9989faa02";

$user = json_decode(file_get_contents("php://input"));
$userName = $user->name;
$userCountry = $user->country;
$userEmail = $user->email;
$userPassword = $user->password;

/*
$userName = $_POST['name'];
$userCountry = $_POST['country'];
$userEmail = $_POST['email'];
$userPassword = $_POST['password'];	
*/

//testing and display
//echo $userName."  ".$userPassword;
// ENCRIPTING PASSWORD
$cost =10;
$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
$salt = sprintf("$2a$%02d$", $cost) . $salt;
$hash = crypt($userPassword, $salt);
//testing hash
//echo $hash;

// Create connection
$conn = mysqli_connect($servername, $username, $password, $db);
// Checking connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
//creating sprock and executing 
$sql = mysqli_query($conn, 
	     "Call RegisterUserArtur( $userCountry , '$userName', '$hash', '$salt', '$userEmail' )") or die("Query fail: " . mysqli_error($conn));
//checking sprock
if ($conn->query($sql) === TRUE) 
{
	//signin succes
    echo "New record created successfully";
} 
else 
{
	//signin failed
    echo "Error: " . $sql . "<br>" . $conn->error;
}
//closing connection
$conn->close();

//BRIAN GERAGHTY suggestion... I have it partly done if we decided is needed 
//http://www.w3schools.com/php/php_form_url_email.asp
// define variables and set to empty values
/*$nameError = $emailError = $countryError = $passwordError = "";


if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameError = "Name is required";
  } else {
    $userName = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z ]*$/",$userName)) {
      $nameError = "Only letters and white space allowed"; 
    }
  }

  if (empty($_POST["email"])) {
    $emailError = "Email is required";
  } else {
    $userEmail = test_input($_POST["email"]);
    // check if e-mail address is well-formed
    if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
      $emailError = "Invalid email format"; 
    }
  }

  if (empty($_POST["country"])) {
    $countryError = "Country is required";
  } else {
    $userCountry = test_input($_POST["country"]);
  }
}

 if (empty($_POST["password"])) {
    $passwordError = "Country is required";
  } else {
    $passwordError = test_input($_POST["password"]);
  }
}
*/
?>
