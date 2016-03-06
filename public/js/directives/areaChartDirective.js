// js/directives/areaChartDirective.js

angular.module('appController')  
    .directive('areaChart', function($window){

      var link = function(scope, elem, attrs){

        var margin = {top: 60, right: 50, bottom: 20, left: 50},
        width = 1200 - margin.left - margin.right,
    		height = 300 - margin.top - margin.bottom;

        var padding = 30;
    		var border=5;
        var bordercolor='black';

			  var parseDate = d3.time.format("%d-%b-%y").parse;

			var x = d3.time.scale()
    			.range([0, width]);

			var y = d3.scale.linear()
    			.range([height, 0]);

			var xAxis = d3.svg.axis()
    			.scale(x)
    			.orient("bottom");

			var yAxis = d3.svg.axis()
    			.scale(y)
    			.orient("left");

			var area = d3.svg.area()
   			    .x(function(d) { 
              return x(d.date); 
            })
    			 .y0(height)
    			 .y1(function(d) { 
            return y(d.close); 
          });

			var svg = d3.select("body").select("#test").append("svg")
    			.attr("width", width + margin.left + margin.right)
    			.attr("height", height + margin.top + margin.bottom)
  				.append("g")
          .attr("transform", "translate(" + margin.left + ", 10)")
    			// .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    			.attr("border", border);

    		// var borderPath = svg.append("rect")
      //           .attr("x", 0)
      //           .attr("y", 0)
      //           .attr("height", height)
      //           .attr("width", width)
      //           .style("stroke", bordercolor)
      //           .style("fill", "none")
      //           .style("stroke-width", border);

			d3.tsv("js/directives/data.tsv", function(error, data) {
  				if (error) 
  					throw error;
  				else
  					data.forEach(function(d) {
    				d.date = parseDate(d.date);
    				d.close = +d.close;
  			});

  			x.domain(d3.extent(data, function(d) { 
  				return d.date; 
  			}));
  			y.domain([0, d3.max(data, function(d) { 
  				return d.close; 
  			})]);

  			svg.append("path")
      			.datum(data)
      			.attr("class", "area")
      			.attr("d", area);

  			svg.append("g")
      			.attr("class", "x axis")
      			.attr("transform", "translate(0," + height + ")")
      			.call(xAxis);

  			svg.append("g")
      			.attr("class", "y axis")
      			.call(yAxis)
    			.append("text")
      			.attr("transform", "rotate(-90)")
      			.attr("y", 6)
      			.attr("dy", ".71em")
      			.style("text-anchor", "end");

            // // Create X axis. Call it after everything else is rendered
            // svg.append("g")
            //     .attr("class", "axis")
            //     .attr("transform", "translate(0," + (height - 30) + ")")
            //     .call(xAxis);

            // //Create Y axis
            // svg.append("g")
            //     .attr("class", "axis")
            //     .attr("transform", "translate(" + 30 + ",0)")
            //     .call(yAxis);
			});

        }

    	return{
      		restrict:'EA',
      		link: link
    }
    });

