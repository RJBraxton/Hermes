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
		setUser: function() {

		},
		removeUser: function() {

		},
		getPosts: function() {

		},
		setPost: function() {

		},
		removePost: function() {

		},
		getPages: function() {

		},
		setPage: function() {

		},
		removePage: function() {
			
		}
	};

	return _factory;
});

