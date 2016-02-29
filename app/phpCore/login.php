<?php
	require_once 'blip_4815162342_108.php';
	$conn = db_connect();

	$userEmail = $_POST["email"];
	$userPassword = $_POST["password"];

	//variables from db
	$db_pass="";
	$db_salt="";

	//creating sprock and executing
	$get = mysqli_query($conn,
		     "Call CheckPassArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

	while ($row = mysqli_fetch_row($get))
	{
		$db_pass = $row[0];
		$db_salt = $row[1];
	}

	$hash = crypt($userPassword, $db_salt);

	if ($hash == $db_pass)
	{
		$conn = db_connect();
		$user = mysqli_query($conn,
		     "Call UserDetails('$userEmail')") or die("Query fail: " . mysqli_error($conn));

		$userLogged;

		while ($row = mysqli_fetch_row($user))
		{
			$userLogged = json_encode($row,true);
		}


	    session_start();

		$_SESSION['userSession'] = $userLogged;
		header('Location: http://localhost:9000/home.html#/');
	}
	else
	{
		 echo "pasword incorect";
	}
	//Return to Frontend

	//closing connection
	$conn->close();

?>