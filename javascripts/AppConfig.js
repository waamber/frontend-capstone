'use strict';

const isAuth = (AuthService) => new Promise((resolve, reject) => {
  if (AuthService.isAuthenticated()) {
    resolve();
  } else {
    reject();
  }
});

geoApp.run(function ($location, $rootScope, AuthService, FIREBASE_CONFIG) {
  firebase.initializeApp(FIREBASE_CONFIG);

  $rootScope.$on('$routeChangeStart', function (event, currRoute, prevRoute) {
    const logged = AuthService.isAuthenticated();
    let appTo;
    if (currRoute.originalPath) {
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }
    if (!appTo && !logged) {
      event.preventDefault();
      $rootScope.navbar = false;
      $location.path('/auth');
    } else if (appTo && !logged) {
      $rootScope.navbar = false;
    } else if (appTo && logged) {
      $rootScope.navbar = true;
      $location.path('/dashboard');
    } else if (!appTo && logged) {
      $rootScope.navbar = true;
    }
  });
});

geoApp.config(function ($routeProvider, GOOGLEMAPS_CONFIG, uiGmapGoogleMapApiProvider) {

  uiGmapGoogleMapApiProvider.configure({
    key: GOOGLEMAPS_CONFIG.apiKey
  });

  $routeProvider
    .when("/auth", {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl'
    })
    .when("/dashboard", {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl',
      resolve: { isAuth }
    })
    .when("/cache/detail/:id", {
      templateUrl: 'partials/cache_detail.html',
      controller: 'CacheDetailCtrl',
      resolve: { isAuth }
    })
    .when("/find", {
      templateUrl: 'partials/my_finds.html',
      controller: 'MyFindsCtrl',
      resolve: { isAuth }
    })
    .when("/find/detail/:id", {
      templateUrl: 'partials/find_detail.html',
      controller: 'FindDetailCtrl',
      resolve: { isAuth }
    })
    .when("/editfind/:id", {
      templateUrl: 'partials/edit_find.html',
      controller: 'EditFindCtrl',
      resolve: { isAuth }
    })
    .when("/hide", {
      templateUrl: 'partials/my_hides.html',
      controller: 'MyHidesCtrl',
      resolve: { isAuth }
    })
    .when("/hide/detail/:id", {
      templateUrl: 'partials/hide_detail.html',
      controller: 'HideDetailCtrl',
      resolve: { isAuth }
    })
    .when("/edithide/:id", {
      templateUrl: 'partials/edit_hide.html',
      controller: 'EditHideCtrl',
      resolve: { isAuth }
    })
    .when("/newhide", {
      templateUrl: 'partials/new_hides.html',
      controller: 'NewHideCtrl',
      resolve: { isAuth }
    })
    .when("/badges", {
      templateUrl: 'partials/badges.html',
      controller: 'BadgeCtrl',
      resolve: { isAuth }
    })
    .otherwise("/auth");
});