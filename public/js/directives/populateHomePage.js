//public/js/populateHomePage.js

angular.module('appController')
	.directive('populateHomePage', function($compile, $q, jsonAPI, counter){

		var fullTemplate = '<div class="fullLength" id="area-chart" ng-controller="controller"><div class="fullLength-bar"><button class="pull-right" type="submit"><i class="fa fa-close"></i></button></div><div area-chart></div></div>';
        var halfTemplate = '<div class="fullLength" ng-controller="controller"><div class="halfLength"><div class="halfLength-bar"></div><div scatter-plot chart-data="salesData"></div></div><div class="halfLength" id="progress-bar"><div class="halfLength-bar"><input id="inputVal" type="text" value="0.75" style="width:35px;"/><button id="reload" style="width:35px;">Set</button></div><div progress-bar></div></div></div>';


		var fullTemplateVars = '<div class="fullLength" id={{element.charts[0]}} ng-controller="controller"><div class="fullLength-bar"><button class="pull-right" type="submit"><i class="fa fa-close"></i></button></div><div{{element.charts[0]}}></div></div>';
        var halfTemplateVars = '<div class="fullLength" ng-controller="controller"><div class="halfLength"><div class="halfLength-bar"></div><div scatter-plot chart-data="salesData"></div></div><div class="halfLength" id="progress-bar"><div class="halfLength-bar"><input id="inputVal" type="text" value="0.75" style="width:35px;"/><button id="reload" style="width:35px;">Set</button></div><div progress-bar></div></div></div>';
        
        var deferred = $q.defer();

         function getData(){
			var myDataPromise = jsonAPI.get();
    		myDataPromise.then(function(result) {  
    			deferred.resolve(result);		
   			});
   			return deferred.promise
    	}

    	var getTemplate = function(templateType) {
        	var template = '';
        	console.log("Inside")

        	switch(templateType) {
            	case 1:
            		console.log("Case 1")
            	    template = fullTemplate;
            	    break;
            	case 2:
            		console.log("Case 2")
            	    template = halfTemplate;
            	    break;
        	}

        	return template;
    	}

		
		var link = function(scope, element, attrs){

			var data = getData();
			var count = counter;

			// data.then(function(result){
			// 	console.log("Promise worked : ", result)
			// 	var counter = result.rowCount - result.rowCount;
			// 	var elementList = result.rows;
			// 	scope.elements = elementList;

				console.log("element list: ", scope.elements)

				element.html(getTemplate(scope.elements[count.get()].columns));
				count.add();

             	$compile(element.contents())(scope);
			//})

        }

    	return{
        	link: link,
        	scope: false
    	}
	});