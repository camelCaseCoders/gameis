angular.module('app', [])
.controller('ctrl', function($scope, $http) {
	$scope.scores = [];
	$scope.getScores = function() {
		$http.get('/scores')
		.success(function(data, status, headers, config) {
			$scope.scores = data;
		})
	}
	$scope.getScores();
	$scope.getHighScores = function() {
		$http.get('/highscores')
		.success(function(data, status, headers, config) {
			$scope.scores = data;
		});
	}
	$scope.postScore = function() {
		data = {name: $scope.addName, score: $scope.addScore};
		$http.post('/newscore', data);
	}
	$scope.removeScore = function() {
		data = {name: $scope.removeName};
		$http.post('/removescore', data);
	}
});