angular.module('productService', [])

    .factory('Product', function($http){

        var productFactory = {};

        //retrieve all products
        productFactory.all = function(){
            return $http.get('/api/products/');
        };

        //retrieve single product
        productFactory.get = function(id) {
            return $http.get('/api/products/'+id);
        };

        return productFactory;
    })

    // ===================================================
    //For backend search
    //$resource to interact with RESTful server side
    // ===================================================
    .factory('ProductSearch', function ($resource) {
       return $resource('/api/products/:id/:controller', null, {
         
         'search': { method: 'GET', isArray: true,
           params: {
             controller: 'search'
                }               
            }
        }); 
   });