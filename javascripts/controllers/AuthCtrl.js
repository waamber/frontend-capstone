'use strict';

geoApp.controller("AuthCtrl", function ($location, $rootScope, $scope, AuthService) {

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

