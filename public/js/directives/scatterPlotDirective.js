// File : /js/directives/scatterPlotDirective.js

angular.module('appController')  
    .directive('scatterPlot', function($window){

        var link = function(scope, elem, attrs){

            var w = 595;
            var h = 260;
            var padding = 30;
            // var border=5;
            // var bordercolor='black';
            var dataset = [
                            [480, 90], [250, 50], [100, 33], [330, 95],
                            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
                          ];

            // ----- scale -----------
            
            var scale = d3.scale.linear();

            scale.domain([100, 500]);
            scale.range([10, 350]);

            var xScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { 
                        return d[0]; 
                    })])
                     .range([padding, w - padding * 2]);
            
            var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { 
                        return d[1]; 
                    })])
                     .range([h - padding, padding]);

            // -------------------------
            // ------ axis -------------

            var xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom");
            //xAxis.ticks(5);

            //Define Y axis using . notation
            var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(5);



            // -------------------------

            var svg = d3.select("body").select("div.halfLength")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
            // .attr("border",border);

            // var borderPath = svg.append("rect")
            //     .attr("x", 0)
            //     .attr("y", 0)
            //     .attr("height", h)
            //     .attr("width", w)
            //     .style("stroke", bordercolor)
            //     .style("fill", "none")
            //     .style("stroke-width", border);

            svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
               .attr("cx", function(d) {
                    return xScale(d[0]);
            })
            .attr("cy", function(d) {
                    return yScale(d[1]);
            })
            .attr("r", function (d) {
                return Math.sqrt(h - d[1])
            });

            svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function (d) {
                return d[0] + "," + d[1];
            })
            .attr("x", function (d) {
                return xScale(d[0]);
            })
            .attr("y", function (d) {
                return yScale(d[1]);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "red");
            
            // Create X axis. Call it after everything else is rendered
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis);

            //Create Y axis
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(" + padding + ",0)")
                .call(yAxis);
    }

   return{
      restrict:'EA',
      //template:"<svg width='850' height='200'></svg>",
      link: link
    }
});
