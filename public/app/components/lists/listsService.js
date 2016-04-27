angular.module('prayerApp') 

.factory('listsFactory', function($http) { 

	// create the object
	var list = {};

	// create a list
	list.createList = function(listData) {
		return $http.post('/group/write', groupData);
	};

	// get lists to display
	list.getLists = function(userId) {
		return $http.get('/group/' + userId);
	};

	// get the info of a life
	list.getInfo = function(listId) {
		return $http.get('/group/read/' + groupId);
	};

	return list;

});