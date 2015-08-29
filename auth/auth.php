<?php 
include './php-jwt.php';

// Get the POST request data
// http://stackoverflow.com/a/14794856
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

/**
 * Here be MySQL authentication.......
 * One there IS MySQL auth, pass all relevant variables into $token
 */

if (true) { //If authorized
	$token = array(
		"email" => $_POST["email"],
		"exp" => time() + (60 * 60),
		"iat" => time()
		);
	//Hard-coding the JSON object to be sent back to JS...
	echo "{\"token\": \"" .JWT::encode($token, 'secret_server_key') . "\"}";
} else { //NOT authorized
	//Return 401 along with some error
}
?>