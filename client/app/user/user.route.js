angular.module('user.routes', ['ngRoute'])

    .config(function($routeProvider, $locationProvider) {

        $routeProvider

            //route for displaying user login page
            .when('/login', {
                templateUrl : 'app/user/login/user-login.html',
                controller  : 'userLogInController',
                controllerAs: 'user'
            })

            .when('/signup', {
                templateUrl : 'app/user/signUp/user-signup.html',
                controller  : 'userCreateController',
                controllerAs: 'user'
            });

        //for pretty URLs
        $locationProvider.html5Mode(true);

    });
