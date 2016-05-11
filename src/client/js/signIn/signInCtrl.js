(function () {
    'use strict';

    angular.module('myApp')
        .controller('signInCtrl', signInCtrl);
    
    signInCtrl.$inject = ['$scope','$location','signInService'];

    function signInCtrl($scope,$location, signInService) {

        $scope.user = {};

        $scope.logIn = function () {
          signInService.login($scope.user)
              .then(function (data) {
                  console.log('data', data);
                  signInService.setInfo(data);
                  $location.path('/dashboard');
              }).catch(function (err) {
                console.log(err);
          })
        }
    }
})();
