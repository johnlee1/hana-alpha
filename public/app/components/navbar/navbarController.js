'use strict';

angular.module('prayerApp')

.controller('navbarController', function($scope, Auth) {

	var vm = this;

	// vm.updateJavascript = function() {
	// 	$('.ui.accordion').accordion(); 
	// };

	// $scope.$on('$includeContentLoaded', function() {
	// 	$('.ui.accordion').accordion(); 
 //  	});

 //  	$scope.alertMe=function(){
	// 	$('.ui.accordion').accordion(); 
 //  	}

  	$scope.init = function() {
		$('.ui.accordion').accordion(); 
	};

		// function to handle login form
	vm.logoutUser = function() {

		Auth.logout(vm.loginData.username, vm.loginData.password)
			.success(function(data) {

				$location.path('/login/')
			});
	};



});