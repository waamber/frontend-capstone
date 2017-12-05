'use strict';

geoApp.controller("DashboardCtrl", function ($rootScope, $scope, AuthService, CacheService) {

  $scope.caches = [];

  $scope.map = {
    center: {
      latitude: 36.089142,
      longitude: -86.740642
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
      console.log($scope.caches);
    }).catch((error) => {
      console.log("Error in caches", error);
    });
  };

  caches();
});