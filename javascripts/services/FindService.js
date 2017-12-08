'use strict';

geoApp.service("FindService", function ($http, $q, $scope, AuthService, FIREBASE_CONFIG) {

  $scope.date = new Date();

  const getFoundBy = () => {
    let foundBy = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/foundBy.json`).then((results) => {
        let fbFoundBy = results.data;
        Object.keys(fbFoundBy).forEach((key) => {
          fbFoundBy[key].id = key;
          foundBy.push(fbFoundBy[key]);
        });
        resolve(foundBy);
      }).catch((error) => {
        reject(error);
      });
    });
  };





  return { getFoundBy };
});