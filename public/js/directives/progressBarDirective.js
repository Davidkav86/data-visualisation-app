// /js/directives/progressBarDirective.js

angular.module('appController')  
    .directive('progressBar', function($window){

      var link = function(scope, elem, attrs){

      		var width = 370,
    		height = 230,
    		twoPi = 2 * Math.PI,
    		progress = 0,
    		total = 100,
    		formatPercent = d3.format(".0%");

			var arc = d3.svg.arc()
    			.startAngle(0)
    			.innerRadius(85)
    			.outerRadius(115)
			;

			var svg = d3.select("#progress-bar").append("svg")
  			   .attr("width", width)
  			   .attr("height", height)
  			   .attr('fill', '#2E7AF9')
 			   .append("g")
 			   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			var meter = svg.append("g")
    			.attr("class", "progress-meter");

			meter.append("path")
    			.attr("class", "background")
    			.attr("d", arc.endAngle(twoPi));

			var foreground = meter.append("path")
    			.attr("class", "foreground");

			var text = meter.append("text")
    			.attr("text-anchor", "middle")
    			.attr("class", "progText");

			var text2 = meter.append("text")
    			.attr("y", 40)
    			.attr("text-anchor", "middle")
    			.attr("class", "progText2");

			text2.text('Current Value');

			var animate = function(percentage){
    			var i = d3.interpolate(progress, percentage);

    			d3.transition().duration(1200).tween("progress", function () {
        			return function (t) {
            			progress = i(t);
            			if (progress > 0.8) {
            				foreground.attr("class", "foregroundRed");
            				text.attr("class", "progTextRed");
            			} else {
            				foreground.attr("class", "foreground");
            				text.attr("class", "progText");
            			}
            			foreground.attr("d", arc.endAngle(twoPi * progress));
            			text.text(formatPercent(progress));
        			};
    			});
			}; 

			setTimeout(function () {
  				animate($('#inputVal').val());
			}, 500);

			$('#reload').on('click', function(){
  				animate($('#inputVal').val());
			});
        
        }

    	return{
      		restrict:'EA',
      		link: link
    }
    });