'use strict';

geoApp.controller("MyFindsCtrl", function ($location, $routeParams, $scope, AuthService, FoundByService) {

  const uid = AuthService.getCurrentUid();
  $scope.foundByMe = [];

  const getFinds = () => {
    FoundByService.getMyFinds(uid).then((results) => {
      $scope.foundByMe = results;
    }).catch((error) => {
      console.log("Error in getFinds", error);
    });
  };

  getFinds();

  $scope.goToFindsDetail = (cache) => {
    $location.path(`/find/detail/${cache.cacheId}`);
  };

});