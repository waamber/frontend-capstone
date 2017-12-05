'use strict';

app.service("GeoCacheService", function ($http, $q, $rootScope, FIREBASE_CONFIG) {

  const getCaches = () => {
    let caches = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/caches.json`).then((results) => {
        let fbCaches = results.data;
        Object.keys(fbCaches).forEach((key) => {
          fbCaches[key].id = key;
          caches.push(fbCaches[key]);
        });
        resolve(caches);
        console.log('caches', caches);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return { getCaches };
});