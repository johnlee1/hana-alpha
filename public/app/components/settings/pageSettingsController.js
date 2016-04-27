angular.module('prayerApp')

.controller('pageSettingsController', function(userFactory, pagesFactory, Auth, $location, Upload, $routeParams) {

	$('.menu .item')
  		.tab()
	;

	var vm = this;
	vm.pageId = $routeParams.pageId;


	// get specific page info
	pagesFactory.getInfo(vm.pageId).then(function(page){
		vm.pageName = page.data.page.pageName;
		vm.pageDescription = page.data.page.pageDescription;
	});


	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
	});


	// get page photo
	pagesFactory.getPhoto(vm.pageId).then(function(photo){ 
		if (photo.status == 200) {
        	var imageBlob = new Blob([photo.data], { type: photo.headers('Content-Type') });
			var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
			vm.imgSrc = imageUrl; 
		}
		else {
			vm.imgSrc = "https://u.o0bc.com/avatars/no-user-image.gif";
		};
	});


	vm.submitPageEdit = function() {

		var data = {pageName: vm.pageName, pageDescription: vm.pageDescription};

		pagesFactory.updatePage(vm.pageId, data)
			.success(function(page) {
				$location.path('/page/' + vm.pageId);
			});
	};


	// for image upload
	vm.upload = function(dataUrl, name) {

		Upload.upload({
            url: '/page/photo',
            data: {
            	pageId: vm.pageId,
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function(photo) {
			var imageBlob = photo.config.data.file;
			vm.imgSrc = (window.URL || window.webkitURL).createObjectURL(imageBlob);
			$location.path('/page/' + vm.pageId);
        })
    };

    // go back to page
	vm.goBack = function() {
		$location.path('/page/' + vm.pageId);
	};

});