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
angular.module( 'ngBoilerplate.adminOverview', [
  'ui.router',
  'plusOne'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'adminOverview', {
    url: '/admin/overview',
    views: {
      "main": {
        controller: 'OverviewCtrl',
        templateUrl: 'admin/overview/overview.tpl.html'
      },
      "nav": {
        controller: 'OverviewCtrl',
        templateUrl: 'navs/adminNav.tpl.html'
      }
    },
    data:{ pageTitle: 'Blog Overview' },
    userOnly: true
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'OverviewCtrl', function HomeController( $scope, dbConnect ) {
  dbConnect.siteDetails('pages').then(function(res) {
    $scope.pages = JSON.parse(res);
  });

  $scope.navbarAdd = function(navItem) {
    if (navItem.children) {
      navItem.children.push({"name":"","url":"","children":[]});
    } else{
      //This should only execute if creating a new top level page.
      navItem.push({"name":"","url":"","children":[]});
    }
  };
  $scope.navbarRemove = function(navItem, navIndex) {
    navItem.splice(navIndex, 1);
  };


});

