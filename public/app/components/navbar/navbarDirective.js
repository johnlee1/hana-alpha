'use strict';

angular.module('prayerApp')

  .directive('navbar', function() {
  	return {
    	templateUrl: 'app/components/navbar/navbar.html',
    	controller: 'navbarController',
    	controllerAs: 'navbarController'
  	};

});