// /js/services/dataPersistence

var app = angular.module('appController',[])

	.factory('dataPersistence', function($http){

	return{
		get : function($http){
			$http.get('json/index.json')
   				.success(function(result) {
   					return result;

   				})
   				.error(function(data) {
                	        console.log('Error: ' + data);
            	});
		}
	}	
});