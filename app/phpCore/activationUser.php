<?php
   
include('blip_4815162342_108.php');
$conn = mysqli_connect($servername, $username, $password, $db);
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
  $conn = mysqli_connect($servername, $username, $password, $db);
  $move = mysqli_query($conn, 
       "Call MoveIntoUsersArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

 echo "Account activated. We are going to redirect You now into Blip. Have fun!";
 //LOCALHOST
 //header( "refresh:3;url = http://localhost:9000/#/" );
 header( "refresh:3;url = http://bliptest.azurewebsites.net/#/" );

}else
{
    echo "Sorry activation time expired";

}
?>