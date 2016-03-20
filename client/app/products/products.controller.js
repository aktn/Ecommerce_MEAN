angular.module('productCtrl',['productService'])

    .controller('productController', function(Product){
        var prodcuts = this;

        //to show products are loading from the server
        prodcuts.processing = true;

        //Retrieve all the products
        Product.all()
            .success(function(data){

                //set to false when products are successfully loaded
                prodcuts.processing = false;
                //to display back to frontend interface
                prodcuts.products = data;
            });

    })

    .controller('productDetailsController', function($routeParams, Product) {

        var product = this;

        //Getting particular product ID data from the route and return back the data
        Product.get($routeParams.product_id)
            .success(function(data) {
                product.productData = data;
            });
    })
    //getting the client token
    .constant('clientTokenPath', '/api/payment/client_token')

    .controller('ProductCheckoutCtrl', function($scope, $location, $http, ngCart){

        $scope.errors = '';
        //authorise the payment options such as credit card or paypal
        //if success, payload parameter will receive nonce 
        //which will further process in backend 
        $scope.paymentOptions = {
          onPaymentMethodReceived: function(payload) {
            angular.merge(payload, ngCart.toObject());

            payload.total = payload.totalCost;
            $http.post('/api/orders', payload).then(function success () {
                //if everything is ok, empty the cart and redirect to products page
              ngCart.empty(true);
                $location.path('/products');
            }, 
            function error (res) {
              $scope.errors = res;
            });
          }
        };
    });



