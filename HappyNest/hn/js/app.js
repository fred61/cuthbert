'use strict';

(function() {
  var happyNestApp = angular.module('happyNestApp', [ 'ngRoute', 'ngResource' ]);
  
  // router config
  happyNestApp.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/list', {
      templateUrl : 'partials/list.html',
      controller : 'ListController'
    }).otherwise({
      redirectTo : '/list'
    })
  } ]);
})();