(function () {
    'use strict';
    
   

    angular.module('myApp')
        .controller('signInCtrl', signInCtrl);
    
    signInCtrl.$inject = ['$scope','$location','$window','signInService'];

    function signInCtrl($scope,$location,$window, signInService) {

        $scope.user = {};

        $scope.logIn = function () {
          signInService.logIn(this.user)
              .then(function (data) {
                  if(data.status === 200) {
                      signInService.setInfo(data);
                      $location.path('/dashboard');
                  }
              }).catch(function (err) {
                console.log(err);
          })
        }
    }
})();
