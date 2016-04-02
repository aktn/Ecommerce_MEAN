angular.module('proSearch',[])
  // ===================================================
  // $location to parse URL in browser
  // $rootScope to watch event emission & broadcast between model & view
  // $window for testability
  // ===================================================

  .controller('SearchbarCtrl', function ($scope, $location, $rootScope, $window, $timeout) {
    $scope.isCollapsed = true;
    $scope.search = function () {
      //search:term to watch as user type per word
      $rootScope.$emit('search:term', { searchTerm : $scope.searchTerm });
    };

    $scope.redirect = function () {
      $location.path('/products');
      // timeout will invoked after any other event has been triggered.
      $timeout(function () {
        // focus on search box
        var searchBox = $window.document.getElementById('searchBox');
        if(searchBox){ 
          searchBox.focus(); 
        }
      });
    }
  });


