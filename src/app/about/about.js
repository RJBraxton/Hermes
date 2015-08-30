angular.module( 'ngBoilerplate.about', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
  ])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, authJS, $http ) {

  $scope.phpTest = function() {
    $http.post('../secrets/config.inc.php', {})
    .then(function(res) {
      $scope.phpRes = res.data;
    }, function(error) {
      $scope.phpRes = error;
    });
  };

  $scope.checkLocal = function() {
    console.log(authJS.isAuthenticated());
  };

  $scope.authenticate = function() {
    authJS.login({
      email: $scope.email,
      password: $scope.password
    });
  };
})

;
