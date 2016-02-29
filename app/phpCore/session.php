<?php
session_start();
if (isset($_SESSION['userSession']))
	echo json_encode($_SESSION['userSession']);
