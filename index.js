var express = require('express')
	, app = express()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/client'));

server.listen(8080);
console.log('SERVER UP AND RUNNING');