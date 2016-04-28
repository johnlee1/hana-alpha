 angular.module('prayerApp')

.controller('userController', function(userFactory, postFactory, Auth, $location, $scope, Upload, $timeout) {

	var vm = this;
	//vm.editing = false;

	$('.menu .item').tab();
	// $('.ui.accordion').accordion();


	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		callback();
	});


	function callback() {

		// get posts
		postFactory.getAllPosts(vm.userId).then(function(posts){
			vm.posts = posts.data.posts;
		}); 

		// get user info
		userFactory.userInfo(vm.userId).then(function(user){
			if (user.data.displayName) {
				vm.displayName = user.data.displayName;
			}
			if (user.data.description) {
				vm.description = user.data.description;
			};
			if (user.data.photo != null) {
				// get user photo
				// userFactory.getPhoto(vm.userId).then(function(photo){ 
		  //           var imageBlob = new Blob([photo.data], { type: photo.headers('Content-Type') });
				// 	var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
				// 	vm.imgSrc = imageUrl; 
				// });
			}
		});
	};


	vm.submitPost = function() {

		vm.postData.userId = vm.userId;

		// use the createUser function in the userService
		postFactory.createPost(vm.postData)
			.success(function(data) {
				vm.postData = {};
				vm.posts.unshift(data.post)
			});
	};


	vm.submitUserEdit = function() {

		userFactory.updateUser(vm.userId, vm.userEditData)
			.success(function(user) {
				vm.displayName = user.user.displayName;
				vm.description = user.user.description;
			});
	};


	// for image upload
	vm.upload = function(dataUrl, name) {

		Upload.upload({
            url: '/user/photo',
            data: {
            	userId: vm.userId,
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function(photo) {
			var imageBlob = photo.config.data.file;
			vm.imgSrc = (window.URL || window.webkitURL).createObjectURL(imageBlob);
        })
    }


});