'use strict';

var express = require('express');
var app = express();
var path = require('path');
var config = require('./config/config.js');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var busboyBodyParser = require('busboy-body-parser');


require('./app/database')

app.use('/', express.static('public'));


// maybe delete this later
var multipart = require('connect-multiparty');
app.use(multipart({
    uploadDir: config.tmp
}));


// ROUTES
var initRouter = require('./app/routes/init');
app.use('/init',initRouter);
var authRouter = require('./app/routes/auth');
app.use('/auth', authRouter);
var userRouter = require('./app/routes/user');
app.use('/user', userRouter);
var pagesRouter = require('./app/routes/page');
app.use('/page', pagesRouter);
var groupRouter = require('./app/routes/group');
app.use('/group', groupRouter);
var listRouter = require('./app/routes/list');
app.use('/list', listRouter);
var bibleRouter = require('./app/routes/chapter');
app.use('/bible', bibleRouter);
var uploadRouter = require('./app/routes/upload');
app.use('/upload', uploadRouter);


var users = [];
var userIds = [];

// SOCKET IO
// io.on('connection', function(socket){

//     // storing users into an array as an object
//     socket.on('userId',function(userId){
//     	if (userIds.indexOf(userId) < 0) {
// 		    users.push({socketId:socket.id, userId:userId});
// 		    userIds.push(userId);
// 		    var len = users.length;
// 		    len--;
// 		    io.emit('userEntered', users, users[len].socketId, users[len].userId); 
// 		}
//     });

//     // send message to specific user
//     socket.on('send msg',function(data_server){
//       socket.broadcast
//       		.to(data_server.receiverSocketId)
//       		.emit('get msg', {msg:data_server.msg, receiverSocketId:data_server.receiverSocketId, 
//       							senderId:data_server.senderId, senderSocketId:data_server.senderSocketId, 
//       							senderDisplayName:data_server.senderDisplayName});
//     });

//     // removing user when user leaves the chatroom
//     socket.on('disconnect', function(){
//       	for(var i=0;i<users.length;i++){
//         	if(users[i].socketId==socket.id){
//           		users.splice(i,1); // removing single user
//           		userIds.splice(i,1); // removing single user
//        	 	}
//       	}
//       	io.emit('exit', users); //sending list of users
//     });

// });

// the clients hash stores the sockets
// the users hash stores the username of the connected user and its socket.id
// io.sockets.on('connection', function (socket) {
//   // get the handshake and the session object
//   var hs = socket.handshake;
//   users[hs.session.username] = socket.id; // connected user with its socket.id
//   clients[socket.id] = socket; // add the client data to the hash
//   ...
//   socket.on('disconnect', function () {
//     delete clients[socket.id]; // remove the client from the array
//     delete users[hs.session.username]; // remove connected user & socket.id
//   });
// }

// we want at some point to send a message to user 'alex'
// if (users['alex']) {
//   // we get the socket.id for the user alex
//   // and with that we can sent him a message using his socket (stored in clients)
//   clients[users['alex']].emit("Hello Alex, how've you been");
// }


// maybe delete this later
app.use(busboyBodyParser());


app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/index.html'));
});

http.listen(process.env.PORT || 3000);
