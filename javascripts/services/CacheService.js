'use strict';

geoApp.service("CacheService", function ($http, $q, $rootScope, AuthService, FIREBASE_CONFIG) {

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


  const getSingleCache = (cacheId) => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/caches/${cacheId}.json`);
  };




  const createNewFoundBy = (found) => {
    return {
      "cacheId": found.id,
      "comment": "",
      "uid": AuthService.getCurrentUid()
    };
  };

  const postNewFoundBy = (newFind) => {
    const find = createNewFoundBy(newFind);
    return $http.post(`${FIREBASE_CONFIG.databaseURL}/foundBy.json`, JSON.stringify(find));
  };


  return { getCaches, getSingleCache, createNewFoundBy, postNewFoundBy };
});