<?php

	require_once 'blip_4815162342_108.php';
	$conn = db_connect();

	//$user = json_decode(file_get_contents("php://input"));
	$userEmail = $_POST["email"];
	$userPassword = $_POST["password"];

	//echo 'ok?';
	echo $userEmail;
	echo $userPassword;

	//variables from db
	$db_pass="";
	$db_salt="";

	//creating sprock and executing
	$get = mysqli_query($conn,
		     "Call CheckPassArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

	while ($row = mysqli_fetch_row($get))
	{
	   //test is working ok!

		$db_pass = $row[0];
		$db_salt = $row[1];
		//echo $row[0];
		//echo $row[1];
	}

	$hash = crypt($userPassword, $db_salt);

	if ($hash == $db_pass)
	{
		header('Location: home.html');
		echo "pasword corect";
	}
	else
	{
		 echo "pasword incorect";
	}
	//Return to Frontend

	//closing connection
	$conn->close();

?>