var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.1.9/highscores');

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
		score: {type: Number, default: 0}
	});
	Score = mongoose.model('Score', scoreSchema);
});

app.get('/highscores', function (req, res, next) {
	Score.find().sort({score: -1}).limit(10).exec(
		function(err, scores) {
			if (err) console.log(err);
	  		res.json(scores);
	    }
	);
});

app.get('/scores', function (req, res, next) {
	Score.find(function(err, scores) {
		if (err) console.log(err);
  		res.json(scores);
	});
});

app.post('/newscore', function (req, res, next) {
	Score.create(req.body, function(err, score) {
		if (err) return console.log(err);
		console.log(score);
		res.json(true);
	});
});

app.post('/removescore', function (req, res, next) {
	Score.remove(req.body, function(err, score) {
		if (err) return console.log(err);
		res.json(true);
	});
});