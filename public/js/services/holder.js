var app = angular.module('appController', []);

app.factory('holder', function(){
		var list = [];
		return {
		 	add : function(elements) {
					list = elements; 
					console.log("List", list )
				},
			get : function() {
				return list;
			}		
		}
	})