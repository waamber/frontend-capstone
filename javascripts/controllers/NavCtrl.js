'use strict';

geoApp.controller("NavCtrl", function ($location, $rootScope, $scope, $window, AuthService) {
  $scope.logoutUser = () => {
    $window.localStorage.clear();
    AuthService.logout();
    $rootScope.navbar = false;
    $location.path('/auth');
  };
});