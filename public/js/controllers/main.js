// js/controllers/main.js
    
var app = angular.module('appController', []);

	app.controller('controller', function($scope, $http, $q, $route, $window, API, mysqlAPI){

        // retrieve the data that is used to load the page 		
    	var render = API.get();
    	render.then(function(result) {  

       				// this is only run after get() resolves
       				// $scope.data = result;
       				// console.log("Promise eg: " + $scope.data.rowCount);
       				// test to ensure function works
       				// $scope.count = $scope.data.rowCount;
       				// pass the rows into elements var
       			$scope.elements = result;
       			// console.log("Rows: ", result);
    	});

    	$scope.deleteColumn = function(id){
    		API.delete(id);
    		$window.location.reload();
    	}

		$scope.addRow = function(){
			var row = {columns : 1, charts: ["area-chart"]};
			API.create(row)
			$window.location.reload();
		} 

		$scope.content = []; 
		

        $scope.doSomething = function(){
      		$scope.message = "Clicked!";
    	};

    	$scope.reload = function(){
    		console.log("RELOAD")
    		$window.location.reload();
    	}
    });

    // Factory to manipulate the json file that stores the data that populates the page
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
            			.success(function(data) {r
            			})
            			.error(function(data) {
                			console.log('Error: ' + data);
            			});
			},
			delete : function(id) {
				return $http.delete('/api/columns/' + id)
                        .success(function(data) {
                              console.log("Row " + id + " successfully deleted.")  
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
			}		
		}
	})

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

