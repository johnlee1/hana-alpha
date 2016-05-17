'use strict';

angular.module('prayerApp')

.controller('groupsController', function(groupsFactory, Auth, $location) {

	var vm = this;

	// get user so that can get pages associated with the user
	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		getGroups();
	});

	// get pages associated with user
	function getGroups() {
		groupsFactory.getGroups(vm.userId).then(function(groups){
			vm.groups = groups.data;
		});
	};

	// create a page 
	vm.createGroup = function() {

		var data = {groupName: vm.groupName, groupDescription: vm.groupDescription, userId: vm.userId};

		groupsFactory.createGroup(data)
			.success(function(data) {

				// if a user successfully logs in, redirect to user page
				$location.path('/groups');
			});
	};

	// go to groups page
	vm.goBack = function() {
		$location.path('/groups/');
	};

});