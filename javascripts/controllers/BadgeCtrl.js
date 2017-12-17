'use strict';

geoApp.controller("BadgeCtrl", function ($http, $q, $scope, AuthService, BadgeService) {
  const uid = AuthService.getCurrentUid();

  $scope.myBadges = [];

  const getBadgesByUser = () => {
    return $q((resolve, reject) => {
      let badgesByUser = [];
      BadgeService.getMoreBadges().then((results) => {
        let fbBadges = results;
        fbBadges.forEach((badge) => {
          BadgeService.getUserBadges(uid).then((results) => {
            let userBadge = results;
            userBadge.forEach((user) => {
              if (badge.id === user.badgeId) {
                user.achievement = badge.achievement;
                user.description = badge.description;
                user.icon = badge.icon;
                badgesByUser.push(user);
                resolve(badgesByUser);
              }
              $scope.myBadges = badgesByUser;
            });
          }).catch((error) => {
            reject(error);
          });
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  };

  getBadgesByUser();

});
