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
				console.log(res.data);
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

		},
		editPost: function() {

		},
		removePost: function() {

		},
		getPages: function() {

		},
		editPage: function() {

		},
		removePage: function() {

		}
	};

	return _factory;
});

