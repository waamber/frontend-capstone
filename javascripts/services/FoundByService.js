'use strict';

geoApp.service("FoundByService", function ($http, $q, FIREBASE_CONFIG, AuthService) {

  const uid = AuthService.getCurrentUid();

  const getMyFinds = (userUid) => {
    let myFinds = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/foundBy.json?orderBy="uid"&equalTo="${userUid}"`).then((results) => {
        let fbFinds = results.data;
        let count = 0;
        if (fbFinds) {
          let fbFindsArray = Object.keys(fbFinds);
          let finishCount = fbFindsArray.length;
          fbFindsArray.forEach((key) => {
            fbFinds[key].id = key;
            console.log(`${FIREBASE_CONFIG.databaseURL}/caches/${fbFinds[key].cacheId}.json`);
            $http.get(`${FIREBASE_CONFIG.databaseURL}/caches/${fbFinds[key].cacheId}.json`).then((results) => {
              let findCacheData = results.data;
              fbFinds[key].id = fbFinds[key].cacheId;
              // console.log(results);
              fbFinds[key].city = findCacheData.city;
              fbFinds[key].state = findCacheData.state;
              fbFinds[key].dateHidden = findCacheData.dateHidden;
              fbFinds[key].description = findCacheData.description;
              fbFinds[key].latitude = findCacheData.latitude;
              fbFinds[key].longitude = findCacheData.longitude;
              fbFinds[key].name = findCacheData.name;
              myFinds.push(fbFinds[key]);
              count++;
              console.log(count, finishCount);
              if ((finishCount - 1) === count) {
                resolve(myFinds);
              }
            }).catch((error) => {
              reject(error);
            });
          });
        }

      });
    });
  };

  const getAllCaches = () => {
    return $q((resolve, reject) => {
      let cache;
      $http.get(`${FIREBASE_CONFIG.databaseURL}/caches.json`).then((results) => {
        const data = results.data;
        const caches = Object.keys(data).map(key => {
          cache = data[key];
          cache.id = key;
          return cache;
        });
        resolve(cache);
        console.log(caches);
      }).catch((error) => {
        console.log(error);
      });
    });
  };

  const getCacheById = (cacheId) => {
    return $http.get(`${FIREBASE_CONFIG.databaseURL}/caches/${cacheId}.json`);
  };

  const deleteMyFind = (cacheId) => {
    return $http.delete(`${FIREBASE_CONFIG.databaseURL}/foundBy/${cacheId}.json`);
  };

  return { getMyFinds, getCacheById, getAllCaches, deleteMyFind };
});