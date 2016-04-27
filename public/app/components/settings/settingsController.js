angular.module('prayerApp')

.controller('settingsController', function(userFactory, Auth, $location, Upload, $http) {

	$('.menu .item')
  		.tab()
	;

	var vm = this;

	Auth.getUser().then(function(user){ 
		vm.userId = user.data.id; 
		callback();
	});


	function callback() {

		// get user info
		userFactory.userInfo(vm.userId).then(function(user){
			if (user.data.displayName) {
				vm.displayName = user.data.displayName;
			}
			if (user.data.description) {
				vm.description = user.data.description;
			};
		});

		// get user photo
		userFactory.getPhoto(vm.userId).then(function(photo){ 
            var imageBlob = new Blob([photo.data], { type: photo.headers('Content-Type') });
			var imageUrl = (window.URL || window.webkitURL).createObjectURL(imageBlob);
			vm.imgSrc = imageUrl; 
		});
	};


	vm.submitUserEdit = function() {

		var data = {displayName: vm.displayName, description: vm.description};

		userFactory.updateUser(vm.userId, data)
			.success(function(user) {
				$location.path('/user/');
			});
	};


	// for image upload
	vm.upload = function(dataUrl, file, name) {

		// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
		// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
		// var S3_BUCKET = process.env.S3_BUCKET;

		// var AWS_ACCESS_KEY = 'AKIAIKBWCW37Z7Z73XMA';
		// var AWS_SECRET_KEY = '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';
		// //var AWS_ACCESS_KEY = 'AKIAJ5EQSRZWQWJ54IBA';
		// //var AWS_SECRET_KEY = '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';
		// var S3_BUCKET = 'goredsox';

		// var s3Credentials = $http.get('/upload/credentials/' + name).then(function(s3Credentials) {

		// 	console.log(s3Credentials);

		// 	console.log(file);
		// 	console.log(Upload.dataUrltoBlob(dataUrl, name));

	 //    	var policy = s3Credentials.data.credentials.s3Policy;
	 //    	var signature = s3Credentials.data.credentials.s3Signature;

		// 	Upload.upload({
		// 	    url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+name, //S3 upload url including bucket name
		// 	    method: 'PUT',
		// 	    headers: { 'x-amz-acl': 'bucket-owner-full-control' },
		// 	    data: {
		// 	    	headers: { 'x-amz-acl': 'bucket-owner-full-control' },
		// 	        key: name, // the key to store the file on S3
		// 	        AWSAccessKeyId: AWS_ACCESS_KEY,
		// 	        acl: 'public-read', // sets the access to the uploaded file in the bucket: private, public-read, ...
		// 	        policy: policy, // base64-encoded json policy 
		// 	        signature: signature, // base64-encoded signature based on policy string 
		// 	        "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
		// 	        filename: name, // this is needed for Flash polyfill IE8-9
		// 	        file: file
		// 	    }
		// 	}).then(function(photo) {
		// 		console.log('go');
		// 		var imageBlob = photo.config.data.file;
		// 		// Upload.upload({
		// 		//     url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+name, //S3 upload url including bucket name
		// 		//     method: 'PUT',
		// 		//     headers: { 'x-amz-acl': 'bucket-owner-full-control' },
		// 		//     data: {
		// 		//     	headers: { 'x-amz-acl': 'bucket-owner-full-control' },
		// 		//         key: name, // the key to store the file on S3
		// 		//         AWSAccessKeyId: AWS_ACCESS_KEY,
		// 		//         acl: 'public-read', // sets the access to the uploaded file in the bucket: private, public-read, ...
		// 		//         policy: policy, // base64-encoded json policy 
		// 		//         signature: signature, // base64-encoded signature based on policy string 
		// 		//         "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
		// 		//         filename: name, // this is needed for Flash polyfill IE8-9
		// 		//         file: imageBlob
		// 	 //    }});
		// 		vm.imgSrc = (window.URL || window.webkitURL).createObjectURL(imageBlob);
		// 		$location.path('/user/');
	 //        })

  //       });

		Upload.upload({
            url: '/user/photo',
            data: {
            	userId: vm.userId,
                file: Upload.dataUrltoBlob(dataUrl, name)
            },
        }).then(function(photo) {
			var imageBlob = photo.config.data.file;
			vm.imgSrc = (window.URL || window.webkitURL).createObjectURL(imageBlob);
			$location.path('/user/');
        })
    };


    // go back to page
	vm.goBack = function() {
		$location.path('/user/');
	};

});