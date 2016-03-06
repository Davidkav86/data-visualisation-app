//public/js/populateHomePage.js

angular.module('appController')
	.directive("populateHomePage", function($compile, dataPersistence){
		var fullTemplate = '<div class="fullLength" id="test" ng-controller="controller"><div class="fullLength-bar"><button class="pull-right" type="submit"><i class="fa fa-close"></i></button></div><div area-chart></div></div>';
        var halfTemplate = '<div class="fullLength" ng-controller="controller"><div class="halfLength"><div class="halfLength-bar"></div><div scatter-plot chart-data="salesData"></div></div><div class="halfLength" id="progress-bar"><div class="halfLength-bar"><input id="inputVal" type="text" value="0.75" style="width:35px;"/><button id="reload" style="width:35px;">Set</button></div><div progress-bar></div></div></div>';
		var link = function(scope, element, dataPersistence){
			    var self = this;
            	var template = fullTemplate;

            	self.data = dataPersistence.get;
            	var rowCount = self.data.data.rowCount;
            	console.log("No of rows = " + rowCount);

            	element.html('').append(template);
                $compile(element.contents())(scope);
            }
    	
    	return{
        	link: link
        	
    	}
	});