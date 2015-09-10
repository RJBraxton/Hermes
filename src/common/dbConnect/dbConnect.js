angular.module( 'dbConnect', [] )

//Add documentation here when things are mostly done....
.factory( 'dbConnect', function($http) {
	var _factory = {
		getUsers: function() {
			return $http.post('../db/db_connect.php', {'method': 'getUsers'}).
			then(function(res) {
				return res.data;
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		editUser: function(id, options) {
			return $http.post('../db/db_connect.php', {'method': 'editUser', 'id': id, 'options': options}).
			then(function(res) {
				console.log(( res.data == 1 ? "Changes made successfully." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		removeUser: function(id) {
			return $http.post('../db/db_connect.php', {'method': 'removeUser', 'id': id}).
			then(function(res) {
				console.log(res.data);
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		getPosts: function() {
			//Will later implement limits, etc for pagination
			return $http.post('../db/db_connect.php', {'method': 'getPosts'}).
			then(function(res) {				
				return res.data;
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		getPost: function(id) {
			if (id) {
				return $http.post('../db/db_connect.php', {'method': 'getPost', 'id': id}).
				then(function(res) {
					return res.data[0];
				}, function(err) {
					console.log("Error! %o", err);
				});
			}
			else {
				console.log("No id provided.");
			}
		},
		editPost: function(id, options) {
			return $http.post('../db/db_connect.php', {'method': 'editPost', 'id': id, 'options': options}).
			then(function(res) {
				console.log(( res.data == 1 ? "Changes made successfully." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		addPost: function() {

		},
		removePost: function() {

		},
		getPages: function() {
			//Will later implement limits, etc for pagination
			return $http.post('../db/db_connect.php', {'method': 'getPages'}).
			then(function(res) {
				console.log(res.data);
				return res.data;
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		getPage: function(id) {
			if (id) {
				return $http.post('../db/db_connect.php', {'method': 'getPage', 'id': id}).
				then(function(res) {
					return res.data[0];
				}, function(err) {
					console.log("Error! %o", err);
				});
			}
			else {
				console.log("No id provided.");
			}
		},
		editPage: function(id, options) {
			return $http.post('../db/db_connect.php', {'method': 'editPage', 'id': id, 'options': options}).
			then(function(res) {
				console.log(( res.data == 1 ? "Changes made successfully." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		addPage: function() {

		},
		removePage: function() {

		}
	};

	return _factory;
});

