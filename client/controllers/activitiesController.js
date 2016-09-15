angular
  .module('ActivitiesController', ['ngRoute', 'EventFactory', 'UserFactory'])
  .controller('ActivitiesController', activitiescontroller);

function activitiescontroller($scope, $location, EventFactory, UserFactory) {
  $scope.events = [];
  $scope.error = '';

  $scope.newDreamName = '';
  $scope.newDreamDescription = '';

  function loadActivities() {
    EventFactory.fetchActivities().then(response => {
      // Each event has the format {actname, actdesc}
      $scope.events = response.data;
    });
  }

  $scope.goToNewDream = function () {
    console.log('goToNewDream');
    $location.path('createnew')
  };

  $scope.createNewActivity = function (name, description) {
    console.log('createNewActivity', name, description);
    EventFactory.newActivity(UserFactory.getUserId(), name, description)
      .then((res) => {
        $location.path('profile');
      });

  };

  $scope.addMeToEvent = function () {
    EventFactory.addUserToEvent(UserFactory.getUserId(), this.activity._id)
      .then(response => {
        console.log(response);
        if (response.data.error) $scope.error = response.data.error;
      });
  };

  loadActivities();
}
