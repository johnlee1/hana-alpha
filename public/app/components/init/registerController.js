angular.module('prayerApp')

.controller('registerController', function(userFactory, AuthToken, $timeout, $location) {


	var vm = this;
	vm.bool = false;
	$timeout(function() { vm.bool = true;});

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
					vm.bool = false
					vm.unsuccessfulRegister = "Unable to register. Please try again.";
					$timeout(function() { vm.bool = true;}, 1000);
				}

				else {
					AuthToken.setToken(data.token);

					// if a user successfully logs in, redirect to user page
					$location.path('/user');
				}
			});
	};

});