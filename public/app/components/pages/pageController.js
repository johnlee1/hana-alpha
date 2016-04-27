'use strict';

angular.module('prayerApp')

.controller('pageController', function(userFactory, pagesFactory, Auth, $location, $routeParams, Upload) {

	var vm = this;

	vm.editing = false;
	vm.posts = [];
	vm.userId = userFactory.getId();
	vm.displayName = "";
	vm.pageId = $routeParams.pageId;
	vm.postData = {};
	vm.editingName = false;
	vm.editingDescription = false;
	getPosts();

	$('.menu .item').tab();


	// get user so that can get pages associated with the user
	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		userFactory.userInfo(vm.userId).then(function(user) {
			vm.displayName = user.data.displayName;
		});
		pagesFactory.isAdmin(vm.userId, $routeParams.pageId).then(function(isAdmin){
			vm.isAdmin = isAdmin.data.admin;
		});
	});


	// get specific page info
	pagesFactory.getInfo(vm.pageId).then(function(page){
		vm.page = page.data.page;
		getPosts();
		isFollowing();
	});


	// get page photo
	pagesFactory.getPhoto(vm.pageId).then(function(photo){ 
		if (photo.status == 200) {
        	var imageBlob = new Blob([photo.data], { type: photo.headers('Content-Type') });
			var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
			vm.imgSrc = imageUrl; 
		}
		else {
			vm.imgSrc = "https://u.o0bc.com/avatars/no-user-image.gif";
		};
	});


	vm.submitPageEdit = function() {

		pagesFactory.updatePage(vm.pageId, vm.pageEditData)
			.success(function(page) {
				if (page.pageName) {
					vm.page.pageName = page.pageName;
				};
				if (page.pageDescription) {
					vm.page.pageDescription = page.pageDescription;
				};
			});

	};


	// get posts associated with a page
	function getPosts() {
		pagesFactory.getPosts(vm.pageId).then(function(posts){
			vm.posts = posts.data.posts;
		});
	};


	// check if user is following the page
	function isFollowing() {
		pagesFactory.followingCheck(vm.pageId, vm.userId).then(function(result) {
			vm.isFollowing = result.data.following;
		});
	};


	// vm.submitPost = function() {

	// 	vm.postData.userId = vm.userId;
	// 	vm.postData.pageId = vm.pageId;

	// 	// use the createUser function in the userService
	// 	pagesFactory.createPost(vm.postData)
	// 		.success(function(data) {

	// 			vm.postData = [];

	// 			console.log(data.post.post);

	// 			var post = {post: data.post.post, displayName: vm.displayName};

	// 			vm.posts.unshift(post);

	// 			console.log(vm.posts);

	// 			// $location.path('/page/' + vm.pageId);
	// 		});
	// };


	vm.followPage = function() {
		console.log('pleaseee');
		vm.followPageData = {};
		vm.followPageData.pageId = vm.pageId;
		vm.followPageData.userId = vm.userId;
		pagesFactory.followPage(vm.followPageData).then(function(result) {
			isFollowing();
			console.log('yeayea');
		});
	};


	vm.unfollowPage = function() {
		console.log('going to unfollow');
		vm.followPageData = {};
		vm.followPageData.pageId = vm.pageId;
		vm.followPageData.userId = vm.userId;
		pagesFactory.unfollowPage(vm.followPageData).then(function(result) {
			isFollowing();
			console.log('yea yea');
		});
	};


	// for image upload
	vm.upload = function(dataUrl, name) {

		Upload.upload({
            url: '/page/photo',
            data: {
            	pageId: vm.pageId,
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function(photo) {
			var imageBlob = photo.config.data.file;
			vm.imgSrc = (window.URL || window.webkitURL).createObjectURL(imageBlob);
        })
    }

});