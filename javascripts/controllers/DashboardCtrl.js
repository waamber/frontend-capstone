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

  // $scope.option = { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' };
  //http://maps.google.com/mapfiles/ms/icons/yellow-dot.png

  $scope.onClick = function (markers, eventName, model) {
    model.show = !model.show;
  };

  const caches = () => {

    CacheService.getCaches(uid).then((results) => {
      $scope.caches = results;
      console.log($scope.caches);
      for (var i = 0; i < $scope.caches.length; i++) {
        if ($scope.caches[i].hiddenBy === uid) {
          $scope.caches[i].option = { url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' };
        }
      }
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