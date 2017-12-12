'use strict';

geoApp.controller("DashboardCtrl", function ($location, $rootScope, $scope, $window, AuthService, CacheService, FoundByService) {

  const uid = AuthService.getCurrentUid();

  $window.navigator.geolocation.getCurrentPosition(function (position) {
    $scope.map.center.latitude = position.coords.latitude;
    $scope.map.center.longitude = position.coords.longitude;
    $scope.$apply();
  });

  $scope.caches = [];

  $scope.map = {
    center: {
      latitude: 36.170702,
      longitude: -86.787422
    },
    zoom: 11,
  };

  $scope.option = {};

  $scope.onClick = function (markers, eventName, model) {
    model.show = !model.show;
  };

  const caches = () => {
    CacheService.getCaches(uid).then((results) => {
      $scope.caches = results;
      $scope.caches.forEach((cache) => {
        if (cache.hiddenBy === uid) {
          cache.option = { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' };
        }
      });
      FoundByService.getMyFinds(uid).then((results) => {
        let foundCaches = results;
        foundCaches.forEach((foundCache) => {
          $scope.caches.forEach((cache) => {
            if (foundCache.cacheId === cache.id) {
              cache.foundId = foundCache.uid;
              if (cache.foundId === uid) {
                cache.option = { url: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png' };
              }
            }
          });
        });
      });
    }).catch((error) => {
      console.log(error);
    }).catch((error) => {
      console.log(error);
    });
  };

  caches();

  $scope.goToFinds = () => {
    $location.path('/find');
  };

  $scope.goToHides = () => {
    $location.path('/hide');
  };

});