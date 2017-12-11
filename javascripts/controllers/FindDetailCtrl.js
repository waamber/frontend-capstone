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

    CacheService.getSingleFound($routeParams.id).then((results) => {
      $scope.cache = results;
      CacheService.getSingleCache($scope.cache.cacheId).then((results) => {
        let cache = results.data;
        $scope.cache.latitude = cache.latitude;
        $scope.cache.longitude = cache.longitude;
        $scope.cache.city = cache.city;
        $scope.cache.state = cache.city;
        $scope.cache.description = cache.description;
        $scope.cache.name = cache.name;
        $scope.cache.hiddenBy = cache.hiddenBy;
        $scope.cache.hiddenDate = cache.hiddenDate;
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
    }).catch((error) => {
      console.log(error);
    });
  };

  getCache();

  $scope.deleteCache = (cache) => {
    FoundByService.deleteMyFind(cache.id).then((results) => {
      $location.path('/find');
    }).catch((error) => {
      console.log(error);
    });
  };

  $scope.addComment = (cache) => {
    $location.path(`/editfind/${cache.cacheId}`);
  };

});