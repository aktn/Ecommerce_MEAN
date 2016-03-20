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
    'userAuthService',
    
    /**
    Relating with user SignIn part
    */
    'userSignUpCtrl',
    'userSignUpService',

    /**
    For integrating shopping cart
    */
    'ngCart',

    /**
    Integrating payment gateway
    */
    'braintree-angular'





])

.config(function($httpProvider) {

    // attach our auth interceptor to the http requests
    $httpProvider.interceptors.push('AuthInterceptor');

});

