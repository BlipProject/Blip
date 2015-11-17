<?php
    //require_once 'config.php';
include('config.php');
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
    $move = mysqli_query($conn, 
         "Call MoveIntoUsersArtur('$userEmail')") or die("Query fail: " . mysqli_error($conn));

 echo "ojapierdole!";
/*Twoj sproc ktory kopiuje usera z temp table do final table:
-- create sproc jak zwykle z eUserEmail jako external variable
INSERT INTO users (UserName, UserEmail, Password, Salt)
  SELECT UserName, UserEmail, Password, Salt
  FROM temp_Users
 WHERE temp_Users.UserEmail like eUserEmail 
Trigger after insert to cos takiego
CREATE TRIGGER users_after_insert
AFTER INSERT
   ON Users FOR EACH ROW
   
BEGIN
   DECLARE uEmail varchar(50);
   SELECT New.UserEmail INTO uEmail;
   
  DELETE FROM temp_Users 
WHERE UserEmail like uEmail
   
END; //
DELIMITER ;

*/

    
}else
{
    echo "Sorry activation time expired";
}
?>