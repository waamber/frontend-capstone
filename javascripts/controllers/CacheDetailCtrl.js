'use strict';

geoApp.controller("CacheDetailCtrl", function ($location, $routeParams, $scope, CacheService) {

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
      console.log("Error in getSingleCache in CacheDetailCtrl", error);
    });
  };

  getCache();

  $scope.foundIt = (cache) => {
    $scope.cache.cacheId = $routeParams.id;
    let newFoundBy = CacheService.createNewFoundBy($scope.cache);
    CacheService.postNewFoundBy(newFoundBy).then(() => {
      $location.path('/find');
    }).catch((error) => {
      console.log("Error in hideIt", error);
    });
  };

});