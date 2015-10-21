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
 angular.module( 'ngBoilerplate.adminPosts', [
  'ui.router',
  'plusOne',
  'ngSanitize'
  ])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
 .config(function config( $stateProvider ) {
  $stateProvider.state( 'adminPosts', {
    url: '/admin/posts',
    views: {
      "main": {
        controller: 'PostsCtrl',
        templateUrl: 'admin/posts/posts.tpl.html'
      },
      "nav": {
        controller: 'PostsCtrl',
        templateUrl: 'navs/adminNav.tpl.html'
      }
    },
    data:{ pageTitle: 'Posts' },
    userOnly: true
  });
})

/**
 * And of course we define a controller for our route.
 */
 .controller( 'PostsCtrl', function PostsCtrl( $scope, dbConnect ) {

  dbConnect.getPosts().then(function(res) {
    $scope.posts = res;
  }, function(error) {

  });

  $scope.moment = moment;

    $scope.remove = function(pageId, index) {
    dbConnect.removePost(pageId).then(function() {
      $scope.posts.splice(index, 1);
    },function() {

    });
  };

});