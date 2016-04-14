//public/js/populateHomePage.js

var app = angular.module('appController')

	app.directive('populateHomePage', function($compile, $q, $window, API, counter, holder){

		var fullTemplate = '<div class="fullLength" id="area-chart">'+
                                '<div class="fullLength-bar">'+
                                    '<div ng-controller="date_picker">' +
                                        '<div area-chart clicked="clicked"></div>'+
                                        '<button class="pull-left fa fa-search dateButton" type="submit" ng-click="toggleModal()"></button>' +
                                        '<modal title="Search Historical Data" visible="showModal">' +
                                            '<div class="row">'+
                                                '<div class="col-md-6">'+
                                                '<p class="input-group">' +
                                                    'Date from:'+
                                                    '<input type="text" class="form-control" uib-datepicker-popup="{{format}}" ng-model="dt" is-open="popup1.opened" datepicker-options="dateOptions" ng-required="true" close-text="Close" alt-input-formats="altInputFormats" />' +
                                                    '<span class="input-group-btn">' +
                                                        '<button type="button" class="calBtn" ng-click="open1()"><i class="glyphicon glyphicon-calendar"></i></button>' +
                                                    '</span>' +
                                                '</p>' +
                                            '</div>' +  
                                            '<div class="col-md-6">' +
                                                      '<p class="input-group">' +
                                                      'Date To:'+
                                                        '<input type="text" class="form-control" uib-datepicker-popup ng-model="dt2" is-open="popup2.opened" datepicker-options="dateOptions" ng-required="true" close-text="Close" />' +
                                                        '<span class="input-group-btn">' +
                                                          '<button type="button" class="calBtn" ng-click="open2()"><i class="glyphicon glyphicon-calendar"></i></button>' +
                                                        '</span>' +
                                                      '</p>' +
                                                    '</div><br>' +
                                                    '</div>' +
                                            '<div class="row">' +
                                                '<div class="col-md-6">'+
                                                    '<p class="input-group">'+
                                                        'Time from <small>(optional)</small>:'+
                                                        '<input type="time" ng-model="timeFrom">'+
                                                    '</p>'+
                                                '</div>' +
                                                  
                                                '<div class="col-md-6">'+
                                                    '<p class="input-group">'+
                                                        'Time to <small>(optional)</small>:' +
                                                        '<input type="time" ng-model="timeTo">'+
                                                    '</p>'+
                                                '</div><br>'+
                                            '</div>' +
                                                  '<div class="row">' +
                                                    '<div class="col-md-6">' +
                                                      '<label>Format: <span class="muted-text">(manual alternate <em>{{altInputFormats[0]}}</em>)</span></label> <select class="form-control" ng-model="format" ng-options="f for f in formats"><option></option></select>' +
                                                    '</div> <br></br><br>' +
                                                    '<div class="col-md-6">' +
                                                      '<button type="button" class="btn clearButton" ng-click="clear()">Clear</button>' +
                                                    '</div>' +
                                                    '<div class="col-md-6">'+
                                                        '<button type="button" class="subButton" ng-click="setDates(dt,dt2,timeFrom,timeTo)">Submit</button>'+
                                                        // '<button type="button" class="subButton" ng-click="click()">Submit</button>'+
                                                    '</div>'+
                                                  '</div>' +
                                            '</modal>'+
                                    '</div>'+
                                    '<button class="pull-right dateButton" type="submit" ng-click="deleteColumn(element._id)"><i class="fa fa-remove"></i></button>'+
                                    // '<button class="pull-right dateButton" type="submit" ng-click="click()"><i class="fa fa-remove"></i></button>'+
                                '</div>'+
                                '<div area-chart clicked="clicked"></div>'+
                            '</div>';
        var halfTemplate = '<div class="fullLength"><div class="halfLength"><div class="halfLength-bar"></div><div scatter-plot chart-data="salesData"></div></div><div class="halfLength" id="progress-bar"><div class="halfLength-bar"><input id="inputVal" type="text" value="0.75" style="width:35px;"/><button id="reload" style="width:35px;">Set</button></div><div progress-bar></div></div></div>';

        // Templates for dynamically render charts from values passed in, does not work currently
		var fullTemplateVars = '<div class="fullLength" id={{element.charts[0]}} ng-controller="controller"><div class="fullLength-bar"><button class="pull-right" type="submit" ng-click="deleteColumn(element._id)"><i class="fa fa-close"></i></button></div> <span {{element.charts[0]}} ></span></div>';
        var halfTemplateVars = '<div class="fullLength" ng-controller="controller"><div class="halfLength"><div class="halfLength-bar"></div><div scatter-plot chart-data="salesData"></div></div><div class="halfLength" id="progress-bar"><div class="halfLength-bar"><input id="inputVal" type="text" value="0.75" style="width:35px;"/><button id="reload" style="width:35px;">Set</button></div><div progress-bar></div></div></div>';

        var deferred = $q.defer();

         function getData(){
			var apiCall = API.get();
    		apiCall.then(function(result) {  
    			deferred.resolve(result);		
   			});
   			return deferred.promise
    	}

    	var getTemplate = function(templateType) {
        	var template = '';

        	switch(templateType) {
            	case "1":
            	    template = fullTemplate;
            	    break;
            	case "2":
            	    template = halfTemplate;
            	    break;
        	}

        	return template;
    	}
		
		var link = function(scope, element, attrs){

            // scope.$watch('clicked', function() {
            //     console.log("INsode hdsjkdhui")
            //     console.log("before data")
			var data = getData();
			var count = counter;
   //          console.log("after data")

			// data.then(function(result){
   //              console.log("inside promise")
			// 	// var counter = result.rowCount - result.rowCount;
			// 	var elementList = result;
			// 	scope.elements = elementList;
   //              if(count.test())
   //              {
   //                  console.log("In the kid")
   //                  //element.html("div").removeClass(".fullLength");
   //                  var myEl = element( document.querySelector( '#fullLength' ) );
   //                  myEl.empty();
   //                  // $compile(element.contents())(scope);
   //                  count.setTestFalse();
   //              }

                // if(count.get() < scope.elements.length){
                //     console.log("Count", count.get());
                //     console.log("Length", scope.elements.length);
                

                element.html(getTemplate(scope.elements[count.get()].columns)).show();
                count.add();

                $compile(element.contents())(scope);
                // console.log("The whole world")
            //}
             // } else{}


				// console.log("element list: ", scope.elements[1].columns)

				// element.html(getTemplate(scope.elements[count.get()].columns)).show();
				// count.add();

    //          	$compile(element.contents())(scope);
    //          // } else{
             //    console.log("Out of bounds")
             // }
			//})
            //}

        }

    	return{
            restrict:'EA',
        	link: link,
        	scope: false
    	}
	});