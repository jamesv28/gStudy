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
       .when('/dashboard', {
           templateUrl: 'js/dashboard/dashboard.html',
           controller: 'dashboardCtrl'
       })
       .when('/newDeck', {
           templateUrl: 'js/newDeck/newDeck.html',
           controller: 'newDeckCtrl'
       })
       .otherwise({
           templateUrl: 'js/home/home.html'
       })
});