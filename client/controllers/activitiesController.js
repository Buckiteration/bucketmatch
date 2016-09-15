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
      console.log('Got activities');
      // Each event has the format {actname, actdesc}
      const userActivities = UserFactory.getActivityNames();
      console.log(userActivities);
      console.log(response.data);
      
      $scope.events = response.data.filter(activity => {
        return !userActivities.includes(activity.actname);
      });
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
        $location.path('profile');
      });
  };

  loadActivities();
}
