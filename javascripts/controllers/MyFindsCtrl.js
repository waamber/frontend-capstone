'use strict';

geoApp.controller("MyFindsCtrl", function ($scope, AuthService, FoundByService) {

  const found = () => {
    FoundByService.getFoundBy(AuthService.getCurrentUid()).then((results) => {
      $scope.foundBy = results;
      console.log($scope.foundBy);
    }).catch((error) => {
      console.log("Error in caches", error);
    });
  };

  found();

});