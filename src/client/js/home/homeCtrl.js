(function () {
    'use strict';

    angular.module('myApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope','registerService', '$location'];

    function homeCtrl($scope, registerService, $location) {
        $scope.user = {};

        $scope.register = function() {
            registerService.register($scope.user)
                .then(function (user) {
                    registerService.setInfo(user);
                    $location.path('/dashboard');
                }).catch(function(err) {
                    console.log('this is an error',err);
            })
        }
    }

})(); //end of controller

