angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.about',
  'ui.router',
  'satellizer',
  'authJS'
  ])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $authProvider ) {
  $urlRouterProvider.otherwise( '/home' );
  $authProvider.loginUrl = './Hermes/auth/auth.php';
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $state ) {

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }

    // This manages redirecting for our pages that need authentication.
    // To activate this, give the State a property of userOnly: true
    // Add usability for admin-only pages
    if (toState.userOnly) {
      console.log("You are now in the " + toState.url + " state. This is for authenticated users only.");
      if (true) { //If they are authenticated
        //Let em in!
      } else{
        $state.go('home');
      }
      //Here we put some fancy authentication magic. From authJS.
    }
  });
})

;

