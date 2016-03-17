angular.module('userSignUpService', [])

    .factory('User', function($http){

        var userCreateFactory = {};

        //To create the new user
        userCreateFactory.create = function(signUpData) {
            return $http.post('/api/users/', signUpData);
        };

        return userCreateFactory;
    });


