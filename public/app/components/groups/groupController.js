'use strict';

angular.module('prayerApp')

.controller('groupController', function(groupsFactory, Auth, $location, $routeParams) {

	var vm = this;

	vm.showModal = function() {
		$('.ui.modal').modal('show');
	};

	// get user so that can get pages associated with the user
	Auth.getUser().then(function(user){ 
		vm.userId = user.data._id; 
		// callback();
	});


	// get specific group info
	var groupId = $routeParams.groupId;
	groupsFactory.getInfo(groupId).then(function(group){
		vm.group = group.data;
	});

});