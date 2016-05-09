(function () {
    'use strict';

    angular.module('myApp')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope','registerService'];

    function homeCtrl($scope, registerService) {
        $scope.user = {};

        $scope.register = function() {
            registerService.register($scope.user)
                .then(function (user) {
                    registerService.setInfo(user);
                })
        }
    }

})(); //end of controller

