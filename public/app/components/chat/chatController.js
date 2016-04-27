angular.module('prayerApp')

.controller('chatController', function(userFactory, connectionsFactory, Auth, $location, mySocket) {

	// var vm = this;

	// vm.messages = [];
	// vm.msg = '';
 //    vm.onlineUser = '';
 //    vm.onlineUserId = '';
 //    vm.onlineUserSocketId = '';
 //    vm.mySocketId = '';
 //    vm.onlineUsers = [];
 //    vm.onlineUsersIds = [];

 //    Auth.getUser().then(function(user){ 
 //        vm.userId = user.data.id; 
 //        userFactory.userInfo(vm.userId).then(function(data) {
 //            vm.user = data;
 //            callback();
 //        })
 //    });

	// mySocket.connect();

 //    function callback() {

 //        // send username to server
 //        mySocket.emit('userId', vm.userId); 

 //        // get all connections
 //        connectionsFactory.getConnections(vm.userId).then(function(data) {
 //            vm.connections = data.data.users;
 //        });

 //        // get ids of all connections
 //        connectionsFactory.getConnectionsIds(vm.userId).then(function(data) {
 //            vm.connectionsIds = data.data;
 //        });
 //    }


 //    mySocket.on('userEntered', function(users, socket_id, user_id) {

 //        // set own socket
 //        if (vm.userId == user_id) {
 //            vm.mySocketId = socket_id;
 //        }

 //        // add new users to chat display
 //        for (user in users) {
 //            var friend = users[user];
 //            if (friend.userId != vm.userId && vm.onlineUsersIds.indexOf(friend.userId) < 0) {
 //                vm.onlineUsersIds.push(friend.userId);
 //                userFactory.userInfo(friend.userId).then(function(data) {
 //                    var finalUser = {socketId: friend.socketId, user: data.data};
 //                    vm.onlineUsers.push(finalUser);                        
 //                });
 //            }
 //        }        
 //    });     


 //    vm.setCurrent = function(user) {
 //        if (user.user._id != vm.onlineUserId) {
 //            vm.onlineUser = user.user.displayName;
 //            vm.onlineUserId = user.user._id;
 //            vm.onlineUserSocketId = user.socketId;
 //            vm.messages = [];
 //        }
 //    }


	// vm.sendMessage = function(msg){
 //        if (msg != null && msg != '' && vm.onlineUserId != '') {
 //            var data_server = {
 //                receiverSocketId: vm.onlineUserSocketId,
 //                msg: msg,
 //                senderId: vm.userId,
 //                senderSocketId: vm.mySocketId,
 //                senderDisplayName: vm.user.data.displayName,
 //            };
 //            mySocket.emit('send msg', data_server)
 //            vm.messages.push({author:vm.user.data.displayName , message:msg, self:true});
 //            vm.msg = '';
 //        }
 //    }


 //    mySocket.on('get msg', function(data) {
 //        console.log('msg received');
 //        vm.messages.push({author:data.senderDisplayName, message:data.msg, self:false});
 //        vm.onlineUserId = data.senderId;
 //        vm.onlineUser = data.senderDisplayName;
 //        vm.onlineUserSocketId = data.senderSocketId;
 //    });


 //    // on exit update list of users
 //    mySocket.on('exit',function(data){
 //        console.log('got to do this'); 
 //    });

});