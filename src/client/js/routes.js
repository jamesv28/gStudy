app.config(function($routeProvider, $locationProvider) {
   $routeProvider
       .when('/', {
           templateUrl: 'js/home/home.html',
           controller: 'homeCtrl'
       })
       .when('/signIn', {
           templateUrl: 'js/signIn/signIn.html',
           controller: 'signInCtrl'
       })
       .otherwise({
           templateUrl: 'js/home/home.html'
       })
});