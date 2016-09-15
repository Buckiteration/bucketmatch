angular
  .module('MyMatchesController', [
    'ngRoute',
    'UserFactory',
    'ClickedFactory'
  ])
  .controller('MyMatchesController', myMatchesController)

function myMatchesController($location, $scope, UserFactory, ClickedFactory) {
  $scope.matches = [];

  UserFactory.getMyMatches()
    .then(response => {
      console.log(response.data)
      $scope.matches = response.data;
    })
    .catch(error => {
      console.log('Error retrieving matches');
    });

  $scope.showUserProfile = function() {
    ClickedFactory.setUser(this.match.username);
    $location.path('contact');
  }
}
