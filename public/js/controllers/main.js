// js/controllers/main.js
    
var app = angular.module('appController', []);

	app.controller('controller', function($scope, $http, $q, jsonAPI){
		

        	// retrieve the data that is used to load the page 		
    		var myDataPromise = jsonAPI.get();
    		console.log("Outside")
    		myDataPromise.then(function(result) {  

       				// this is only run after get() resolves
       				$scope.data = result;
       				console.log("Promise eg: " + $scope.data.rowCount);
       				// test to ensure function works
       				$scope.count = $scope.data.rowCount;
       				// pass the rows into elements var
       				$scope.elements = result.rows;
       				console.log("Elements instantiated with json ");
    			});


		$scope.button1 = function(){
			
			$scope.count = $scope.data.rows[0].id;
		}

		$scope.content = []; 
		

        $scope.doSomething = function(){
      		$scope.message = "Clicked!";
    	};
    });

		// $http.get('json/index.json')
  //  			.success(function(result) {
  //  				// $scope.t1000 = data.index.rowCount;
  //  				// index = data;
  //  				//setUp(data);
  //  				file = result;
  //  				$scope.content = result.data;
  //  				// $scope.data = data;
  //  				// console.log("Data === " + file.index.rowCount)
  //  				// $scope.content = data.index.rows;

  //  				// $element.html(setUp(file)).show();

  //      //          $compile($element.contents())($scope);

  //  			})
  //  			.error(function(data) {
  //                       console.log('Error: ' + data);
  //           });
		
		// list of chart names
		// var chartList = ['area-chart','scatter-plot','progress-bar'];

		// $scope.rows = [];
		// $scope.test = "Work!!!";

		// function setUp(jsonFile) {

		// 	var index = jsonFile.index.rowCount;
		// 	for (i = 0; i < index; i++){
		// 		var row = jsonFile.index.rows[i];
		// 		console.log("No of columns: " + row.columns + " - Index = " + index);

		// 		if (row.columns == 1){
		// 			// get the type of chart
		// 			var chartType = row.charts[0];
		// 			// create a div and give it a class of fullLength
		// 			var doc1 = document.createElement('div');
		// 			doc1.className += "fullLength";
		// 			doc1.className += " ng-scope";
		// 			doc1.setAttribute("ng-controller","controller");
		// 			//doc1.setAttribute("id","area");

		//     		var doc2 = document.createElement('div');
		// 			doc2.className += "fullLength-bar";
		// 			// add the chart
		// 			var html = '<' + chartType + '></'+ chartType +'>';
		// 			// var html = "<div progress-bar></div>"
					
		// 			doc1.innerHTML = html;
		// 			doc1.appendChild(doc2);

		// 		}
		// 	}
		// }

  //       // called when the add row button is pressed.
		// $scope.addRow = function() {
		// 	// create a div and give it a class of fullLength
		// 	var doc1 = document.createElement('div');
		// 	doc1.className += " fullLength";
		//     var doc2 = document.createElement('div');
		// 	doc2.className += " fullLength-bar";
		// 	// add the bar 
		// 	doc1.appendChild(doc2);

  //  			document.body.appendChild(doc1);
		// };


		// angular.element(document).ready(function() {
  //       	angular.bootstrap(document, ['myApp']);
  //       });


	// app.factory('jsonFactory', function($http){
	// 	var data = [];
		
	// 		$http.get('json/index.json')
 //   				.success(function(result) {
 //   					console.log("Factory result = " + result.rowCount)
 //   					 data.push(result)
 //   					 console.log("Data test 1 = " + data[0].rowCount)
 //   			})
 //        console.log("Here Factory")
	// 	return{
	// 		get: function(){
	// 			return data;
	// 		}
	// 	}
	// })

	app.factory('jsonAPI', function($http){
		return {
		 	get : function() {
					return $http.get('json/index.json')
   								.then(function(response) {
   									return response.data;
   								})
				},
			add : function() {
				
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

// 	app.service('jsonService',function($http){
// 		var promise = 0;
// 		// $http.get('json/index.json')
//   //  				.success(function(result) {
//   //  					// console.log('Rows ' + result.data.rowCount)
//   //  					// var jsonFile = result;
//   //  					// console.log('Rows json ' + result.data.rowCount)
//   //  					// return jsonFile;
//   //  					promise = result
//   //  					return result
//   //  				});
// 		console.log("Here Service")
//    		return $http.get('json/index.json')
//    				.success(function(result) {
//    					// console.log('Rows ' + result.data.rowCount)
//    					// var jsonFile = result;
//    					// console.log('Rows json ' + result.data.rowCount)
//    					// return jsonFile;
//    					promise = result
//    					console.log("Parse " + result.rowCount)
//    					return result
//    				});;
//    				// .error(function(data) {
//        //          	        console.log('Error: ' + data);
//        //      	});	
// 	})

// 	app.factory('userRepository', function() {
//     return {
//         getAllUsers: function() {
//         	console.log("FUCK");
//             return [
//                 { firstName: 'Jane', lastName: 'Doe', age: 29 },
//                 { firstName: 'John', lastName: 'Doe', age: 32 }
//             ];
//         }
//     };
// });
