angular.module('prayerApp') 

.factory('pagesFactory', function($http) { 

	// create the object
	var page = {};

	// create a post
	page.createPage = function(pageData) {
		return $http.post('/page/page', pageData);
	};

	// get pages to display
	page.getPages = function(userId) {
		return $http.get('/page/userPages/' + userId);
	};

	// get the info of a page
	page.getInfo = function(pageId) {
		return $http.get('/page/' + pageId);
	};

	// update a page
	page.updatePage = function(pageId, pageData) {
		return $http.put('/page/' + pageId, pageData);
	};

	// check if user is admin of page
	page.isAdmin = function(userId, pageId) {
		return $http.get('/page/admin/' + pageId + '/' + userId);
	};

	// follow a page
	page.followPage = function(followPageData) {
		return $http.post('/page/follow', followPageData);
	};

	// unfollow a page
	page.unfollowPage = function(followPageData) {
		return $http.post('/page/unfollow', followPageData);
	};

	// check if following page
	page.followingCheck = function(pageId, userId) {
		return $http.get('/page/follow/' + pageId + '/' + userId);
	};

	// search for pages
	page.searchPages = function(query) {
		return $http.get('/page/search/' + query);
	};

	// create a post for a page
	page.createPost = function(postData) {
		return $http.post('/page/post/', postData);
	};

	// get the posts of a user
	page.getPosts = function(pageId) {
		return $http.get('/page/posts/' + pageId);
	};

	// get post
	page.getPost = function(postId) {
		return $http.get('/page/posts/' + pageId);
	};

	// get users photo
	page.getPhoto = function(pageId) {
		return $http.get('/page/photo/' + pageId, {responseType: 'arraybuffer'});
	};

	return page;

});