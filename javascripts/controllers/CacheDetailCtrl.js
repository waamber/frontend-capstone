'use strict';

geoApp.controller("CacheDetailCtrl", function ($routeParams, $scope, CacheService) {

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
          latitude: results.data.latitude,
          longitude: results.data.longitude
        }
      };
    }).catch((error) => {
      console.log("Error in getSingleCache in CacheDetailCtrl", error);
    });
  };

  getCache();

  $scope.foundIt = () => {
    
  };

});