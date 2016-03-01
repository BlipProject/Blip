<?php
session_start();

//Create array to store session variables
$currentSession = array();

//Expose only session details required
$currentSession['id'] = $_SESSION['userId'];
$currentSession['name'] = $_SESSION['userName'];
$currentSession['Nat'] = $_SESSION['userNat'];

//header('Content-Type: application/json');
echo json_encode($currentSession,true);
