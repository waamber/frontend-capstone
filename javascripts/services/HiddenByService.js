'use strict';

geoApp.service("HiddenByService", function ($http, $q, FIREBASE_CONFIG) {

  const getAllHidden = () => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/caches.json`).then((results) => {
        console.log(results);
      }).catch((error) => {
        console.log(error);
      });
    });
  };

  getAllHidden();

  return { getAllHidden };
});