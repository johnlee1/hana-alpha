 angular.module('prayerApp')

.controller('writingPageController', function(Auth, postFactory, pagesFactory, $location, $routeParams) {

	var vm = this;
	vm.pageId = $routeParams.pageId;


	// get user id
	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
	});


	// submit a post
	vm.submitPost = function() {

		var data = {postTitle: vm.postTitle,
					postContent: vm.postContent, 
					postSummary: vm.postSummary, 
					userId: vm.userId, 
					pageId: vm.pageId} 

		pagesFactory.createPost(data)
			.success(function(data) {
				if (data.success == false) {
					vm.errorMessage = data.message;
				}
				else {
					$location.path('/page/' + vm.pageId);
				}
			});
	};


	// go back to page
	vm.goBack = function() {
		$location.path('/page/' + vm.pageId);
	};

});