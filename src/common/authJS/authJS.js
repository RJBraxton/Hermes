angular.module( 'authJS', [] )

//Add documentation here when things are mostly done....
.factory( 'authJS', function($auth, $state) {
	var _factory = {
		login: function(email, password) {
			return $auth.login({
				email: email,
				password: password
			});
		},
		signup: function(username, email, password) {
			return $auth.signup({
				username: username,
				email: email,
				password: password
			}).then(function(res) {
				res = JSON.parse(res.data);
				if (!res) {
					return [false, "This username or password is already taken."];
				}
				else {
					return [true, "Account successfully created!"];
				}
			}, function(error) {
				return [false, error];
			});
		},
		authenticate: function() {

		},
		logout: function() {
			return $auth.logout();
		},
		isAuthenticated: function() {
			//NOTE: This only checks if we have an unexpired token, not if it is a valid one.
			return $auth.isAuthenticated();
		},
		getToken: function() {
			return $auth.getToken();
		},
		getPayload: function() {
			return $auth.getPayload();
		},
		getSignature: function() {
			return _factory.getToken().split('.')[2];
		},
		setToken: function(token) {
			return $auth.setToken(token);
		}
	};

	return _factory;
})

;

