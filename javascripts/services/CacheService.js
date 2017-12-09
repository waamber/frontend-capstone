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

  const createNewCache = (cache) => {
    return {
      "city": cache.city,
      "dateHidden": cache.dateHidden,
      "description": cache.description,
      "hiddenBy": cache.hiddenBy,
      "latitude": cache.latitude,
      "longitude": cache.longitude,
      "name": cache.name,
      "state": cache.state
    };
  };

  const updateCache = (cache, cacheId) => {
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/caches/${cacheId}.json`, JSON.stringify(cache));
  };


  return { getCaches, getSingleCache, createNewFoundBy, postNewFoundBy, createNewCache, updateCache };
});