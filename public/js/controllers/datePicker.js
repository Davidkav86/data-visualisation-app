//public/js/controllers/datePicker.js

var datePicker = angular.module('datePicker', [])

	datePicker.controller('date_picker', function($scope, $window, mysqlAPI, counter){

		// var chap = 'select meter_id, meter_reading_time, real_energy_consumption from meters_data where meter_reading_time between "2015-02-02 10:00:00" and "2015-05-02 10:00:00" and meter_id=82;';
		// var test = mysqlAPI.get(chap);
		// test.then(function(result) {
		// 	console.log("Result", result[0].meter_id);
		// });
		// var vm = this;

		// $scope.dataInjection = {}
		// vm.accessor = {};
  //   	vm.callDirective = function () {
  //       	if (vm.accessor.getData) {
  //       	    var data = vm.accessor.getData();
  //       	    console.log("In the if part of the method with data",data);
  //       	}
  //   	};
  		// function for calling the two directives required to repopulate the page with new data
  		$scope.clicked = false;
        $scope.click = function() {
        	// $scope.clicked1 = !$scope.clicked1;
            $scope.clicked = !$scope.clicked;
        };
		
		// function for showing the date picker
		$scope.showModal = false;
    	$scope.toggleModal = function(){
        	$scope.showModal = !$scope.showModal;
    	};

		$scope.setDates = function(dt, dt2, timeFrom, timeTo){
			console.log("Date 1", dt);
			console.log("Date 2", dt2);
			console.log("From", timeFrom);
			console.log("To", timeTo);
			// set all the values to a service so they can be used in the directive
			mysqlAPI.setDate1(dt);
			mysqlAPI.setDate2(dt2);
			mysqlAPI.setTime1(timeFrom);
			mysqlAPI.setTime2(timeTo);
			mysqlAPI.setInput(true);
		
			$scope.clicked = !$scope.clicked;
			console.log("Click", $scope.clicked)
			// close the popup box
			$scope.showModal = false;
  			// $scope.clicked1 = false;
		}

		$scope.today = function() {
    		$scope.dt = new Date();
    		$scope.dt2 = new Date();
  		};
  		$scope.today();

  		var getDate = function(){
  			return new Date();
  		}

  		$scope.clear = function() {
   		 $scope.dt = null;
   		 $scope.dt2 = null;
  		};

  		$scope.inlineOptions = {
  		    customClass: getDayClass,
  		    minDate: new Date(),
    		showWeeks: true
  		};

  		$scope.dateOptions = {
    		dateDisabled: disabled,
    		formatYear: 'yy',
    		maxDate: new Date(),
    		minDate: new Date(),
    		startingDay: 1
  		};

 		 // Disable weekend selection
  		function disabled(data) {
  		    var date = data.date,
   		    mode = data.mode;
    		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  		}

  		$scope.toggleMin = function() {
    		$scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    		$scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  		};

  		$scope.toggleMin();

  		$scope.open1 = function() {
    		$scope.popup1.opened = true;
  		};

  		$scope.open2 = function() {
  		  $scope.popup2.opened = true;
  		};

  		$scope.setDate = function(year, month, day) {
  		  $scope.dt = new Date(year, month, day);
  		};

  		$scope.setDate2 = function(year, month, day) {
  		  $scope.dt2 = new Date(year, month, day);
  		};

  		$scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd-MMMM-yyyy', 'shortDate'];
  		$scope.format = $scope.formats[0];
 		$scope.altInputFormats = ['M!/d!/yyyy'];

  		$scope.popup1 = {
    		opened: false
  		};

  		$scope.popup2 = {
    		opened: false
  		};

  		var tomorrow = new Date();
  		tomorrow.setDate(tomorrow.getDate() + 1);
  		var afterTomorrow = new Date(tomorrow);
  		afterTomorrow.setDate(tomorrow.getDate() + 1);
  		$scope.events = [
    		{
      			date: tomorrow,
      			status: 'full'
    		},
    		{
      			date: afterTomorrow,
      			status: 'partially'
    		}
  		];

  		function getDayClass(data) {
    		var date = data.date,
      			mode = data.mode;
    		if (mode === 'day') {
      			var dayToCheck = new Date(date).setHours(0,0,0,0);

      			for (var i = 0; i < $scope.events.length; i++) {
        			var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        			if (dayToCheck === currentDay) {
          			return $scope.events[i].status;
        			}
      			}
    		}
    		return '';
  		}
	});



datePicker.directive('modal', function(){
	return{
		template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true){
            $(element).modal('show');
        }
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
	}
});

datePicker.factory('mysqlAPI', function($http){

	var date1 = new Date(2015,2,2);
	var date2 = new Date(2015,5,2);
	var time1 = new Date(2015,2,2);
	var time2 = new Date(2015,2,2);
	var _input = false;
	return {
		 	get : function(query) {
		 		// console.log("Query ", query);
		 		return $http.get('/tssg_meters/' + query)
   								.then(function(response) {
   									return response.data;
   								})    
        	},	
        	setDate1 : function (d1){ date1 = d1;},
        	getDate1 : function(){return date1;},
        	setDate2 : function (d2){ date2 = d2;},
        	getDate2 : function(){return date2;},
        	setTime1 : function (t1){if(t1){time1 = t1;}},
        	getTime1 : function(){return time1;},
        	setTime2 : function (t2){if(t2){time1 = t2;}},
        	getTime2 : function(){return time2;},
        	setInput : function(input){_input = input},
        	getInput : function(){return _input}
		}
})










