'use strict';

geoApp.controller("EditHideCtrl", function ($location, $routeParams, $scope, CacheService) {

  $scope.cache = {};

  const getCache = () => {
    CacheService.getSingleCache($routeParams.id).then((results) => {
      $scope.cache = results.data;
      console.log($scope.cache);
    }).catch((error) => {
      console.log(error);
    });
  };

  getCache();

  $scope.editSubmit = function (cache) {
    let updatedCache = CacheService.createNewCache(cache);
    CacheService.updateCache(updatedCache, $routeParams.id).then(() => {
      getCache();
      $location.path('/hide');
    }).catch((error) => {
      console.log("Error in editSubmit", error);
    });
  };


});
