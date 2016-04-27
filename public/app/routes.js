 angular.module('routerRoutes', ['ngRoute'])

.config(function($routeProvider,$locationProvider) {
	$routeProvider

		.when ('/', {
			templateUrl : 'app/components/init/login.html',
			controller : 'loginController',
			controllerAs : 'loginController'
		})

		.when ('/login', {
			templateUrl : 'app/components/init/login.html',
			controller : 'loginController',
			controllerAs : 'loginController'
		})

		.when ('/register', {
			templateUrl : 'app/components/init/register.html',
			controller : 'registerController',
			controllerAs : 'registerController'
		})

		.when ('/home', {
			templateUrl : 'app/components/home/home.html',
			controller : 'homeController',
			controllerAs : 'homeController'
		})

		.when ('/user', {
			templateUrl : 'app/components/user/user.html',
			controller : 'userController',
			controllerAs : 'userController'
		})

		.when ('/user/:userId', {
			templateUrl : 'app/components/profile/profile.html',
			controller : 'profileController',
			controllerAs : 'profileController'
		})

		.when ('/connections', {
			templateUrl : 'app/components/connections/connections.html',
			controller : 'connectionsController',
			controllerAs : 'connectionsController'
		})

		.when ('/groups', {
			templateUrl : 'app/components/groups/groups.html',
			controller : 'groupsController',
			controllerAs : 'groupsController'
		})

		.when ('/group/:groupId', {
			templateUrl : 'app/components/groups/viewGroup.html',
			controller : 'groupController',
			controllerAs : 'groupController'
		})

		.when ('/pages', {
			templateUrl : 'app/components/pages/pages.html',
			controller : 'pagesController',
			controllerAs : 'pagesController'
		})

		.when ('/page/:pageId', {
			templateUrl : 'app/components/pages/viewPage.html',
			controller : 'pageController',
			controllerAs : 'pageController'
		})

		.when ('/lists', {
			templateUrl : 'app/components/lists/lists.html',
			controller : 'listsController',
			controllerAs : 'listsController'
		})

		.when ('/explore', {
			templateUrl : 'app/components/explore/explore.html',
			controller : 'exploreController',
			controllerAs : 'exploreController'
		})

		.when ('/chat', {
			templateUrl : 'app/components/chat/chat.html',
			controller : 'chatController',
			controllerAs : 'chatController'
		})

		.when ('/settings', {
			templateUrl : 'app/components/settings/settings.html',
			controller : 'settingsController',
			controllerAs : 'settingsController'
		})

		.when ('/pageSettings/:pageId', {
			templateUrl : 'app/components/settings/pageSettings.html',
			controller : 'pageSettingsController',
			controllerAs : 'pageSettingsController'
		})

		.when ('/notifications', {
			templateUrl : 'app/components/notifications/notifications.html',
			controller : 'notificationsController',
			controllerAs : 'notificationsController'
		})

		.when ('/write', {
			templateUrl : 'app/components/writing/writing.html',
			controller : 'writingController',
			controllerAs : 'writingController'
		})

		.when ('/writePagePost/:pageId', {
			templateUrl : 'app/components/writing/writePagePost.html',
			controller : 'writingPageController',
			controllerAs : 'writingPageController'
		})

		.when ('/createPage/', {
			templateUrl : 'app/components/pages/createPage.html',
			controller : 'pagesController',
			controllerAs : 'pagesController'
		})

		.when ('/map/', {
			templateUrl : 'app/components/map/map.html',
			controller : 'mapController',
			controllerAs : 'mapController'
		})

	// set app up to have pretty URLS
	$locationProvider.html5Mode(true);
})