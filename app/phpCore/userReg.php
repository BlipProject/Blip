 <?php
include('config.php');
$user = json_decode(file_get_contents("php://input"));
$userName = $user->name;
$userCountry = $user->country;
$userEmail = $user->email;
$userPassword = $user->password;
// ENCRIPTING PASSWORD

//$emailvailable = false
//$get = mysqli_query($conn, 
 //      "CALL CheckUsername('$userEmail' , '$emailvailable')") or die("Query fail: " . mysqli_error($conn));
  

//if ($emailvailable) {

  // ok
$cost =10;
$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
$salt = sprintf("$2a$%02d$", $cost) . $salt;
$hash = crypt($userPassword, $salt);
//creating sprock and executing 
$sql = mysqli_query($conn, 
       "Call RegisterUserArtur( $userCountry , '$userName', '$hash', '$salt', '$userEmail' )") or die("Query fail: " . mysqli_error($conn));
//////////////////////////////////////////////
$db_pass;
$db_salt;
$senderEmail = "noreply.blip@gmail.com";
$get = mysqli_query($conn, 
	     "Call CheckPassArtur('$senderEmail')") or die("Query fail: " . mysqli_error($conn));
  
while ($row = mysqli_fetch_row($get))
{ 
$db_pass = $row[0];
$db_salt = $row[1];
} 

require("mailer/PHPMailerAutoload.php"); 
ini_set("SMTP","ssl://smtp.gmail.com"); 
ini_set("smtp_port","465"); 
$mail = new PHPMailer();
$mail->SMTPAuth = true;
$mail->Host = "smtp.gmail.com";
$mail->SMTPSecure = "ssl";
$mail->Username = $senderEmail;
$mail->Password = $db_pass;
$mail->Port = "465";
$mail->isSMTP();
$mail->AddAddress($userEmail);
$mail->Subject  = "Email verification";
$mail->Body     = "
Hi! 
We need to make sure you are human. Please verify your email and get started using your Website account.
";
$mail->WordWrap = 200;
$mail->Send();
///////////////////////////////////////////////

//checking sprock
/*
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

}else
{
  //we have that email wyswietl na stronie informacje 
}
*/
//closing connection
$conn->close();
?>