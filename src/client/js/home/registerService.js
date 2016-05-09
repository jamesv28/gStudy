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
                return $http.post('/register',user, config);
            }
        }
    }

}); //end of service