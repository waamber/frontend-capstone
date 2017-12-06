'use strict';

geoApp.service("FoundByService", function ($http, $q, $rootScope, FIREBASE_CONFIG) {

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
        console.log('foundBy', foundBy);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  getFoundBy();

  return { getFoundBy };
});