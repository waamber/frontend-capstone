'use strict';

geoApp.controller("DashboardCtrl", function ($location, $rootScope, $scope, $window, AuthService, CacheService, FoundByService) {

  const uid = AuthService.getCurrentUid();

  let styleArray = [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
        {
          "saturation": "-100"
        },
        {
          "gamma": "0.50"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#059960"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#f57f27"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "saturation": "0"
        },
        {
          "gamma": "0.50"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#02758c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

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
    options: { styles: styleArray }
  };

  $scope.options = {};

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




});