'use strict';

angular.module('prayerApp', ['routerRoutes', 'ngFileUpload', 'ngImgCrop', 'ngAnimate'])

.controller('mainController', function() {

	// bind this to vm (view-model)
	var vm = this;

})


// application configuration to integrate token into requests
.config(function($httpProvider) {

	// attach our auth interceptor to the http requests
  	$httpProvider.interceptors.push('AuthInterceptor');
})


// .factory('mySocket', function(socketFactory) {
//   	return socketFactory();
// })


.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {

        $rootScope.$on('$routeChangeStart', function (event) {

        if (!Auth.isLoggedIn()) {
          //event.preventDefault();
          $location.path('/login');
        }
        else {
        }
  });
}])