angular.module('prayerApp') 

.factory('postFactory', function($http) { 

	// create the object
	var post = {};

	// create a post
	post.createPost = function(postData) {
		return $http.post('/user/post/', postData);
	};

	// get the posts of a user
	post.getAllPosts = function(userId) {
		return $http.get('/user/allPosts/' + userId);
	};

	// get the public posts of a user
	post.getPublicPosts = function(userId) {
		return $http.get('/user/publicPosts/' + userId);
	};

	return post;

});