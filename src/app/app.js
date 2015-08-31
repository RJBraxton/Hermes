angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.login',
  'ui.router',
  'satellizer',
  'authJS'
  ])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $authProvider ) {
  $urlRouterProvider.otherwise( '/home' );
  $authProvider.loginUrl = './Hermes/auth/authLogin.php';
  $authProvider.signupUrl = './Hermes/auth/authSignup.php';

})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $state, authJS ) {

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Hermes' ;
    }

    // This manages redirecting for our pages that require logging in.
    // To activate this, give the State a property of userOnly: true
    if (toState.userOnly) {
      console.log("You are now in the " + toState.url + " state. This is for authenticated users only.");
      if (authJS.isAuthenticated()) { //If they are authenticated
        console.log('You are authenticated and logged in!');
      } else{
        //Not authenticated
        $state.go('home');
      }
    }
  });

});

