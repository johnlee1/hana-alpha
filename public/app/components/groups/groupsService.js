angular.module('prayerApp') 

.factory('groupsFactory', function($http) { 

	// create the object
	var group = {};

	// create a group
	group.createGroup = function(groupData) {
		return $http.post('/group/group', groupData);
	};

	// get groups to display
	group.getGroups = function(userId) {
		return $http.get('/group/' + userId);
	};

	// get the info of a page
	group.getInfo = function(groupId) {
		return $http.get('/group/group/' + groupId);
	};

	return group;

});