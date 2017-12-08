'use strict';

geoApp.service("HideService", function ($http, $q, $rootScope, FIREBASE_CONFIG) {

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
      }).catch((error) => {
        reject(error);
      });
    });
  };

  const createNewCache = (hide) => {
    return {
      "name": hide.name,
      "city": hide.city,
      "state": hide.state,
      "latitude": hide.latitude,
      "longitude": hide.longitude,
      "description": hide.description,
      "hiddenBy": hide.uid,
      "dateHidden": hide.dateHidden
    };
  };

  const postNewCache = (newCache) => {
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/caches.json`, JSON.stringify(newCache));
  };

  return { getCaches, createNewCache, postNewCache };
});