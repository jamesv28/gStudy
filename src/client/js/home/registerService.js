(function () {
    'use strict';

    angular.module('myApp')
        .service('registerService', registerService);

    registerService.$inject = ['$http', '$location', '$location'];
    
    function registerService($http, $location, $window) {
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
                $window.localStorage.setItem('user', JSON.stringify(userData.data.data.user));
                $window.localStorage.setItem('token', JSON.stringify(userData.data.data.token));
            }
        }
    }

})(); //end of service