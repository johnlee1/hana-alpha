'use strict';

angular.module('prayerApp')

  .directive('creategroup', function() {
  	return {
    	templateUrl: 'app/components/groups/createGroup.html',
    	controller: 'groupsController',
    	controllerAs: 'groupsController'
  	};

});