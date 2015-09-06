<?php 
include '../secrets/config.inc.php';


$params = json_decode(file_get_contents('php://input'),true);
$method = $params['method'];

if ($method === 'getUsers') {
	if ($result = $conn->query("SELECT email, username, id, isAdmin, signupDate FROM Users")) {
		$users = array();
		while($row = $result->fetch_assoc())
		{
			array_push($users, $row);
		}

		echo json_encode($users);
	} else {
		http_response_code(404);
		echo "Failed to contact the database.";
	}
	



}

?>