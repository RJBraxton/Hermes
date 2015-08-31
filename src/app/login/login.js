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
        controller: 'AboutCtrl',
        templateUrl: 'login/login.tpl.html'
      }
    },
    data:{ pageTitle: 'Login' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, authJS, $http, $state ) {


  // Is it possible to think about moving this into the factory?
  // And for some reason authJS.login() refuses to just take two params, and only works with an object???
  $scope.login = function() {
    authJS.login({
      email: $scope.email,
      password: $scope.password
    }).then(function(response) {
        authJS.setToken(response);
        $scope.errorMsg = "Successfully logged in!";
      }, function(error) {
        $scope.errorMsg = "Error: " + error.data;
      });
  };

  $scope.check = function() {
    console.log(authJS.isAuthenticated());
  };
});
