// js/controllers/main.js
    
var app = angular.module('appController', [])

	app.controller('controller', function($scope, $http, $element, $compile){

		var file = ""; 

		$scope.label = "Please click";

        $scope.doSomething = function(){
      		$scope.message = "Clicked!";
    	};

		$http.get('json/index.json')
   			.success(function(data) {
   				// $scope.t1000 = data.index.rowCount;
   				// index = data;
   				//setUp(data);
   				file = data;
   				// $scope.data = data;
   				// console.log("Data === " + file.index.rowCount)
   				// $scope.content = data.index.rows;

   				// $element.html(setUp(file)).show();

       //          $compile($element.contents())($scope);

   			})
   			.error(function(data) {
                        console.log('Error: ' + data);
            });
		
		// list of chart names
		var chartList = ['area-chart','scatter-plot','progress-bar'];

		$scope.rows = [];
		$scope.test = "Work!!!";

		function setUp(jsonFile) {

			// var jsonFile = $scope.data;
			// console.log("HHH " + $scope.data)
			// console.log("Data === gdfjfdgkh " + file.index.rowCount)
			// var list = [];

			var index = jsonFile.index.rowCount;
			for (i = 0; i < index; i++){
				var row = jsonFile.index.rows[i];
				console.log("No of columns: " + row.columns + " - Index = " + index);

				if (row.columns == 1){
					// get the type of chart
					var chartType = row.charts[0];
					// create a div and give it a class of fullLength
					var doc1 = document.createElement('div');
					doc1.className += "fullLength";
					doc1.className += " ng-scope";
					doc1.setAttribute("ng-controller","controller");
					//doc1.setAttribute("id","area");

		    		var doc2 = document.createElement('div');
					doc2.className += "fullLength-bar";
					// add the chart
					var html = '<' + chartType + '></'+ chartType +'>';
					// var html = "<div progress-bar></div>"
					
					doc1.innerHTML = html;
					doc1.appendChild(doc2);

			 // var template = '<div class="fullLength" ng-controller="controller"><div class="fullLength-bar"><button class="pull-right" type="submit"><i class="fa fa-close"></i></button></div><div area-chart></div></div>';
     //        	var linkFn = $compile(template);
     //        	var content = linkFn($scope);
     //        	$element.append(content);

					// var linkFn = $compile(doc1);
     //        		var content = linkFn($scope);
     //        		$element.append(content);




					// var e = angular.element(doc1);
					// $compile(e.contents())($scope);
    	// 			$elm.replaceWith(e);

   					// document.body.appendChild(doc1);
   					// list.push(doc1)
				}
				// if (row.columns == 2){
				// 	var html = '<div class="fullLength" ng-controller="controller"><h2>{{test}}</h2></div>'
				// 	list.push(html);
				// }
			}
			// return list
		}

        // called when the add row button is pressed.
		$scope.addRow = function() {
			// create a div and give it a class of fullLength
			var doc1 = document.createElement('div');
			doc1.className += " fullLength";
		    var doc2 = document.createElement('div');
			doc2.className += " fullLength-bar";
			// add the bar 
			doc1.appendChild(doc2);

   			document.body.appendChild(doc1);
		};

	});

	// app.directive('contentDirective', function($scope, $compile){

	// 		var getTemplate = function() {
	// 			var content = $scope.content;

	// 		// index = content.index.rowCount;
	// 		// for (i = 0; i < index; i++){
	// 			var row = content[i];
	// 			console.log("No of columns: " + row.columns + " - Index = " + index);

	// 			if (row.columns == 1){
	// 				// get the type of chart
	// 				var chartType = row.charts[0];
	// 				// create a div and give it a class of fullLength
	// 				var doc1 = document.createElement('div');
	// 				doc1.className += "fullLength";
	// 				doc1.className += " ng-scope";
	// 				doc1.setAttribute("ng-controller","controller");
	// 				doc1.setAttribute("id","area");

	// 	    		var doc2 = document.createElement('div');
	// 				doc2.className += "fullLength-bar";
	// 				// add the chart
	// 				var html = '<' + chartType + '></'+ chartType +'><h1>{{test}}</h1>';
	// 				// var html = "<div progress-bar></div>"
					
	// 				doc1.innerHTML = html;
	// 				doc1.appendChild(doc2);

	// 				// var e = angular.element(doc1);
	// 				// $compile(e.contents())($scope);
 //    	// 			$elm.replaceWith(e);

 //   					// document.body.appendChild(doc1);

 //   					return doc1;
	// 			} 
	// 			if (row.columns == 2){
	// 				var html = '<div class="fullLength" ng-controller="controller"><h2>{{test}}</h2></div>'
	// 				return html;
	// 			}
	// 		}
	// 	//}

	// 	var link = function(scope, element, attrs){
			
	// 		element.html(getTemplate()).show();

 //        	$compile(element.contents())(scope);

	// 	}
	// 	return{
 //      		restrict:'EA',
 //      		link: link,
 //      		scope: {
 //      			content:'='
 //      		}
 //    }
	// });

	app.directive("populateHomePage", function($compile){
    	
    	return{
        	link: function(scope, element){
            	var template = '<div class="fullLength" ng-controller="controller"><div class="fullLength-bar"><button class="pull-right" type="submit"><i class="fa fa-close"></i></button></div><div area-chart></div></div>';
            	var linkFn = $compile(template);
            	var content = linkFn(scope);
            	// var ebody = element.find("body");
            	// ebody.append(content);
            	element.append(content);
        	}
    	}
	});
