'use strict';

geoApp.controller("HideDetailCtrl", function ($location, $routeParams, $scope, CacheService, HiddenByService) {

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
      $scope.cache.id = $routeParams.id;

    }).catch((error) => {
      console.log("Error in getSingleCache in HideDetailCtrl", error);
    });
  };

  getCache();

  $scope.deleteHide = (cacheId) => {
    CacheService.getSingleFound(cacheId).then((results) => {
      HiddenByService.deleteFoundBy(results.id);
      HiddenByService.deleteMyHide(results.cacheId);
      $location.path('/hide');
    }).catch((error) => {
      console.log(error);
    });
  };

  $scope.editHide = (cacheId) => {
    $location.path(`/edithide/${cacheId}`);
  };

});