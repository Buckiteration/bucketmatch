angular
  .module('MatchController', ['ngRoute', 'EventFactory', 'ClickedFactory', 'UserFactory'])
  .controller('MatchController', MatchController);

function MatchController($location, $scope, EventFactory, ClickedFactory, UserFactory) {
  // $scope.users;
  function getOtherUsers() { // get's other user's for clicked event
    EventFactory.fetchMatches()
    .then((res) => {
      let currentUser = UserFactory.getUsername();
      let allUsersMatches = res.data.users;
      let usersMatches = [];

      for (let i = 0; i < allUsersMatches.length; i++) {
        if (allUsersMatches[i].username != currentUser) {
          usersMatches.push(allUsersMatches[i]);
        }
      }
      $scope.users = usersMatches;
    });
  }
  getOtherUsers();

  $scope.GetClickedUser = function () {
    ClickedFactory.setUser(this.user.username);
    $location.path('contact');
  };
}
