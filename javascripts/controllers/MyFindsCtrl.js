'use strict';

geoApp.controller("MyFindsCtrl", function ($scope, AuthService, FoundByService) {

  $scope.foundByMe = [];

  const uid = AuthService.getCurrentUid();

  const getFinds = () => {
    FoundByService.getMyFinds(uid).then((results) => {
      $scope.foundByMe = results;
      console.log($scope.foundByMe);
    }).catch((error) => {
      console.log("Error in getFinds", error);
    });
  };

  getFinds();

});