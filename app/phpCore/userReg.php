 <?php
include('blip_4815162342_108.php');

$user = json_decode(file_get_contents("php://input"));
$userName = $user->name;
$userCountry = $user->country;
$userEmail = $user->email;
$userPassword = $user->password;


/*
$conn = mysqli_connect($servername, $username, $password, $db);
$get = mysqli_query($conn, 
       "CALL CheckUsername('$mail')") or die("Query fail: " . mysqli_error($conn));

$msg = "";
while ($row = mysqli_fetch_row($get))
{ 
	$msg = $row[0];
} 

if($msg == "ok")
{
	*/



$cost =10;
$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
$salt = sprintf("$2a$%02d$", $cost) . $salt;
$hash = crypt($userPassword, $salt);
$activationCode = crypt($userEmail, $salt);

//creating sprock and executing 
$conn = mysqli_connect($servername, $username, $password, $db);
$sql = mysqli_query($conn, 
       "Call RegisterTempUserArtur( $userCountry , '$userName', '$hash', '$salt', '$userEmail' , '$activationCode')") or die("Query fail: " . mysqli_error($conn));

$db_pass;
$db_salt;
$mailer = "noreply.blip@gmail.com";

//$conn = mysqli_connect($servername, $username, $password, $db);
$get = mysqli_query($conn, 
	     "Call CheckPassArtur('$mailer')") or die("Query fail: " . mysqli_error($conn));
  
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
$mail->Username = $mailer;
$mail->Password = $db_pass;
$mail->Port = "465";
$mail->isSMTP();
$mail->AddAddress($userEmail);
$mail->Subject  = "Email verification";
$mail->Body     = "
Thanks for signing up!

Your account has been created.
Please verify your email and get started using your Website account. 
Please click this link to activate your account:
http://bliptest.azurewebsites/blip/app/phpCore/activationUser.php?lkjhgv=$userEmail&asxcv=$activationCode





Regards

Blip Team
";
//WORK ON LOCALHOST
//http://localhost/blip/app/phpCore/activationUser.php?lkjhgv=$userEmail&asxcv=$activationCode 

$mail->WordWrap = 200;
$mail->Send();
/*
}
else
{
	echo $msg;
}

*/


$conn->close();

?>