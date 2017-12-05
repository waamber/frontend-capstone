'use strict';

geoApp.controller("AuthCtrl", function ($location, $rootScope, $scope, AuthService) {

  $scope.authenticate = () => {
    AuthService.authenticateGoogle().then((result) => {
      $rootScope.uid = result.user.uid;
      $scope.$apply(() => {
        $location.url("/dashboard");
      });
    }).catch((err) => {
      console.log('Error in authenticate() in AuthCtrl', err);
    });
  };

});

