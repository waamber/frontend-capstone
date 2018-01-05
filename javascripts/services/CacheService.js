'use strict';

geoApp.service("CacheService", function ($http, ngToast, $q, $rootScope, AuthService, FIREBASE_CONFIG) {

  const uid = AuthService.getCurrentUid();

  const getCaches = () => {
    let caches = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/caches.json`).then((results) => {
        let fbCaches = results.data;
        if (fbCaches) {
          Object.keys(fbCaches).forEach((key) => {
            fbCaches[key].id = key;
            caches.push(fbCaches[key]);
          });
        }
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
    const date = new Date();
    return {
      "cacheId": found.cacheId,
      "comment": found.comment,
      "dateFound": date.toLocaleDateString(),
      "uid": AuthService.getCurrentUid()
    };
  };

  const postNewFoundBy = (find) => {
    ngToast.create("You've found a new cache!");
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

  const updateFind = (cache, cacheId) => {
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/foundBy/${cacheId}.json`, JSON.stringify(cache));
  };

  const updateCache = (cache, cacheId) => {
    return $http.put(`${FIREBASE_CONFIG.databaseURL}/caches/${cacheId}.json`, JSON.stringify(cache));
  };

  const getSingleFoundByOthers = (cacheId) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/foundBy.json?orderBy="cacheId"&equalTo="${cacheId}"`).then((results) => {
        let foundCache = results.data || {};
        Object.keys(foundCache).forEach((key) => {
          foundCache[key].id = key;
          resolve(foundCache[key]);
        });
      }).catch((error) => {
        console.log(error);
      });
    });
  };


  const getSingleFound = (cacheId) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/foundBy.json?orderBy="cacheId"&equalTo="${cacheId}"`).then((results) => {
        let foundCache = results.data;
        if (foundCache) {
          Object.keys(foundCache).forEach((key) => {
            foundCache[key].id = key;
            if (foundCache[key].uid === uid) {
              resolve(foundCache[key]);
            }
          });
        }
      }).catch((error) => {
        console.log(error);
      });
    });
  };

  const getSingleCacheEdit = (cacheId) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/foundBy.json?orderBy="cacheId"&equalTo="${cacheId}"`).then((results) => {
      }).catch();
    });
  };

  return { getCaches, getSingleCache, createNewFoundBy, postNewFoundBy, createNewCache, updateCache, getSingleFound, updateFind, getSingleCacheEdit, getSingleFoundByOthers };
});