angular.module('prayerApp')

.controller('homeController', function(userFactory, bibleFactory, Auth, $timeout, $location) {


	var vm = this;
	vm.bool = false;
	$timeout(function() { vm.bool = true;});

	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		userFactory.userInfo(vm.userId).then(function(user) {
			vm.displayName = user.data.displayName;
		});
		userFactory.getUrgentRequests(vm.userId).then(function(data) {
			vm.urgentRequests = data.data.prayerRequest;
		});
		bibleFactory.getVerse().then(function(data) {
			vm.bible = data.data.passage;
			var book = data.data.book;
			var chapter = data.data.chapter.toString();
			var verse = data.data.verse.toString();
			var reference = book + " " + chapter + ":" + verse;
			vm.passage = reference;
		});
	});


});