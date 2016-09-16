/**
 * UserFactory
 *
 * Keeps track of information about the currently logged in user
 * Provides methods for getting user info from server and posting
 * to server to create new user
 *
 */

angular
  .module('UserFactory', [])
  .factory('UserFactory', UserFactory)

function UserFactory($http) {
  let userData = [];
  let username = '';
  let userId = '';
  let password = '';
  let error = '';
  let bioData = '';
  let bioImage = '';

  let storedActivityNames = [];

  userData.fetch = function() {
    return $http.get('http://localhost:3000/user/' + username + '/' + password);
  };

  userData.getMyMatches = function() {
    return $http.get('http://localhost:3000/mymatches/' + userId);
  }

  userData.storeUserId = function(newUserId) {
    userId = newUserId;
  };

  userData.storeActivityNames = function(activities) {
    activities.forEach(activity => {
      storedActivityNames.push(activity.actname);
    });
  };

  userData.getActivityNames = function() {
    return Array.from(storedActivityNames);
  };

  userData.getUserId = function() {
    return userId;
  };

//returns the curently loggedin user
  userData.getUsername = function() {
    return username;
  };  

  userData.updateUser = function(user, pass) {
    console.log('Current user is now', user, pass)
    username = user;
    password = pass;
  };

  userData.updateBio = function(bio,user,bioImage) {
    bioData = {'bio': bio, 'username':user}
    return $http.put('http://localhost:3000/useractivity/addbio', bioData);
  };

  userData.updateBioImage = function(bioImage,user) {
    bioImageData = {'profilepic': bioImage, 'username':user}
    console.log(bioImageData)
    return $http.put('http://localhost:3000/useractivity/addbioimage', bioImageData);
  };

  userData.error = function(data) {
    $scope.error = data;
  };

  userData.createNew = function (username, password) {
    console.log('createNew data -> ' + username,password);
    let reqBody = {};
    reqBody.username = username;
    reqBody.password = password;
    return $http.post('http://localhost:3000/user/add', reqBody);
  }

  return userData;
}
