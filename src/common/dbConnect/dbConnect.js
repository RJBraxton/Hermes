angular.module( 'dbConnect', [] )

//Add documentation here when things are mostly done....
.factory( 'dbConnect', function($http) {
	var _factory = {
		siteDetails: function(detail) {
			return $http.post('../db/db_connect.php', {'method': 'siteDetails', 'detail': detail}).
			then(function(res) {
				return res.data[0].data;
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
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
		createPost: function(submitterId, options) {
			return $http.post('../db/db_connect.php', {'method': 'createPost', 'submitterId': submitterId ,'options': options}).
			then(function(res) {
				console.log(( res.data == 1 ? "Changes made successfully." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		editPost: function(userId, id, options) {
			return $http.post('../db/db_connect.php', {'method': 'editPost', 'userId': userId, 'id': id, 'options': options}).
			then(function(res) {
				console.log(( res.data == 1 ? "Changes made successfully." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		removePost: function(id) {
			return $http.post('../db/db_connect.php', {'method': 'removePost', 'id': id}).
			then(function(res) {
				console.log(( res.data == 1 ? "Post deleted." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		getPages: function() {
			//Will later implement limits, etc for pagination
			return $http.post('../db/db_connect.php', {'method': 'getPages'}).
			then(function(res) {
				console.log(res);
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
		viewPage: function(snippet) {
			if (snippet) {
				return $http.post('../db/db_connect.php', {'method': 'viewPage', 'snippet': snippet}).
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
		createPage: function(submitterId, options) {
			return $http.post('../db/db_connect.php', {'method': 'createPage', 'submitterId': submitterId ,'options': options}).
			then(function(res) {
				console.log(( res.data == 1 ? "Changes made successfully." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		editPage: function(submitterId, id, options) {
			return $http.post('../db/db_connect.php', {'method': 'editPage', 'submitterId': submitterId, 'id': id, 'options': options}).
			then(function(res) {
				console.log(( res.data == 1 ? "Changes made successfully." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		},
		removePage: function(id) {
			return $http.post('../db/db_connect.php', {'method': 'removePage', 'id': id}).
			then(function(res) {
				console.log(( res.data == 1 ? "Post deleted." : res.data));
			}, function(err) {
				console.log("Error! %o", err);
			});
		}
	};

	return _factory;
});

