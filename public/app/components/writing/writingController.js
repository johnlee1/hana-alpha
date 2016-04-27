 angular.module('prayerApp')

.controller('writingController', function(Auth, postFactory, $location) {

	var vm = this;
	vm.postData = {};
	vm.isPrivate = false;
	vm.postData.urgent = false;

	$('.ui.checkbox').checkbox();

	// get user id
	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
	});


	// submit a post
	vm.submitPost = function() {

		vm.postData.userId = vm.userId;
		vm.postData.isPublic = !vm.isPrivate; 

		postFactory.createPost(vm.postData)
			.success(function(data) {
				if (data.success == false) {
					vm.errorMessage = data.message;
				}
				else {
					$location.path('/user/');
				}
			});
	};

	// go back to profile page
	vm.goBack = function() {
		$location.path('/user/');
	};

});