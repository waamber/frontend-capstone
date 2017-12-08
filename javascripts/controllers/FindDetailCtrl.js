'use strict';

geoApp.controller("FindDetailCtrl", function ($routeParams, $scope, CacheService) {

  $scope.date = new Date();
  $scope.cache = {};
  $scope.map = {};

  $scope.map = {
    center: {
      latitude: "",
      longitude: ""
    },
    zoom: 15
  };

  const getCache = () => {
    CacheService.getSingleCache($routeParams.id).then((results) => {

      $scope.cache = results.data;
      $scope.map = {
        center: {
          latitude: $scope.cache.latitude,
          longitude: $scope.cache.longitude
        },
        zoom: 15
      };
    }).catch((error) => {
      console.log("Error in getSingleCache in FindDetailCtrl", error);
    });
  };

  getCache();

});