var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	db = require("mongojs").connect('highscoredb', ['highscores']);

app.use(express.static(__dirname + '/client'))
.use(express.json());

server.listen(8080);
console.log('SERVER UP AND RUNNING');

app.get('/highscores', function (req, res, next) {
	var scores = [];
	db.highscores.find().forEach(function(err, doc) {
		if(doc) {
		    // doc is a document in the collection
		    scores.push(doc)
		} else {
	        // we visited all docs in the collection
			res.json(scores);
	        return;
		}
	});
});

app.post('/newscore', function (req, res, next) {
	res.json(true);
});