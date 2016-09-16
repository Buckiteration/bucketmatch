/**
 * Keeps track of the information for the activity that we are currently viewing
 */

angular
  .module('EventFactory', [])
  .factory('EventFactory', EventFactory)

function EventFactory($http, $location) {
  let obj = {};
  let event = '';
  let eventDescription = '';
  // Question: Why is there a user here? Where is this being used?
  // Answer: This user is really the user's ID from the sql database.
  // Shouldn't this information be held in the UserFactory?
  let user = '';
  let matchAct;

  obj.updateEvent = function (activityName, activityDescription) {
    event = activityName;
    eventDescription = activityDescription;
    $location.path('activities');
  };

  //get name of activity (event) and its description
  obj.getActivityData = function () {
    return {activityName: event, activityDescription: eventDescription};
  };


  obj.updateUser = function (data) {
    user = data;
  };

  obj.fetchMatches = function () {
    return $http.get('http://localhost:3000/useractivity/userbyact/' + event);
  };

  obj.fetchActivities = function () {
    return $http.get('http://localhost:3000/activities');
  };

  obj.addUserToEvent = function (userId, activityId) {
    return $http.post(
      'http://localhost:3000/useractivity/add',
      JSON.stringify({
        userId: userId,
        activityId: activityId
      })
    );
  };

  obj.newActivity = function (userId, activityName, activityDescription) {
    return $http.post('http://localhost:3000/activity/add', {
      userId: userId,
      activityName: activityName,
      activityDescription: activityDescription
    });
  };
  return obj;
}
