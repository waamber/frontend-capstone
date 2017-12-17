'use strict';

geoApp.controller("NewHideCtrl", function ($location, $scope, AuthService, BadgeService, HideService) {

  const uid = AuthService.getCurrentUid();

  $scope.hideIt = function () {
    let newCache = $scope.hide;
    $scope.hide.hiddenBy = uid;
    HideService.postNewCache(newCache).then(() => {
      BadgeService.getHideBadge().then((results) => {
        $location.path('/hide');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log("Error in hideIt", error);
    });
  };

});