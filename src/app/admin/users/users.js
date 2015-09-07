/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.adminUsers', [
  'ui.router',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'adminUsers', {
    url: '/admin/users',
    views: {
      "main": {
        controller: 'UsersCtrl',
        templateUrl: 'admin/users/users.tpl.html'
      },
      "nav": {
        controller: 'UsersCtrl',
        templateUrl: 'navs/adminNav.tpl.html'
      }
    },
    data:{ pageTitle: 'Users' },
    userOnly: true
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'UsersCtrl', function UsersCtrl( $scope, dbConnect, $auth ) {

$scope.dbConnect = dbConnect;

$scope.edit = function(id, options) {
  dbConnect.editUser(id, options).then(function(res) {

  }, function(err) {

  });
};
$scope.remove = function(id, index) {
  dbConnect.removeUser(id).then(function(res) {
    $scope.users.splice(index, 1);
    if (id == $scope.$parent.user.id) {
      $auth.logout();
    }
  }, function(err) {

  });
};

  dbConnect.getUsers().then(function(res) {
    $scope.users = res;
  });


})

;

