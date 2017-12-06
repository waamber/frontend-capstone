'use strict';

geoApp.service("UserService", function ($http, $q, $rootScope, FIREBASE_CONFIG) {

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
        console.log('users', users);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return { getUsers };
});