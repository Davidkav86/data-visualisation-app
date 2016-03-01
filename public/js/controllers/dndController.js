//public/js/controllers/dndController.js

angular.module('dragController', [])

	.controller('dndController', function($scope, $http){
		$scope.chap = "Come on1111"
		$scope.test = "bghgj"

		$scope.handleDragStart = function(e) {
  			this.style.opacity = '0.1';  // this / e.target is the source node.
		}
	});