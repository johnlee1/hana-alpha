angular.module('prayerApp')

.controller('mapController', function(userFactory, Auth, $location, Upload, $http, NgMap) {


	// var vm = this;
 //    vm.markers = [];
	// vm.googleMapsUrl = 'AIzaSyAz6XLQljXy2WsYuMaltRTQizAJPRPljP0';
	// var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
 //    var labelIndex = 0;
 //    var array = [];

	// Auth.getUser().then(function(user){ 
	// 	vm.userId = user.data.id; 
	// });

	// NgMap.getMap().then(function(map) {

 //        $http.get('/user/getlocations/' + vm.userId).then(function(results) {
 //        	array = results.data.locations;
	//         for(var i = 0; i < array.length; i++) {
	//             var am = array[i].cor;
	//             //var markerAdd = {lat: am.postLatitude, lng: am.postLongitude};
 //                //var markerAdd = new google.maps.LatLng(am.postLatitude, am.postLongitude);
 //                var markerAdd = [am.postLatitude, am.postLongitude];
	//             addMarker(markerAdd, map, array[i].post);
	//         }
 //        });
 //  	});

 //  	function addMarker(location, map, post) {

 //        // var marker = new google.maps.Marker({
 //        //     position: location,
 //        //     label: labels[labelIndex++ % labels.length],
 //        //     //map: map,
 //        //     title: summary
 //        // });

 //        var marker = {
 //            position: location,
 //            label: labels[labelIndex++ % labels.length],
 //            //map: map,
 //            id: post._id
 //        };
 //        vm.markers.push(marker);
 //      }


 //    vm.showPost = function(event) {
 //        var postId = this.id
 //        for(var i = 0; i < array.length; i++) {
 //            if (array[i].post._id == postId) {
 //                vm.currentPost = array[i].post;
 //            }
 //        }
 //    }

});