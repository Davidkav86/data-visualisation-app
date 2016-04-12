var app = angular.module('appController', []);

app.factory('counter', function(){
		var counter = 0;
		return {
		 	get : function() {
					return counter 
				},
			add : function() {
				counter += 1;
			}		
		}
	})