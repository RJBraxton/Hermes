<?php 
/* This returns a token if login is authorized. */

include './php-jwt.php';
include '../secrets/config.inc.php';
$key = 'Ravenclaw';

// Get the POST request data
// http://stackoverflow.com/a/14794856
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$_POST = $_POST["email"]; //This seems to be related to how Satellizer works. Keep this in mind when removing it.
$email = $_POST["email"];
$password = $_POST["password"];

// MySQL checking.
$result = $conn->query("SELECT * FROM Users WHERE email = '$email' AND password = '". $password . "'");

if ($result->num_rows == 1) { //If authorized
	//Exp in one hour (60*60)
	$token = array(
		"email" => $email,
		"exp" => time() + (60 * 60),
		"iat" => time()
		);
	//Hard-coding the JSON object to be sent back to JS...
	echo "{\"token\": \"" . JWT::encode($token, $key) . "\"}";

} else { //NOT authorized
	//Return 401 along with some error
}
?>