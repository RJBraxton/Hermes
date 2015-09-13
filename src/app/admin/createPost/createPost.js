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
 angular.module( 'ngBoilerplate.adminCreatePost', [
  'ui.router',
  'plusOne',
  'ngSanitize',
  'textAngular'
  ])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
 .config(function config( $stateProvider ) {
  $stateProvider.state( 'adminCreatePost', {
    url: '/admin/createPost/',
    views: {
      "main": {
        controller: 'CreatePostCtrl',
        templateUrl: 'admin/createPost/createPost.tpl.html'
      },
      "nav": {
        controller: 'CreatePostCtrl',
        templateUrl: 'navs/adminNav.tpl.html'
      }
    },
    data:{ pageTitle: 'Create Post' },
    userOnly: true
  });
})

/**
 * And of course we define a controller for our route.
 */
 .controller( 'CreatePostCtrl', function CreatePostCtrl( $scope, $state, $stateParams, dbConnect ) {

  $scope.post = {
    title: undefined,
    body: undefined,
    category: undefined
  };

  $scope.ready = function(p) {
    if (p.body != null && p.body !== undefined && p.body.length > 0) {
      if (p.title != null && p.title !== undefined && p.title.length > 0) {
        return true;
      }
      else {
        return false;
      }
    } else {
      return false;
    }
  };

  $scope.submit = function() {
    dbConnect.createPost($scope.$parent.user.id, $scope.post).then(function() {
      $state.go('adminPosts');
    });
    //Have something in here to update the time fields.
  };
})

 ;

