'use strict';

angular.module('prayerApp')

.controller('listsController', function($scope, Auth, listsFactory) {

	var vm = this;

	vm.showModal = function() {
		$('.ui.modal')
			.modal('setting', 'closable', false)
			.modal('show');
	};

	// get user so that can get lists associated with the user
	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		getLists();
	});

	// get lists associated with user
	function getLists() {
		listsFactory.getLists(vm.userId).then(function(lists){
			vm.lists = lists.data;
		});
	};

	// create a list
	vm.createList = function() {

		vm.listData.userId = vm.userId;

		listsFactory.createList(vm.listData)
			.success(function(data) {

				console.log(data);

				// if a user successfully logs in, redirect to user page
				$location.path('/lists');
			});
	};

});