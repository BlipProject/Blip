<?php
include('config.php');
$user = json_decode(file_get_contents("php://input"));
$userEmail = $user->email;
$userPassword = $user->password;
//echo 'ok?';
//echo $user->email;
//echo $userPassword;
//variables from db
$db_pass;
$db_salt;
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
echo $hash;
if ($hash==$db_pass) 
{
	echo "pasword corect";
}
else
{
	 echo "pasword incorect";
}
//closing connection
$conn->close();

?>