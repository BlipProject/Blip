<?php

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();


    $userEmail = $_GET['lkjhgv'];
    $activation = $_GET['asxcv'];

    $db_email;
    $db_code;

	$get = mysqli_query($conn,
         "Call CheckActivationCodeArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

	while ($row = mysqli_fetch_row($get))
	{
		$db_email = $row[0];
		$db_code = $row[1];
	}

	if ($activation == $db_code && $userEmail == $db_email)
	{
		$conn = db_connect();
		$move = mysqli_query($conn,
       		"Call MoveIntoUsersArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));
	}
	else
	{
    	echo "Sorry activation time expired";
	}

	mysqli_close($conn);
?>

<html>
<head>
	<meta charset="UTF-8">
	<title>Account Activated</title>

	<link href='https://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Poiret+One' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="../styles/confirmEmail.css">
</head>
<body>

<div class="confirm-wrap">
	<div class="hidden-logo">
        <img class="landing-logo" src="../images/landingLogoStroked.png" />
    </div>
	<div class="confirm-content-wrap">
		<div class="confirm-content">
			<h2>Account Succesfully Activated</h2>
			<p>You can now login with the username <?php echo $userEmail ?></p>
			<p>You will automatically be redirected in <span id="count">10</span>s</p>
			<br/>
			<a href="index.html"><button class="button-main button-main-green button-border-green" >Login</button></a>
		</div>
	</div>
</div>

<script>
	var time = 10;
	window.setInterval(countDown, 1000);

	function countDown(){
		time-=1;
		document.getElementById('count').innerHTML = time;

		if(time === 0)
			window.location = "/index.html";
	}
</script>