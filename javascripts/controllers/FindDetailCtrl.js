'use strict';

geoApp.controller("FindDetailCtrl", function ($location, $routeParams, $scope, AuthService, CacheService, FoundByService) {
  const uid = AuthService.getCurrentUid();
  $scope.date = new Date().toString('dd/mm/yyyy');
  $scope.cache = {};
  $scope.map = {};
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

  $scope.map = {
    center: {
      latitude: "",
      longitude: ""
    },
    zoom: 15,
    options: { styles: styleArray }
  };

  const getCache = () => {

    CacheService.getSingleFound($routeParams.id).then((results) => {
      $scope.cache = results;
      CacheService.getSingleCache($scope.cache.cacheId).then((results) => {
        let cache = results.data;
        $scope.cache.latitude = cache.latitude;
        $scope.cache.longitude = cache.longitude;
        $scope.cache.city = cache.city;
        $scope.cache.state = cache.state;
        $scope.cache.description = cache.description;
        $scope.cache.name = cache.name;
        $scope.cache.hiddenBy = cache.hiddenBy;
        $scope.cache.hiddenDate = cache.hiddenDate;
        $scope.cache.option = { url: 'https://i.imgur.com/KDzY85c.png' };
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