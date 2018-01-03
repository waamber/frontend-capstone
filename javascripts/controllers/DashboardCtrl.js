'use strict';

geoApp.controller("DashboardCtrl", function ($location, $rootScope, $scope, $window, AuthService, CacheService, FoundByService) {

  const uid = AuthService.getCurrentUid();
  $scope.caches = [];

  $window.navigator.geolocation.getCurrentPosition(function (position) {
    $scope.map.center.latitude = position.coords.latitude;
    $scope.map.center.longitude = position.coords.longitude;
    $scope.$apply();
  });

  $scope.map = {
    center: {
      latitude: 36.170702,
      longitude: -86.787422
    },
    zoom: 11
  };

  $scope.onClick = function (markers, eventName, model) {
    model.show = !model.show;
  };

  const caches = () => {
    CacheService.getCaches(uid).then((results) => {
      $scope.caches = results;
      $scope.caches.forEach((cache) => {
        if (cache.hiddenBy === uid) {
          cache.option = { url: 'https://i.imgur.com/mZ0x58b.png' };
        } else {
          cache.option = { url: 'https://i.imgur.com/wdnLOyk.png' };
        }
      });
      FoundByService.getMyFinds(uid).then((results) => {
        let foundCaches = results;
        foundCaches.forEach((foundCache) => {
          $scope.caches.forEach((cache) => {
            if (foundCache.cacheId === cache.id) {
              cache.foundId = foundCache.uid;
              if (cache.foundId === uid) {
                cache.option = { url: 'https://i.imgur.com/KDzY85c.png' };
              } else {
                cache.option = { url: 'https://i.imgur.com/wdnLOyk.png' };
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

  $scope.goToNewHide = () => {
    $location.path('/newhide');
  };

  $scope.goToBadges = () => {
    $location.path('/badges');
  };

});