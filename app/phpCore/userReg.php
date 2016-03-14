<?php

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();

	$userName= $_POST["nameReg"];
	$userCountry = (int)$_POST["countryReg"];
	$userEmail = $_POST["emailReg"];
	$userPassword = $_POST["passwordReg"];


	$cost =10;
	$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
	$salt = sprintf("$2a$%02d$", $cost) . $salt;
	$hash = crypt($userPassword, $salt);
	$activationCode = crypt($userEmail, $salt);

	//creating sprock and executing
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
	$mail->isHTML(true);
	$mail->AddAddress($userEmail);
	$mail->Subject  = "Email Verification";
	$mail->Body     = "
	<h1>Thanks for signing up!</h1>

	<p>An account has been created for you on Bilp.</p>
	<p>To comple your registration please verify you email address by click in the link below.</p>
	<br/>
	<a href='http://localhost/blip/app/phpCore/activationUser.php?lkjhgv=$userEmail&asxcv=$activationCode'>Verify Account</a>
	<br/>
	<p>If you did not register, please delete this email.</p>


	<p>Blip Team</p>
	";
	//WORK ON LOCALHOST IF U CTRL+V .this into email body
	//http://localhost/blip/app/phpCore/activationUser.php?lkjhgv=$userEmail&asxcv=$activationCode
	$mail->WordWrap = 200;
	$mail->Send();

	$query_string = "name={$userName}&email={$userEmail}";
	$url = "Location: http://localhost:9000/confirmEmail.html?" . $query_string;

	header($url);

	$conn->close();
?>