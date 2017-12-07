'use strict';

geoApp.service("CacheService", function ($http, $q, $rootScope, FIREBASE_CONFIG) {

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

  const getUsers = () => {
    let users = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/users.json`).then((results) => {
        let fbUsers = results.data;
        Object.keys(fbUsers).forEach((key) => {
          fbUsers[key].id = key;
          users.push(fbUsers[key]);
        });
        resolve(users);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  const getSingleCache = (cacheId) => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/caches/${cacheId}.json`);
  };

  return { getCaches, getSingleCache, getUsers };
});