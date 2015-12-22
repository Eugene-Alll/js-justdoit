(function() {
  "use strict";

  angular.module("llamaLists")
    .factory('llamaLists.common.service.authInterceptor', authInterceptor)
    .config(function ($httpProvider) { //
      $httpProvider.interceptors.push("llamaLists.common.service.authInterceptor");
    });

    authInterceptor.$inject = ["$rootScope", "$q", "$window"];
    function authInterceptor($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.localStorage.token) {
            config.headers.Authorization = "Bearer " + $window.localStorage.token;
          }
          return config;
        },
        response: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
          }
          return response || $q.when(response);
        }
      };
    }
})();