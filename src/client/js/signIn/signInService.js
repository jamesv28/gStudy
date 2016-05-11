(function () {
    angular.module('myApp')
        .service('signInService', signInService);

    signInService.$inject = ['$http','$window','$location','$localStorage'];

    function signInService($http, $location,$window, $localStorage) {

        return {
            login: function(data) {
                return $http({
                    method: 'POST',
                    url: '/auth/login',
                    data: data
                }).then(function (data) {
                    return data;
                }).catch(function (err) {
                    return err;
                })
            },
            setInfo: function (userInfo) {
                $localStorage.localStorage.user = JSON.stringify(userInfo.data.data.user[0]);
                $localStorage.localStorage.token = JSON.stringify(userInfo.data.data.token);
            }
        }
    }
})();