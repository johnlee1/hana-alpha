'use strict';

angular.module('prayerApp')

.controller('exploreController', function(userFactory, pagesFactory, Auth) {

	var vm = this;

	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
	});

	vm.selectedType = "users";

	vm.query = function() {

		vm.message = '';

		if (vm.selectedType == "users") {
			userFactory.searchUsers(vm.querySearch,vm.userId).then(function(users){
				vm.pageResults=[];
				vm.userResults=users.data.users;
				if (vm.userResults.length == 0) {
					vm.message = "No users found.";
				}
			});
		}
		if (vm.selectedType == "pages") {
			pagesFactory.searchPages(vm.querySearch,vm.userId).then(function(pages){
				vm.userResults=[];
				vm.pageResults=pages.data.pages;
				if (vm.pageResults.length == 0) {
					vm.message = "No pages found.";
				}
			});
		}
	};

});