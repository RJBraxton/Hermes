<?php 
include '../secrets/config.inc.php';


$params = json_decode(file_get_contents('php://input'),true);
$method = $params['method'];
$options = $params['options'];

if ($method === 'getUsers') {
	$query = "SELECT email, username, id, isAdmin, signupDate FROM Users";
	if ($result = $conn->query($query)) {
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

if ($method === 'editUser' && $params['id']) {

	foreach ($options as $key => $value) {
		$options[$key] = "'$value'";
	}

	$query = "UPDATE Users SET ";
	$queryOptions = "";
	if (!is_null($options['username'])) {
		$queryOptions .= "username = " . $options['username'];
	}
	if (!is_null($options['email'])) {
		$queryOptions .= ( $queryOptions ? ", " : '' ) . "email = " . $options['email'];
	}
	if (!is_null($options['isAdmin'])) {
		$queryOptions .= ( $queryOptions ? ", " : '' ) . "isAdmin = " . $options['isAdmin'];
	}
	if (!is_null($options['password'])) {
		//THIS ONE IS SPECIAL
		$queryOptions .= ( $queryOptions ? ", " : '' ) . "email = " . $options['email'];
	}
	$query = $query . $queryOptions . " WHERE id = " . $params['id'];
	
	if ($queryOptions) {
		if ($result = $conn->query($query)) {
			echo var_dump($result);
		}
		else {
			http_response_code(404);
			echo "Failed to contact the database.";
		}
	} else {
		http_response_code(404);
		echo "No options provided.";
	}
}

if ($method === 'removeUser' && $params['id']) {
	$query = "DELETE from Users WHERE id = " . $params['id'];
	if ($result = $conn->query($query)) {
			echo var_dump($result);
		}
		else {
			http_response_code(404);
			echo "Failed to contact the database.";
		}
}

?>