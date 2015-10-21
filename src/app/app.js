angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.home',
  'ngBoilerplate.blog',
  'ngBoilerplate.login',
  'ngBoilerplate.post',
  'ngBoilerplate.page',
  'ngBoilerplate.adminOverview',
  'ngBoilerplate.adminUsers',
  'ngBoilerplate.adminPosts',
  'ngBoilerplate.adminCreatePost',
  'ngBoilerplate.adminEditPost',
  'ngBoilerplate.adminPages',
  'ngBoilerplate.adminCreatePage',
  'ngBoilerplate.adminEditPage',
  'ui.router',
  'satellizer',
  'authJS',
  'dbConnect'
  ])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider, $authProvider ) {
  $urlRouterProvider.otherwise( '/' );
  $authProvider.loginUrl = './Hermes/auth/authLogin.php';
  $authProvider.signupUrl = './Hermes/auth/authSignup.php';

})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $state, authJS, dbConnect ) {

  $scope.auth = authJS;
  if ($scope.loggedIn = authJS.isAuthenticated()) {
    $scope.user = authJS.getPayload();
    console.log("You are logged in as: %o", $scope.user);
  }

  $scope.logout = function() {
    authJS.logout().then(function() {
      $scope.loggedIn = false;
      $scope.user = null;
    }, function() {
    //Logout unuccessful?
  });
  };

  dbConnect.siteDetails('pages').then(function(res) {
    $scope.pages = (JSON.parse(res).pages);
  });

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Hermes' ;
    } else {
      //Page titles are defined for all of our views. They'll only be dynamically changed with posts and pages.
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

