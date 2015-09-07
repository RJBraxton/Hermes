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
 angular.module( 'ngBoilerplate.adminEditPost', [
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
  $stateProvider.state( 'adminEditPost', {
    url: '/admin/editPost/:postId',
    views: {
      "main": {
        controller: 'EditPostCtrl',
        templateUrl: 'admin/editPost/editPost.tpl.html'
      },
      "nav": {
        controller: 'EditPostCtrl',
        templateUrl: 'navs/adminNav.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit Post' },
    userOnly: true
  });
})

/**
 * And of course we define a controller for our route.
 */
 .controller( 'EditPostCtrl', function EditPostCtrl( $scope, $stateParams, dbConnect ) {

  dbConnect.getPost($stateParams.postId).then(function(res) {
    $scope.post = res;
  });

  $scope.edit = function() {
    dbConnect.editPost($scope.post.postId, $scope.post);
  };
})

 ;

