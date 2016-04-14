// js/directives/areaChartDirective.js

angular.module('appController')  
    .directive('areaChart', function($window, mysqlAPI){



      var link = function(scope, elem, attrs){

        // function listens for the clicked value to become true, then executes
        // click value is made true when the user submits the dates and times to the controller
        scope.$watch('clicked', function() {

            if(mysqlAPI.getInput()){

              console.log("converting...")
              var date1 = mysqlAPI.getDate1();
              var date2 = mysqlAPI.getDate2();
              var time1 = mysqlAPI.getTime1();
              var time2 = mysqlAPI.getTime2();
              date1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' +  date1.getDate();
              date2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' +  date2.getDate();
              time1 = time1.getHours() + ':' + time1.getMinutes() + ':' +  time1.getSeconds();
              time2 = time2.getHours() + ':' + time2.getMinutes() + ':' +  time2.getSeconds();
          
              var query = 'select meter_reading_time, real_energy_consumption from meters_data where meter_reading_time between "'+date1+' '+time1+'" and "'+date2+' '+time2+'" and meter_id=82;';
          
              // pass query to the API and populate a var with the result
              var mysqlResult = mysqlAPI.get(query);

            mysqlResult.then(function(result) {

              var data = result;
              //set up the values for graphing
              data.forEach(function(r){
                r.meter_reading_time = parseDate(r.meter_reading_time.slice(0,10));
                r.real_energy_consumption = +r.real_energy_consumption;
              })

              var newArea = d3.svg.area()
                 .x(function(d) { 
                  return x(d.meter_reading_time); 
                })
               .y0(height)
               .y1(function(d) { 
                return y(d.real_energy_consumption); 
              });

              x.domain(d3.extent(data, function(r) { 
                    return r.meter_reading_time; 
              }));
              y.domain([0, d3.max(data, function(r) { 
                    return r.real_energy_consumption; 
              })]);

              var svg1 = d3.select("body").select("#area-chart").transition();

              svg1.select(".area").attr("d", newArea(data)).style("fill", '#009933')
              svg1.select(".x.axis").call(xAxis);
              svg1.select(".y.axis").call(yAxis);


                  console.log("finished...")
                  return true;
            })
        }
        });

          var margin = {top: 60, right: 50, bottom: 20, left: 50},
          width = 1200 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

          var padding = 30;
          var border=5;
          var bordercolor='black';

          var parseDate = d3.time.format("%Y-%m-%d").parse;// old format %d-%b-%y

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

           // selectAll("#area-chart") was select("#area-chart") which was only using the first area-chart id
          var svg = d3.select("body").selectAll("#area-chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + ", 10)")
          .attr("border", border);

            // --------------------- Create the chart from the values returned from the database ------------------

            var date1 = mysqlAPI.getDate1();
            var date2 = mysqlAPI.getDate2();
            var time1 = mysqlAPI.getTime1();
            var time2 = mysqlAPI.getTime2();
            date1 = date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' +  date1.getDate();
            date2 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' +  date2.getDate();
            time1 = time1.getHours() + ':' + time1.getMinutes() + ':' +  time1.getSeconds();
            time2 = time2.getHours() + ':' + time2.getMinutes() + ':' +  time2.getSeconds();
            console.log("d1",date1);
            console.log("d2",date2);
            console.log("t1",time1);
            console.log("t2",time2);
          
            var query = 'select meter_reading_time, real_energy_consumption from meters_data where meter_reading_time between "'+date1+' '+time1+'" and "'+date2+' '+time2+'" and meter_id=82;';
          
            // pass query to the API and populate a var with the result
            var mysqlResult = mysqlAPI.get(query);
            console.log("The query", query);

            mysqlResult.then(function(result) {

            console.log("Result", result);

            var data = result;
              //set up the values for graphing
              data.forEach(function(r){
                r.meter_reading_time = parseDate(r.meter_reading_time.slice(0,10));
                r.real_energy_consumption = +r.real_energy_consumption;
              })

            console.log("The result", data);
            x.domain(d3.extent(data, function(r) { 
              return r.meter_reading_time; 
            }));
            y.domain([0, d3.max(data, function(r) { 
              return r.real_energy_consumption; 
            })]);

            svg.append("path")
                .data([data])
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
      		link: link,
          scope: {
            // accessor: '='
            clicked: '='
          }
          // ,
          // controller: 'controller',
          // controllerAs: 'vm',
          // bindToController: true
      }
    });

