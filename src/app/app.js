angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.login',
  'ngBoilerplate.adminOverview',
  'ngBoilerplate.adminUsers',
  'ngBoilerplate.adminPosts',
  'ngBoilerplate.adminEditPost',
  'ngBoilerplate.adminPages',
  'ui.router',
  'satellizer',
  'authJS',
  'dbConnect'
  ])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $authProvider ) {
  $urlRouterProvider.otherwise( '/home' );
  $authProvider.loginUrl = './Hermes/auth/authLogin.php';
  $authProvider.signupUrl = './Hermes/auth/authSignup.php';

})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $state, authJS ) {

$scope.auth = authJS;
if ($scope.loggedIn = authJS.isAuthenticated()) {
  $scope.user = authJS.getPayload();
  console.log($scope.user);
}

$scope.logout = function() {
  authJS.logout().then(function() {
    $scope.loggedIn = false;
    $scope.user = null;
  }, function() {
    //Logout unuccessful?
  });
};

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Hermes' ;
    }

    // This manages redirecting for our pages that require logging in.
    // To activate this, give the State a property of userOnly: true
    if (toState.userOnly) {
      if (authJS.isAuthenticated()) { //If they are authenticated
        //They're cleared to go. Nothing to do here.
      } else{
        $scope.loggedIn = false;
        $state.go('home');
      }
    }
  });

});

