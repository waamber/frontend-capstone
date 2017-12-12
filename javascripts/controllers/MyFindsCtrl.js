'use strict';

geoApp.controller("MyFindsCtrl", function ($location, $routeParams, $scope, AuthService, FoundByService) {

  const uid = AuthService.getCurrentUid();
  $scope.foundByMe = [];


  const getFinds = () => {
    console.log(uid);
    FoundByService.getMyFinds(uid).then((results) => {
      $scope.foundByMe = results;
      console.log(results);
    }).catch((error) => {
      console.log("Error in getFinds", error);
    });
  };

  getFinds();

  $scope.goToFindsDetail = (cache) => {
    $location.path(`/find/detail/${cache.cacheId}`);
  };

});