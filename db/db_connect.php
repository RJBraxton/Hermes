<?php 
include '../secrets/config.inc.php';


$params = json_decode(file_get_contents('php://input'),true);
$method = $params['method'];
$options = $params['options'];
$id = $params['id'];
$userId = $params['userId'];

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
		$post = array();
		while($row = $result->fetch_assoc())
		{
			array_push($post, $row);
		}

		echo json_encode($post);
	} else {
		http_response_code(404);
		echo "Failed to contact the database.";
	}
}

if ($method === 'createPost') {

	foreach ($options as $key => $value) {
		$options[$key] = "'$value'";
	}
	
	$query = sprintf("INSERT INTO Posts (title,body,author, postDate, category, summary) VALUES ('%s', '%s', '%s', '%s', %b, '%s')",
		mysql_real_escape_string(substr($options['title'], 1, -1)),
		mysql_real_escape_string(substr($options['body'], 1, -1)),
		$params['submitterId'], 
		mysql_real_escape_string(date("Y-m-d H:i:s")),
		1,
		"summary"
		);

	if ($result = $conn->query($query)) {
		echo ($result);
	}
	else {
		http_response_code(404);
		echo "Failed to contact the database.";
		echo $query;
	}
}

if ($method === 'editPost' && $id && $userId) {

	foreach ($options as $key => $value) {
		$options[$key] = "'$value'";
	}

	$query = sprintf("UPDATE Posts SET body = '%s', title = '%s', lastEditDate = '%s', lastEditUser = %d WHERE postId = $id",
		mysql_real_escape_string(substr($options['body'], 1, -1)),
		mysql_real_escape_string(substr($options['title'], 1, -1)),
		mysql_real_escape_string(date("Y-m-d H:i:s")),
		$userId
		);

	if ($result = $conn->query($query)) {
		$editQuery = sprintf("INSERT INTO PostEdits (editTitle, editBody, authorId, editTime, postId) VALUES ('%s', '%s', '%s', '%s', '%s')",
			mysql_real_escape_string(substr($options['title'], 1, -1)),
			mysql_real_escape_string(substr($options['body'], 1, -1)),
			$userId,
			mysql_real_escape_string(date("Y-m-d H:i:s")),
			$id
			);
		if ($result = $conn->query($editQuery)) {
			echo ($result);
		} else {
			http_response_code(404);
			echo "Failed to add the edits to the database. $editQuery";
		}
	}
	else {
		http_response_code(404);
		echo $query;
	}
}

if ($method === 'removePost') {

	$query = "DELETE from Posts WHERE postId = $id;";

	if ($result = $conn->query($query)) {
		echo ($result);
	}
	else {
		http_response_code(404);
		echo "Failed to contact the database.";
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

if ($method === 'createPage') {

	foreach ($options as $key => $value) {
		$options[$key] = "'$value'";
	}

	$query = sprintf("INSERT INTO Pages (pageTitle, pageBody, authorId, editTime) VALUES ('%s', '%s', '%s', '%s')",
		mysql_real_escape_string(substr($options['title'], 1, -1)),
		mysql_real_escape_string(substr($options['body'], 1, -1)),
		$params['submitterId'], 
		mysql_real_escape_string(date("Y-m-d H:i:s"))
		);

	if ($result = $conn->query($query)) {
		echo ($result);
	}
	else {
		http_response_code(404);
		echo "Failed to contact the database.";
	}
}

if ($method === 'editPage' && $id) {

	foreach ($options as $key => $value) {
		$options[$key] = "'$value'";
	} 

	$query = sprintf("UPDATE Pages SET pageBody = '%s', pageTitle = '%s', lastEditDate = '%s' WHERE pageId = $id",
		mysql_real_escape_string(substr($options['pageBody'], 1, -1)),
		mysql_real_escape_string(substr($options['pageTitle'], 1, -1)),
		mysql_real_escape_string(date("Y-m-d H:i:s"))
		);

	if ($result = $conn->query($query)) {
		$editQuery = sprintf("INSERT INTO PageEdits (editTitle, editBody, authorId, editTime, pageId) VALUES ('%s', '%s', '%s', '%s', '%s')",
			mysql_real_escape_string(substr($options['pageTitle'], 1, -1)),
			mysql_real_escape_string(substr($options['pageBody'], 1, -1)),
			$params['submitterId'], 
			mysql_real_escape_string(date("Y-m-d H:i:s")),
			$id
			);
		if ($result = $conn->query($editQuery)) {
			echo ($result);
		} else {
			http_response_code(404);
			echo "Failed to add the edits to the database. $editQuery";
		}
	}
	else {
		http_response_code(404);
		echo "Failed to contact the database.";
	}
}

if ($method === 'removePage') {

	$query = "DELETE from Pages WHERE pageId = $id;";

	if ($result = $conn->query($query)) {
		echo ($result);
	}
	else {
		http_response_code(404);
		echo "Failed to contact the database.";
	}
}

?>