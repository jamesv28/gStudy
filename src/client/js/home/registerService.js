(function () {
    'use strict';

    angular.module('myApp')
        .service('registerService', registerService);

    registerService.$inject = ['$http', '$location', '$location','$window', '$localStorage'];
    
    function registerService($http, $location, $window, $localStorage) {
        var user = {};

        var config = {
            headers: {
                'Accept': 'application/json'
            }
        };

        return {
            register: function (user) {
                return $http.post('auth/register',user, config);
            },
            setInfo: function (userInfo) {
                $localStorage.localStorage.user = JSON.stringify(userInfo.data.data.user[0]);
                $localStorage.localStorage.token = JSON.stringify(userInfo.data.data.token);
            }
        }
    }

})(); //end of service