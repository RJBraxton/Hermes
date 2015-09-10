<?php 
include '../secrets/config.inc.php';


$params = json_decode(file_get_contents('php://input'),true);
$method = $params['method'];
$options = $params['options'];
$id = $params['id'];

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

if ($method === 'editUser' && $id) {

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
	$query = $query . $queryOptions . " WHERE id = " . $id;
	
	if ($queryOptions) {
		if ($result = $conn->query($query)) {
			echo ($result);
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

if ($method === 'removeUser' && $id) {
	$query = "DELETE from Users WHERE id = " . $id;
	if ($result = $conn->query($query)) {
			echo var_dump($result);
		}
		else {
			http_response_code(404);
			echo "Failed to contact the database.";
		}
}

if ($method === 'getPosts') {
	$query = "SELECT * from Posts";
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

if ($method === 'getPost') {
	$query = "SELECT * from Posts where postId = " . $id;
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

if ($method === 'editPost' && $id) {

	foreach ($options as $key => $value) {
		$options[$key] = "'$value'";
	}

	$query = "UPDATE Posts SET ";
	$queryOptions = "";
	if (!is_null($options['body'])) {
		$queryOptions .= "body = " . $options['body'];
	}
	if (!is_null($options['title'])) {
		$queryOptions .= ( $queryOptions ? ", " : '' ) . "title = " . $options['title'];
	}
	$queryOptions .= ", lastEditDate = '" . time("YYYY-MM-DD HH:MM:SS") . "'"; 

	$query = $query . $queryOptions . " WHERE postId = " . $id;

	if ($queryOptions) {
		if ($result = $conn->query($query)) {
			echo ($result);
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

if ($method === 'getPages') {
	$query = "SELECT * from Pages";
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

if ($method === 'getPage') {
	$query = "SELECT * from Pages where pageId = " . $id;
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

if ($method === 'editPage' && $id) {

	foreach ($options as $key => $value) {
		$options[$key] = "'$value'";
	} 

	$query = "UPDATE Pages SET ";
	$queryOptions = "";
	if (!is_null($options['pageBody'])) {
		$queryOptions .= "pageBody = " . $options['pageBody'];
	}
	if (!is_null($options['pageTitle'])) {
		$queryOptions .= ( $queryOptions ? ", " : '' ) . "pageTitle = " . $options['pageTitle'];
	}
	$queryOptions .= ", lastEditDate = '" . time("YYYY-MM-DD HH:MM:SS") . "'"; 

	$query = $query . $queryOptions . " WHERE pageId = " . $id;

	if ($queryOptions) {
		if ($result = $conn->query($query)) {
			echo ($result);
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

?>