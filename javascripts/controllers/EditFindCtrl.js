'use strict';

geoApp.controller("EditFindCtrl", function ($location, $routeParams, $scope, CacheService) {


  const getCache = () => {
    CacheService.getSingleCache($routeParams.id).then((results) => {
      $scope.cache = results.data;
      $scope.cache.id = $routeParams.id;
      $scope.map = {
        center: {
          latitude: $scope.cache.latitude,
          longitude: $scope.cache.longitude
        },
        zoom: 15
      };
    }).catch((error) => {
      console.log(error);
    });
  };

  getCache();

  $scope.submitComment = (cache) => {
    const updatedFind = CacheService.createNewFoundBy(cache);
    console.log(cache);
    CacheService.updateFind(updatedFind, updatedFind.id);
    getCache();
    $location.path(`/find/detail/${cache.id}`);
  };

});