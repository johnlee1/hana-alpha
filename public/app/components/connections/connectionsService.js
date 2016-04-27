angular.module('prayerApp') 

.factory('connectionsFactory', function($http) { 

	// create the object
	var connections = {};

	// get all connections
	connections.getConnections = function(userId) {
		return $http.get('/user/followingUsers/' + userId);
	};

	// get ids of all connections
	connections.getConnectionsIds = function(userId) {
		return $http.get('/user/followingIds/' + userId);
	};

	// search for a user
	connections.searchUsers = function(query) {
		return $http.post('/user/search/' + query);
	};

	// search for a page
	connections.searchPages = function(query) {
		return $http.post('/page/search/' + query);
	};

	return connections;

});