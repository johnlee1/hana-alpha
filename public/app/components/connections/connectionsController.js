'use strict';

angular.module('prayerApp')

.controller('connectionsController', function(Auth, connectionsFactory) {

	var vm = this;

	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		callback();
	});


	function callback() {

		connectionsFactory.getConnections(vm.userId).then(function(data) {
			if (data.status == 202) {
				vm.msg = "You are currently not connected to anyone."
			}
			else {
				vm.connections = data.data.following;
			};
		})
	};

});