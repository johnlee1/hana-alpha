angular.module('prayerApp') 

.factory('userFactory', function($http) { 

	// create the object
	var user = {};

	user.setId = function(id) {
		user.id = id;
	};

	user.getId = function() {
		return user.id;
	};

	// create a user
	user.createUser = function(userData) {
		return $http.post('/init/register', userData);
	};

	// get a user
	user.userInfo = function(userId) {
		return $http.get('/user/user/' + userId);
	};

	// update a user
	user.updateUser = function(userId, userData) {
		return $http.put('/user/user/' + userId, userData);
	};

	// delete a user
	user.deleteUser = function(username) {
		return $http.delete('/user/' + username);
	};

	// search for users
	user.searchUsers = function(query,userId) {
		return $http.get('/user/search/' + query + '/' + userId);
	};

	// upload photo
	user.uploadPhoto = function(data) {
		return $http.post('/user/photo/', data);
	};

	// get photo
	user.getPhoto = function(userId) {
		return $http.get('/user/photo/' + userId, {responseType: 'arraybuffer'});
	};

	// follow user
	user.followUser = function(data) {
		return $http.post('/user/follow', data);
	}; 

	// unfollow user
	user.unfollowUser = function(data) {
		return $http.post('/user/unfollow', data);
	}; 

	// check if following another user
	user.isConnected = function(followerId, followedId) {
		return $http.get('/user/follow/' + followerId + '/' + followedId);
	}; 

	// get urgent prayer requests
	user.getUrgentRequests = function(userId) {
		return $http.get('/user/urgentPosts/' + userId);
	}; 


	return user;

});