'use strict';

geoApp.service("BadgeService", function ($http, $q, ngToast, AuthService, FIREBASE_CONFIG, FoundByService, HiddenByService) {
  const uid = AuthService.getCurrentUid();
  let badges = [];

  const getBadges = () => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/badges.json`).then((results) => {
        let fbBadges = results.data;
        if (fbBadges) {
          Object.keys(fbBadges).forEach((key) => {
            fbBadges[key].id = key;
            badges.push(fbBadges[key]);
          });
        }
        resolve(badges);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  const getMoreBadges = () => {
    let badges = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/badges.json`).then((results) => {
        let fbBadges = results.data;
        if (fbBadges) {
          Object.keys(fbBadges).forEach((key) => {
            fbBadges[key].id = key;
            badges.push(fbBadges[key]);
          });
        }
        resolve(badges);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  const returnBadges = () => {
    return badges;
  };

  const getUserBadges = (userUid) => {
    let userBadges = [];
    return $q((resolve, reject) => {
      let userBadges = [];
      $http.get(`${FIREBASE_CONFIG.databaseURL}/userBadges.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
        let fbUserBadges = results.data;
        if (fbUserBadges) {
          Object.keys(fbUserBadges).forEach((key) => {
            fbUserBadges[key].id = key;
            userBadges.push(fbUserBadges[key]);
          });
        }
        resolve(userBadges);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  const createNewUserBadge = (userId, badgeId) => {
    return {
      badgeId: badgeId,
      uid: userId
    };
  };

  const postNewUserBadge = (newUserBadge) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/userBadges.json`, JSON.stringify(newUserBadge));
  };

  const getHideBadge = () => {
    return $q((resolve, reject) => {
      HiddenByService.getAllHidden(uid).then((results) => {
        if (results.length === 1) {
          let newUserBadge = createNewUserBadge(uid, 'badge1');
          postNewUserBadge(newUserBadge).then(() => {
            const earnedBadge = returnBadges().filter(badge => badge.id === 'badge1');
            resolve(earnedBadge);
            ngToast.create("You've earned a new badge!");
          });
        } else if (results.length === 5) {
          let newUserBadge = createNewUserBadge(uid, 'badge3');
          postNewUserBadge(newUserBadge).then(() => {
            const earnedBadge = returnBadges().filter(badge => badge.id === 'badge3');
            resolve(earnedBadge);
            ngToast.create("You've earned a new badge!");
          }).catch();
        } else {
          reject('You earned nothing, fool.');
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  const getFindBadge = () => {
    return $q((resolve, reject) => {
      FoundByService.getMyFinds(uid).then((results) => {
        if (results.length === 1) {
          let newUserBadge = createNewUserBadge(uid, 'badge0');
          postNewUserBadge(newUserBadge).then(() => {
            const earnedBadge = returnBadges().filter(badge => badge.id === 'badge0');
            resolve(earnedBadge);
            ngToast.create("You've earned a new badge!");
          });
        } else if (results.length === 5) {
          let newUserBadge = createNewUserBadge(uid, 'badge2');
          postNewUserBadge(newUserBadge).then(() => {
            const earnedBadge = returnBadges().filter(badge => badge.id === 'badge2');
            resolve(earnedBadge);
            ngToast.create("You've earned a new badge!");
          }).catch();
        } else {
          reject('You earned nothing, fool.');
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  };

  return { createNewUserBadge, getBadges, getUserBadges, postNewUserBadge, getHideBadge, getFindBadge, getMoreBadges };

});