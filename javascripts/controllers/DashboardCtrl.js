'use strict';

geoApp.controller("DashboardCtrl", function ($location, $rootScope, $scope, $window, AuthService, CacheService) {

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
    zoom: 11
  };

  $scope.onClick = function (markers, eventName, model) {
    console.log(model.coords);
    model.show = !model.show;
  };

  const caches = () => {
    CacheService.getCaches(AuthService.getCurrentUid()).then((results) => {
      $scope.caches = results;
    }).catch((error) => {
      console.log("Error in caches", error);
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