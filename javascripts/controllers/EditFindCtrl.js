'use strict';

geoApp.controller("EditFindCtrl", function ($location, $routeParams, $scope, AuthService, CacheService, FoundByService) {

  const uid = AuthService.getCurrentUid();

  const getCache = () => {
    CacheService.getSingleCache($routeParams.id).then((results) => {
      $scope.cache = results.data;
      $scope.cache.cacheId = $routeParams.id;
      $scope.cache.id = results.data.cacheId;
      $scope.map = {
        center: {
          latitude: $scope.cache.latitude,
          longitude: $scope.cache.longitude
        },
        zoom: 15
      };

      CacheService.getSingleFound($scope.cache.id).then((results) => {
        $scope.cache.cacheId = $routeParams.id;
        $scope.cache.id = results.id;
        $scope.cache.comment = results.comment;
        $scope.cache.dateFound = results.dateFound;
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  getCache();

  $scope.submitComment = (cache) => {
    const updatedFind = CacheService.createNewFoundBy(cache, cache.id);
    CacheService.updateFind(updatedFind, cache.id).then(() => {
      $location.path(`/find/detail/${cache.cacheId}`);
    }).catch((error) => {
    });
  };

});