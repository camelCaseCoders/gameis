var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/highscores');

app.use(express.static(__dirname + '/client'))
.use(express.json());

server.listen(8080);
console.log('SERVER UP AND RUNNING');


var Schema = mongoose.Schema,
	Score;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	var scoreSchema = new Schema({
		name: {type: String, default: 'Anonymous'},
		score: {type: Number}
	});
	Score = mongoose.model('Score', scoreSchema);
});

app.get('/highscores', function (req, res, next) {
	Score.find(function (err, scores) {
	  	if (err) console.log(err);
	  	res.json(scores);
	})
});

app.get('/newscore', function (req, res, next) {
	Score.create({name: 'John', score: Math.floor(Math.random * 100)}, function(err, score) {
		if (err) return console.log(err);
		console.log(score);
	});
});