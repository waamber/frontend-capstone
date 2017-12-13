'use strict';

geoApp.controller("DashboardCtrl", function ($location, $rootScope, $scope, $window, AuthService, CacheService, FoundByService) {

  const uid = AuthService.getCurrentUid();

  let styleArray = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b1b3b6"
        },
        {
          "lightness": "-40"
        },
        {
          "gamma": "1"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
          "color": "#f2f2f2"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "all",
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
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b1b3b6"
        },
        {
          "lightness": "-50"
        },
        {
          "gamma": "1.00"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.government",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.medical",
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
          "color": "#83a534"
        },
        {
          "saturation": "-10"
        },
        {
          "lightness": "50"
        },
        {
          "gamma": "1.00"
        }
      ]
    },
    {
      "featureType": "poi.place_of_worship",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b1b3b6"
        },
        {
          "lightness": "40"
        },
        {
          "gamma": "1"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.sports_complex",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b1b3b6"
        },
        {
          "lightness": "-50"
        },
        {
          "gamma": "1.00"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#8a96b4"
        },
        {
          "saturation": "-10"
        },
        {
          "lightness": "20"
        },
        {
          "gamma": "1.00"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#8a96b4"
        },
        {
          "saturation": "-10"
        },
        {
          "lightness": "20"
        },
        {
          "gamma": "1"
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
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#8a96b4"
        },
        {
          "saturation": "-10"
        },
        {
          "lightness": "30"
        },
        {
          "gamma": "1.00"
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
      "featureType": "transit.station",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station.bus",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit.station.rail",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#46bcec"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#00b2bf"
        },
        {
          "lightness": "60"
        },
        {
          "gamma": "1.00"
        },
        {
          "saturation": "-40"
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

  $scope.goToNewHide = () => {
    $location.path('/newhide');
  };

});