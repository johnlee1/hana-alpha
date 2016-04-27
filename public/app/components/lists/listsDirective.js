'use strict';

angular.module('prayerApp')

  .directive('createlist', function() {
  	return {
    	templateUrl: 'app/components/lists/createList.html',
    	controller: 'listsController',
    	controllerAs: 'listsController'
  	};

});