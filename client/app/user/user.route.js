angular.module('user.routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            //route for displaying user login page
            .when('/login', {
                templateUrl : 'app/user/login/user-login.html',
                controller  : 'userLogInController',
                controllerAs: 'user'
            });

        //for pretty URLs
        $locationProvider.html5Mode(true);

    });
