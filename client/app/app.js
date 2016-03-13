//Declares main angular module
//Grab other controllers and services
angular.module('MEAN_Ecommerce',[
    'ngAnimate',

    /**
    For displaying products on user interface
    */
    'product.routes',
    'productCtrl',
    'productService'




]);

