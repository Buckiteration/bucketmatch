const App = angular
  .module('myApp', [
    'ngRoute', 'UserProfileController', 'notFoundActController',
    'ActivitiesController', 'LoginController', 'MatchController',
    'ContactController', 'MyMatchesController', 'EventFactory',
    'UserFactory', 'ClickedFactory','CustomDirectives',
    'ngFileUpload'
  ]
);

App.config(configFunction);

function configFunction($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: './partials/login.html',
      controller: 'LoginController',
    })
    .when('/profile', {
      templateUrl: './partials/userprofile.html',
      controller: 'UserProfileController',
    })
    .when('/activities', {
      templateUrl: './partials/activitiesusers.html',
      controller: 'MatchController',
    })
    .when('/addActivity', {
      templateUrl: './partials/addactivity.html',
      controller: 'ActivitiesController',
    })
    .when('/contact', {
      templateUrl: './partials/contactView.html',
      controller: 'ContactController',
    })
    .when('/createnew', {
      templateUrl: './partials/createactivity.html',
      controller: 'ActivitiesController',
    })
    .when('/mymatches', {
      templateUrl: './partials/mymatches.html',
      controller: 'MyMatchesController'
    });
}
