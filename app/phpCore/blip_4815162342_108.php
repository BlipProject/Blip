<?php
//LIVE DATABASE

static $conn;

function db_connect() {
	if(!isset($conn)) {
		//Load configuration file
		$config = parse_ini_file('config.ini');
		$conn = mysqli_connect($config['server'],$config['username'],$config['password'],$config['db']);
	}

	if($conn === false) {
	        return mysqli_connect_error();
	    }
    return $conn;
}