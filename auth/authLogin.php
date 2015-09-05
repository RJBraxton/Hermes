<?php 
/* This returns a token if login is authorized. */
/* For an added level of security, I believe it's important that we don't specify if either the email or password is incorrect. */

include './php-jwt.php';
include '../secrets/config.inc.php';

// Get the POST request data
// http://stackoverflow.com/a/14794856
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$_POST = $_POST["email"]; //This seems to be related to how Satellizer works. Keep this in mind when removing it.
$email = $_POST["email"];
$password = $_POST["password"];

// MySQL checking.
$result = $conn->query("SELECT * FROM Users WHERE email = '$email' LIMIT 1");
$result = $result->fetch_object();


if ($result) {  
	//If the email is in the DB.
	if ( hash_equals($result->password, crypt($password, $result->salt)) ) {
		//If email and password match
		//Now we are constructing the JWT.
		$token = array(
			"email" => $email,
			"username" => $result->username,
			"isAdmin" => ($result->isAdmin ? true : false),
			"exp" => time() + (60 * 60),
			"iat" => time()
			);
		//Hard-coding the JSON object to be sent back to JS...
		echo "{\"token\": \"" . JWT::encode($token, $jwtKey) . "\"}";

	} else {
		//Email matches. Password does not.
		http_response_code(404);
		echo "The email and password you entered do not match our records. Please try again.";
	}
} else {
	//Email is NOT in the DB.
	http_response_code(404);
	echo "The email and password you entered do not match our records. Please try again.";
}
?>