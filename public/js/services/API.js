
var app = angular.module('appController', []);

	app.factory('API', function($http, $route, $window){
		return {
		 	get : function() {
					return $http.get('/api/columns')
   								.then(function(response) {
   									return response.data;
   								})
				},
			create : function(column) {
					return $http.post('/api/columns', column)
            			.success(function(data) {
            					$window.location.reload()
            			})
            			.error(function(data) {
                			console.log('Error: ' + data);
            			});
			},
			delete : function(id) {
				return $http.delete('/api/columns/' + id)
                        .success(function(data) { 
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
			}		
		}
	})