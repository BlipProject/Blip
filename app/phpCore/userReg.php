 <?php
include('blip_4815162342_108.php');

$user = json_decode(file_get_contents("php://input"));
$userName = $user->name;
$userCountry = $user->country;
$userEmail = $user->email;
$userPassword = $user->password;


//##########################################################################################################################
// comenteed to not check is there existing email###########################################################################
// just for presentation for colum co I dont need to delete my existing account from database ##############################
// DO NOT TOUCH ############################################################################################################
//$emailvailable = true;
//$emailvailableTemp = true;
//$conn = mysqli_connect($servername, $username, $password, $db);
//$get = mysqli_query($conn, 
//       "CALL CheckUsername('$userEmail' , '$emailvailable')") or die("Query fail: " . mysqli_error($conn));

//$conn = mysqli_connect($servername, $username, $password, $db);
//$get2 = mysqli_query($conn, 
      //"CALL CheckUserNameTemp('$userEmail' , 'emailvailableTemp')") or die("Query fail: " . mysqli_error($conn));
//if ($emailvailable == false ) 
//{
//	echo "U R ALREADY REGISTER";

//}else if ($emailvailableTemp == false)
//{
 // echo "Check your email and activate your account";
//}else
//{
// comenteed to not check is there existing email###########################################################################
// just for presentation for colum co I dont need to delete my existing account from database ##############################
// DO NOT TOUCH ############################################################################################################
//##########################################################################################################################
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
http://localhost/blip/app/phpCore/activationUser.php?lkjhgv=$userEmail&asxcv=$activationCode



Regards

Blip Team
";
// BRIAN 
$mail->WordWrap = 200;
$mail->Send();
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

//}
?>