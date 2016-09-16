angular
  .module('UserProfileController', ['ngRoute', 'EventFactory', 'UserFactory','ngFileUpload'])
  .controller('UserProfileController', usercontroller)

function usercontroller($scope, $location, $http, EventFactory, UserFactory,Upload) {
  $scope.image = undefined;
  $scope.activities = [];
  $scope.completed = [];
  $scope.description = '';
  $scope.userid = '';
  $scope.username = '';
  $scope.bio = '';
  $scope.bioImage = '../stylesheets/bucket.png';

  // Question: Figure out where this.activity is coming from
  // Answer: It is coming from the ng-repeat="activity in activities"
  // in the userprofile.html partial
  $scope.activityView = function () {
    EventFactory.updateEvent(this.activity.actname);
  };

  $scope.addActivity = function() {
    EventFactory.updateUser($scope.userid);
    $location.path('addActivity');
  };

  $scope.updateBio = function() {
    UserFactory.updateBio($scope.bio,$scope.username,$scope.bioImage);
  }

  $scope.uploadFiles = function(file) {
      Upload.base64DataUrl(file).then(function(urls){
        $scope.bioImage = urls;
        UserFactory.updateBioImage($scope.bioImage,$scope.username);
      });

  }

  function loadPage() {
    // TODO: Why is this on the userProfile page? This should be handled
    // on the login page.
    UserFactory.fetch().then((data) => {
      // I think this will be unnecessary now that the username
      // and password are being checked on the login page.
      // Also, can we figure out a way to make it so that we don't need
      // to fetch here again? We've already fetched on the login page.
      // Maybe we can store the entire user info in the UserFactory, and
      // then just pull it out when we need it.
      if (data === null) {
        UserFactory.error('Sorry incorrect username or password.  Please try again')
        $location.path('/');
      }
      $scope.bioImage = data.data.user.profilepic;
      $scope.activities = data.data.activities;
      $scope.completed = '';
      $scope.bio = data.data.user.bio;
      $scope.userid = data.data.user._id;
      $scope.username = data.data.user.username;

      UserFactory.storeUserId($scope.userid);
      UserFactory.storeActivityNames($scope.activities);
    });
  }
  loadPage();
}
