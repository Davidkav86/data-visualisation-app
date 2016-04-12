// js/directives/areaChartDirective.js

angular.module('appController')  
    .directive('areaChart', function($window, mysqlAPI){



      var link = function(scope, elem, attrs){

        var margin = {top: 60, right: 50, bottom: 20, left: 50},
        width = 1200 - margin.left - margin.right,
    		height = 300 - margin.top - margin.bottom;

        var padding = 30;
    		var border=5;
        var bordercolor='black';

			  var parseDate = d3.time.format("%Y-%m-%d").parse;//"%Y-%m-%d" // old format %d-%b-%y

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
              return x(d.meter_reading_time); 
            })
    			 .y0(height)
    			 .y1(function(d) { 
            return y(d.real_energy_consumption); 
          });

      // var area = d3.svg.area()
      //       .x(function(d) { 
      //         return x(d.date); 
      //       })
      //      .y0(height)
      //      .y1(function(d) { 
      //       return y(d.close); 
      //     });

           // selectAll("#area-chart") was select("#area-chart") which was only using the first area-chart id

			var svg = d3.select("body").selectAll("#area-chart").append("svg")
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

      // ------------ Data Entry ------------------

			// d3.tsv("js/directives/data.tsv", function(error, data) {
  	// 			if (error) 
  	// 				throw error;
  	// 			else
  	// 				data.forEach(function(d) {
   //  				d.date = parseDate(d.date);
   //          console.log("Reading time",d.date)
   //  				d.close = +d.close;
   //          console.log("Other", d.close);
  	// 		});

   //     console.log("The data", data);


  	// 		x.domain(d3.extent(data, function(d) { 
  	// 			return d.date; 
  	// 		}));
  	// 		y.domain([0, d3.max(data, function(d) { 
  	// 			return d.close; 
  	// 		})]);

  	// 		svg.append("path")
   //    			.datum(data)
   //    			.attr("class", "area")
   //    			.attr("d", area);

  	// 		svg.append("g")
   //    			.attr("class", "x axis")
   //    			.attr("transform", "translate(0," + height + ")")
   //    			.call(xAxis);

  	// 		svg.append("g")
   //    			.attr("class", "y axis")
   //    			.call(yAxis)
   //  			.append("text")
   //    			.attr("transform", "rotate(-90)")
   //    			.attr("y", 6)
   //    			.attr("dy", ".71em")
   //    			.style("text-anchor", "end");

			// });

        var dateList = [];
        var data_list = [];

        var query = 'select meter_reading_time, real_energy_consumption from meters_data where meter_reading_time between "2015-02-02 10:00:00" and "2015-05-02 10:00:00" and meter_id=82;';
        
        var mysqlQuery = mysqlAPI.get(query);
        mysqlQuery.then(function(result) {
          console.log("Result", result);
          // populate lists
        result.forEach(function(r){
            // dateList.push(r.meter_reading_time.slice(0,10));
            // data_list.push(r.real_energy_consumption);

            r.meter_reading_time = parseDate(r.meter_reading_time.slice(0,10));
            r.real_energy_consumption = +r.real_energy_consumption;

        })

          // console.log("Dates",dateList);
          // console.log("Data",data_list);

        x.domain(d3.extent(result, function(r) { 
          return r.meter_reading_time; 
        }));
        y.domain([0, d3.max(result, function(r) { 
          return r.real_energy_consumption; 
        })]);

        svg.append("path")
            .datum(result)
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
        });


    }

    	return{
      		restrict:'EA',
      		link: link
    }
    });

