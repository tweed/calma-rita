var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {
	console.log('User connected');
	// Start listening for mouse move events
	socket.on('mousemove', function (data) {

		// This line sends the event (broadcasts it)
		// to everyone except the originating client.
		socket.broadcast.emit('moving', data);
	});

	socket.on('drawing', function (data) {
		socket.broadcast.emit('repaint', data);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
