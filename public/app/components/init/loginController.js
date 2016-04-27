angular.module('prayerApp')

.controller('loginController', function(userFactory, Auth, AuthToken, $timeout, $location, mySocket) {

	mySocket.disconnect();

	Auth.logout();

	var vm = this;
	vm.bool = false;
	vm.bool2 = false;
	$timeout(function() { 
		vm.bool = true;
		vm.bool2 = true;
	});
	vm.loginPage = true;
	vm.onFirstPage = true;
	vm.onSecondPage = false;
	vm.onThirdPage = false;

	$('.ui.form.registrationForm')
	  .form({
	  	fields: {
	      username: {
	        identifier: 'username',
	        rules: [
	          {
	            type   : 'empty',
	            prompt : 'Please enter a username'
	          }
	        ]
	      },
	      password: {
	        identifier: 'password',
	        rules: [
	          {
	            type   : 'empty',
	            prompt : 'Please enter a password'
	          }
	        ]
	      },
	      confirmPassword: {
	        identifier: 'confirmPassword',
	        rules: [
	          {
	            type   : 'empty',
	            prompt : 'Please confirm your password'
	          },
	          {
	            type   : 'match[password]',
	            prompt : 'Your passwords do not match'
	          }
	        ]
	      }
	    }
	  })
	;


	vm.registerUser = function() {

		// use the createUser function in the userService
		userFactory.createUser(vm.userData)
			.success(function(data) {

				if (data.success == false) {
					vm.bool = false;
					vm.unsuccessfulRegister = data.message;
					vm.unsuccessfulRegister2 = "Please try again.";
					$timeout(function() { vm.bool = true;}, 1000);
				}

				else {
					AuthToken.setToken(data.token);

					// if a user successfully logs in, redirect to user page
					$location.path('/user');
				}
			});
	};


	// function to handle login form
	vm.loginUser = function() {

		if (vm.loginData != null) {
			Auth.login(vm.loginData.username, vm.loginData.password)
				.success(function(data) {

					if (data.success == false) {
						vm.bool = false
						vm.unsuccessfulLogin = data.message;
						vm.unsuccessfulLogin2 = "Please try again.";
						$timeout(function() { vm.bool = true;}, 1000);
					}

					else {

						Auth.getUser().then(function(user){ 

							userFactory.setId(user.data.id); 

							// if a user successfully logs in, redirect to user page
							$location.path('/user/')
						});
					}
				});	
		}
		else {
			vm.bool = false
			vm.unsuccessfulLogin = "Your login information is incorrect.";
			$timeout(function() { vm.bool = true;}, 1000);
		}
	};

	vm.firstPage = function() {
		if (vm.onFirstPage) {}
		else {
			vm.bool2 = false
			vm.onFirstPage = true;
			vm.onSecondPage = false;
			vm.onThirdPage = false;
			$timeout(function() {vm.bool2 = true;}, 1000);
		}
	}

	vm.secondPage = function() {
		if (vm.onSecondPage) {}
		else {
			vm.bool2 = false
			vm.onFirstPage = false;
			vm.onSecondPage = true;
			vm.onThirdPage = false;
			$timeout(function() {vm.bool2 = true;}, 1000);
		}
	}

	vm.thirdPage = function() {
		if (vm.onThirdPage) {}
		else {
			vm.bool2 = false
			vm.onFirstPage = false;
			vm.onSecondPage = false;
			vm.onThirdPage = true;
			$timeout(function() {vm.bool2 = true;}, 1000);
		}
	}

	vm.goToLogin = function() {
		vm.bool = false
		vm.loginPage = true;
		$timeout(function() { vm.bool = true;}, 1000);
	}

	vm.goToRegistration = function() {
		vm.bool = false
		vm.loginPage = false;
		$timeout(function() { vm.bool = true;}, 1000);
	}

});