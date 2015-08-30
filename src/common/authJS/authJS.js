angular.module( 'authJS', [] )

//Add documentation here when things are mostly done....
.factory( 'authJS', function($auth) {
	var _factory = {
		login: function(email, password) {
			return $auth.login({
				email: email,
				password: password
			}).then(function(response) {
				$auth.setToken(response);
			});
		},
		signup: function() {

		},
		authenticate: function() {

		},
		logout: function() {

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

