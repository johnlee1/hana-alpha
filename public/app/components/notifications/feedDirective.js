'use strict';

angular.module('prayerApp')

  .directive('feed', function() {
  	return {
    	templateUrl: 'app/components/notifications/feed.html',
    	controller: 'notificationsController',
    	controllerAs: 'notificationsController'
  	};

});