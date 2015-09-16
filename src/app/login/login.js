angular.module( 'ngBoilerplate.login', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
  ])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      },
      "nav": {
        controller: 'LoginCtrl',
        templateUrl: 'navs/mainNav.tpl.html'
      }
    },
    data:{ pageTitle: 'Login/Register' }
  });
})

.controller( 'LoginCtrl', function LoginCtrl( $scope, authJS, $http, $state ) {

//Manual routing. Shouldn't be viewing this page if you're logged in.
if ($scope.$parent.loggedIn) {
  $state.go('home');
}

  // Is it possible to think about moving this into the factory?
  // And for some reason authJS.login() refuses to just take two params, and only works with an object???
  $scope.login = function(email, password) {
    authJS.login({
      email: email,
      password: password
    }).then(function(response) {
      authJS.setToken(response);
      $scope.$parent.user = authJS.getPayload();
      $state.go('home');
    }, function(error) {
      $scope.errorMsg = "Error: " + error.data;
    });
  };

  $scope.signup = function() {
    authJS.signup({
      username: $scope.registerUsername,
      email: $scope.registerEmail,
      password: $scope.registerPassword
    }).then(function(res) {
      $scope.signupMessage = res[1];
      if (res[0]) {
        $scope.login($scope.registerEmail, $scope.registerPassword);
      }
    });
  };

  $scope.check = function() {
    console.log(authJS.isAuthenticated());
  };
});
