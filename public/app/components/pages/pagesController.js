'use strict';

angular.module('prayerApp')

.controller('pagesController', function(userFactory, pagesFactory, Auth, $timeout, $location) {

	var vm = this;
	vm.userId = userFactory.getId();
	vm.bool = false;
	$timeout(function() { vm.bool = true;});

	// get user so that can get pages associated with the user
	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		getPages();
	});

	vm.createPageName = '';
	vm.createPageDescription = '';


	// get pages associated with user
	function getPages() {
		pagesFactory.getPages(vm.userId).then(function(pages){
			if (pages.data.admin.length + pages.data.member.length > 1) {
				vm.moreThanOnePage = true;
			}
			else {
				vm.moreThanOnePage = false;
			}
			vm.adminPages = pages.data.admin;
			vm.memberPages = pages.data.member;
		});
	};

	// create a page 
	vm.createPage = function() {

		var data = {pageName: vm.createPageName, pageDescription: vm.createPageDescription, userId: vm.userId};

		pagesFactory.createPage(data)
			.success(function(data) {

				if (!data.success) {
					vm.errorMessage = data.message;
				}
				else {
					vm.adminPages.unshift(data.page);
					$location.path('/pages');
				}
			});
	};

	vm.getImgSrc = function(pageId) {
		pagesFactory.getPhoto(vm.pageId).then(function(photo){ 
	        var imageBlob = new Blob([photo.data], { type: photo.headers('Content-Type') });
			var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
			return imageUrl; 
		});
	};

	vm.goBack = function() {
		$location.path('/pages/');
	};

});