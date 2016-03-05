<?php
session_id($_POST["sessionId"]);
session_start();

echo $_POST["sessionId"];
$userId = $_SESSION['userId'];
$userName = $_SESSION['userName'];
$userNat = $_SESSION['userNat'];

$sessions = array();

$sessions['Id'] = $userId;
$sessions['Name'] = $userName;
$sessions['Nat'] = $userNat;

header('Content-Type: application/json');
echo json_encode($sessions);