'use strict';

geoApp.controller("NewHideCtrl", function ($location, $scope, AuthService, HideService) {

  $scope.hideIt = function () {
    let newCache = $scope.hide;
    $scope.hide.hiddenBy = AuthService.getCurrentUid();
    HideService.postNewCache(newCache).then(() => {
      $location.path('/hides');
    }).catch((error) => {
      console.log("Error in hideIt", error);
    });
  };

});