'use strict';

geoApp.controller("MyHidesCtrl", function ($q, $http, $scope, FIREBASE_CONFIG, HiddenByService) {

  $scope.hiddenByMe = [];

  const getHides = () => {
    HiddenByService.getAllHidden().then((results) => {
      $scope.hiddenByMe = results;
    }).catch((error) => {
      console.log("Error in getFinds", error);
    });
  };

  getHides();

});