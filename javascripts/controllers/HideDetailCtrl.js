'use strict';

geoApp.controller("HideDetailCtrl", function ($location, ngToast, $routeParams, $scope, CacheService, HiddenByService) {

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

  $scope.deleteHide = (cache) => {
    const deleteHide = HiddenByService.deleteMyHide(cache.id);
    const deleteFoundBy = HiddenByService.deleteFoundBy(cache.id);
    const deletePromises = [deleteHide, deleteFoundBy];
    Promise.all(deletePromises).then(() => {
      $location.path('/hide');
      $scope.$apply();
    }).catch((error) => {
      ngToast.danger('Error in deletion!');
    });
  };

  $scope.editHide = (cacheId) => {
    $location.path(`/edithide/${cacheId}`);
  };

});