'use strict';

geoApp.controller("NewHideCtrl", function ($location, ngToast, $scope, AuthService, BadgeService, HideService) {

  const uid = AuthService.getCurrentUid();

  $scope.hideIt = function () {
    let newCache = $scope.hide;
    $scope.hide.hiddenBy = uid;
    HideService.postNewCache(newCache).then(() => {
      BadgeService.getHideBadge().then((results) => {
        ngToast.create("You've hidden a cache!");
        $location.path('/hide');
      }).catch((error) => {
        console.log(error);
      });
    }).catch((error) => {
      console.log("Error in hideIt", error);
    });
  };

});