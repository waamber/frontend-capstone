'use strict';

geoApp.service("HiddenByService", function ($http, $q, AuthService, CacheService, FIREBASE_CONFIG, FoundByService) {

  const uid = AuthService.getCurrentUid();

  const getAllHidden = () => {
    const uid = AuthService.getCurrentUid();
    let hiddenCaches = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/caches.json`).then((results) => {
        let fbHidden = results.data;
        if (fbHidden) {
          Object.keys(fbHidden).forEach((key) => {
            fbHidden[key].id = key;
            if (fbHidden[key].hiddenBy === uid) {
              hiddenCaches.push(fbHidden[key]);
            }
          });
        }
        resolve(hiddenCaches);
      }).catch((error) => {
        console.log(error);
      });
    });
  };

  getAllHidden();

  const deleteMyHide = (cacheId) => {
    return $http.delete(`${FIREBASE_CONFIG.databaseURL}/caches/${cacheId}.json`);
  };

  const deleteFoundBy = (cacheId) => {
    return $http.delete(`${FIREBASE_CONFIG.databaseURL}/foundBy/${cacheId}.json`);
  };


  return { getAllHidden, deleteMyHide, deleteFoundBy };
});