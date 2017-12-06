'use strict';

geoApp.controller("CacheDetailCtrl", function ($routeParams, $scope, CacheService) {

  $scope.cache = {};

  // $scope.map = {
  //   center: {
  //     latitude: 36.170702,
  //     longitude: -86.787422
  //   },
  //   zoom: 11
  // };

  const getCache = () => {
    CacheService.getSingleCache($routeParams.id).then((results) => {
      $scope.cache = results.data;
      console.log($scope.cache);
    }).catch((error) => {
      console.log("Error in getSingleCache in CacheDetailCtrl", error);
    });
  };

  getCache();

});