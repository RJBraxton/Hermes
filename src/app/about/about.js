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

.controller( 'AboutCtrl', function AboutCtrl( $scope, $auth ) {

  $scope.checkLocal = function() {
    console.log($auth.getPayload());
  };

  $scope.authenticate = function() {
    $auth.login({
      email: $scope.email,
      password: $scope.password
    }).then(function(response) { 
      $auth.setToken(response);
    });
  };
})

;
