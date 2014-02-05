angular.module('app', [])
.controller('ctrl', function($scope, $http) {
	$scope.scores = [];
	$scope.getScores = function() {
		$http.get('/scores')
		.success(function(data, status, headers, config) {
			$scope.scores = data;
		})
	}
	$scope.getHighScores = function() {
		$http.get('/highscores')
		.success(function(data, status, headers, config) {
			$scope.scores = data;
		});
	}
	$scope.postScore = function() {
		data = {name: $scope.name, score: $scope.score}
		$http.post('/newscore', data);
	}
});