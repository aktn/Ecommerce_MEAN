angular.module('adminUserService', [])

    .factory('User', function($http){

        var adminUserFactory = {};

        //getting all the product lists
        adminUserFactory.all = function(){
            return $http.get('/api/users/');
        };

        return adminUserFactory;
    });