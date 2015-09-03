<?php 

include './php-jwt.php';
include '../secrets/config.inc.php';

// Get the POST request data
// http://stackoverflow.com/a/14794856
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
$_POST = $_POST["username"]; //This seems to be related to how Satellizer works. Keep this in mind when removing it.
$email = $_POST["email"];
$username = $_POST["username"];
$password = $_POST["password"];

// A higher "cost" is more secure but consumes more processing power
$cost = 10;

// Create a random salt
$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');

// Prefix information about the hash so PHP knows how to verify it later.
// "$2a$" Means we're using the Blowfish algorithm. The following two digits are the cost parameter.
$salt = sprintf("$2a$%02d$", $cost) . $salt;

// Value:
// $2a$10$eImiTXuWVxfM37uY4JANjQ==

// Hash the password with the salt
$hash = crypt($password, $salt);

$query = "INSERT INTO Users (email, password, id, isAdmin, signupDate, salt, Username) VALUES (\"$email\", \"$hash\", null, 0, \"time('M-D-Y')\", \"$salt\", \"$username\")";

$result = $conn->query($query);

echo json_encode($result);

?>