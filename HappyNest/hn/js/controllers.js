'use strict';

(function() {
  var happyNestApp = angular.module('happyNestApp');
  
  happyNestApp.controller('AppController', [function() {
    console.log("AppController function");
  }]);
  
  happyNestApp.controller('ListController', [function() {
    console.log("ListController function");
  }]);
})();  