angular.module('prayerApp') 

.factory('bibleFactory', function($http) { 

	// create the object
	var bible = {};

	// get pages to display
	bible.getVerse = function() {
		return $http.get('/bible/getRandom');
	};

	return bible;

});