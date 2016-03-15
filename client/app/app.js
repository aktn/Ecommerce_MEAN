//Declares main angular module
//Grab other controllers and services
angular.module('MEAN_Ecommerce',[
    'ngAnimate',

    /**
    For displaying products on user interface
    */
    'product.routes',
    'productCtrl',
    'productService',

    /**
    Relating with user login part
    */
    'user.routes',
    'userLogInCtrl',
    'userAuthService'
    




])

.config(function($httpProvider) {

    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');

});

