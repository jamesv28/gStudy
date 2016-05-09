app.config(function($routeProvider, $locationProvider) {
   $routeProvider
       .when('/', {
           templateUrl: 'js/home/home.html',
           controller: 'homeCtrl'
       })
       .otherwise({
           templateUrl: 'js/home/home.html'
       })
});