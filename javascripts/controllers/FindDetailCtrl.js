'use strict';

geoApp.controller("FindDetailCtrl", function ($location, $routeParams, $scope, AuthService, CacheService, FoundByService) {
  const uid = AuthService.getCurrentUid();
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
      console.log($scope.cache);
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

  $scope.deleteCache = (cacheId) => {
    CacheService.getSingleFound(cacheId).then((results) => {
      FoundByService.deleteMyFind(results.id).then(() => {
        $location.path('/find');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  $scope.addComment = (cache) => {
    $location.path(`/editfind/${cache.id}`);
  };

});