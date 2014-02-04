var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	db = require("mongojs").connect(databaseUrl, collections);

app.use(express.static(__dirname + '/client'))
.use(express.json());

server.listen(8080);
console.log('SERVER UP AND RUNNING');

var highscores = [];

app.get('/highscores', function (req, res, next) {
	res.json(highscores);
	highscores.push(Math.floor(Math.random() * 100));
});

app.post('/newscore', function (req, res, next) {
	highscores.add(req.body);
	res.json(true);
});