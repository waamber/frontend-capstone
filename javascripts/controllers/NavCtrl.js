'use strict';

geoApp.controller("NavCtrl", function ($location, $rootScope, $scope, $window, AuthService) {

  $scope.logoutUser = () => {
    $window.localStorage.clear();
    AuthService.logout();
    $rootScope.navbar = false;
    $location.path('/auth');
  };

  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) => {
      $rootScope.navbar = true;
      $scope.$apply(() => {
        $location.path("/dashboard");
      });
    }).catch((err) => {
      console.log('Error in authenticate() in AuthCtrl', err);
    });
  };

});