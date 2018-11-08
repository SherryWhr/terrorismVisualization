console.log("enter chart");
function chart_func(ctry, terr) {
 	console.log(ctry)
 	console.log(terr)

    //terr="total";
 // Initial drawable area values
 	var margin = {top: 20, right: 40, bottom: 20, left: 10},
 	width = 600 - margin.left - margin.right,
 	height = 325 - margin.top - margin.bottom;

 // Specify range of x axis, match state to width
 	var xScale = d3.scaleBand()
 	.rangeRound([0, width])
 	.paddingInner(0.5)
 	.paddingOuter(0.5);

 	// Specify range of y axis, match population to height
 	var yScale = d3.scaleLinear()
 	.rangeRound([height, 0]);
    
    // var valueline = d3.svg.line()
    //     .x(function(d) { return x(d.year); })
    //     .y(function(d) { return y(d.attack); });

//plot the world data
d3.csv("sum.csv",function(data){
    //console.log(data[terr]);
    return{
        year : data.iyear,
        attack : data[terr]
    }
},function(error,data){
    if(error) throw error;
    console.log("finished read data");
    console.log(data[1]);

    xScale.domain(data.map(function(d) { return d.year; }));
    yScale.domain([0, d3.max(data, function(d) { 
        console.log("test y axis");
        console.log(d.attack);
        return +d.attack; })]).nice();
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    // var g = d3.select("body")
    //     .append("svg")
    //     .attr("width", 1000)
    //     .attr("height", 600);
    var g=d3.select("#svgchart1").append("g");
        //.append("path")
        //.attr("class","line");
    //.attr("d", valueline(data));
    g.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 3.5)
        .attr("cx", function(d) { return xScale(d.year); })
        .attr("cy", function(d) { return yScale(d.attack); })
        .attr("fill","red")
        .attr("stroke","black")
        .on("mouseover", function(d) { tooltip.style("display", null);})
        .on("mouseout", function(d) { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
            //console.log(d);
            var xPosition = d3.mouse(this)[0] - 5;
            var yPosition = d3.mouse(this)[1] - 5;
            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text").text(d.attack);
         });
    
    g.append("g")
        .attr("class", "axisNormal")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
            .attr("class", "axisNormal")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height)
            .text("Year");

    // Add the Y Axis
    g.append("g")
        .attr("class", "axisNormal")
        .call(yAxis.ticks(20));
    
        var tooltip = g.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    var tooltip = g.append("g")
        .attr("class", "tooltip")
        .style("display", "none");
    
    tooltip.append("rect")
    .attr("width", 60)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

    tooltip.append("text")
    .attr("x", 30)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

var links = d3.selectAll('path');
//     g.dispatch.on('showTooltip', function(e) {
//          var offset = $('#test1').offset(), // { left: 0, top: 0 }
//         left = e.pos[0] + offset.left,
//         top = e.pos[1] + offset.top,
//         formatter = d3.format(".04f");

//          var content = '<h3>' + e.series.label + '</h3>' +
//                   '<p>' +
//                   '<span class="value">[' + e.point[0] + ', ' + formatter(e.point[1]) + ']</span>' +
//                   '</p>';

//         nvtooltip.show([left, top], content);
//   });

//   chart.dispatch.on('hideTooltip', function(e) {
//     nvtooltip.cleanup();
//   });
// add the y Axis
	// d3.select("#svgchart1").append("g")
	// .attr("class", "axisNormal")
	// .call(yAxis)
	// .append("text")
	// .attr("x", -45)
	// .attr("y", y(y.ticks().pop()) + 8)
	// .attr("fill", "#000")
	// .attr("text-anchor", "start")
	// .attr("font-size", 8)
	// .attr("transform", "rotate(-90)")
	// .text("Area (sq mi)");
    
})


// 	// Match age catogories to color
// 	var color = d3.scaleOrdinal()
// 	.range(["#98abc4", "#8a8aa5", "#7a6887", "#6a496a", "#9e5d57", "#ce7442" ,"#fc8c25"]);

// 	// x axis
// 	var xAxis = d3.axisBottom(x)
// 	.scale(x)
// 	.tickSize(6)
// 	.tickPadding(6);

// 	// y axis
// 	var yAxis = d3.axisLeft(y)
// 	.scale(y)
// 	.ticks(null, "s");

// var min = Number.POSITIVE_INFINITY;
// var max = Number.NEGATIVE_INFINITY;


// // read data
// d3.csv("world_population.csv", 
// 	function(d, i, columns) {
// // console.log(columns)
// for (i = 2, t = 0; i < columns.length; ++i) {
// //console.log(d[columns[i]])
// t +=  (d[columns[i]] = +d[columns[i]]);
// }

// d.total = t;
// if(t < min) { min = t;};
// if(t > max) { max = t;};
// return d;
// },
// function(error, data) {
// 	if (error) throw error;	

// // set domains
// 	x.domain(data.map(function(d) { return d.State; }));
// 	y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
// 	var keys = data.columns.slice(1);
// 	color.domain(keys);
// 	console.log("here is the data");
// 	console.log(data);
// 	// add the bars
// 	d3.select("#svgchart1").append("g")
// 	.selectAll("g")
// 	.data(d3.stack().keys(keys)(data))
// 	.enter()
// 	.append("g")
// 	.attr("fill", function(d) { return color(d.key); })
// 	.selectAll("rect")
// 	.data(function(d) { return d; })
// 	.enter()
// 	.append("rect")
// 	.transition()
// 	.duration(500)
// 	.delay(function(d, i) { return i * 10; })
// 	.attr("x", function(d) { return x(d.data.State); })
// 	.attr("y", function(d) { return y(d[1]); })
// 	.attr("height", function(d) { return y(d[0]) - y(d[1]); })
// 	.attr("id", function(d){ return d.data.State; })
// 	.attr("width", x.bandwidth());

// 	// add the legend
// 	var keys = data.columns.slice(1);

// 	var legend = d3.select("#svgchart1").append("g")
// 	.attr("font-size", 8)
// 	.attr("text-anchor", "end")
// 	.attr("font-family", "sans-serif")
// 	.selectAll("g")
// 	.data(keys.slice().reverse())
// 	.enter()
// 	.append("g")
// 	.attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

// 		  // add the legend rectangle
// 		  legend.append("rect")
// 		  .attr("x", width - 13)
// 		  .attr("width", 13)
// 		  .attr("height", 13)
// 		  .attr("fill", color);

// 		  // add the legend text
// 		  legend.append("text")
// 		  .attr("x", width - 24)
// 		  .attr("y", 9.5)
// 		  .text(function(d) { return d; });


// 		  // add the x Axis
// 	d3.select("#svgchart1").append("g")
// 	.attr("class", "axisWhite")
// 	.attr("transform", "translate(0," + height + ")")
// 	.call(xAxis)
// 	.append("text")
// 	.attr("x", width)
// 	.attr("y", y(y.ticks().pop()) + 6)
// 	.attr("fill", "#000")
// 	.attr("text-anchor", "start")
// 	.attr("font-size", 8)
// 	.text("State");

// 	// add the y Axis
// 	d3.select("#svgchart1").append("g")
// 	.attr("class", "axisNormal")
// 	.call(yAxis)
// 	.append("text")
// 	.attr("x", -45)
// 	.attr("y", y(y.ticks().pop()) + 8)
// 	.attr("fill", "#000")
// 	.attr("text-anchor", "start")
// 	.attr("font-size", 8)
// 	.attr("transform", "rotate(-90)")
// 	.text("Area (sq mi)");

// })

}