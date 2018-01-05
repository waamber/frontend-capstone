'use strict';

geoApp.controller("CacheDetailCtrl", function ($location, $routeParams, $scope, CacheService, BadgeService) {

  //$scope.date = new Date();
  const currentDate = new Date();
  const mm = currentDate.getMonth() + 1;
  const dd = currentDate.getDate();
  const yyyy = currentDate.getFullYear();
  $scope.date = mm + '/' + dd + '/' + yyyy;

  $scope.cache = {};
  $scope.map = {};

  $scope.map = {
    center: {
      latitude: "",
      longitude: ""
    },
    zoom: 15
  };

  $scope.options = {};

  const getCache = () => {
    CacheService.getSingleCache($routeParams.id).then((results) => {
      $scope.cache = results.data;
      $scope.cache.option = { url: 'https://i.imgur.com/wdnLOyk.png' };
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
      BadgeService.getFindBadge().then(() => {
        $location.path('/find');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log("Error in hideIt", error);
    });
  };

});