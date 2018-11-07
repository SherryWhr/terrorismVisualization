// Initial drawable area values
	var margin = {top: 20, right: 40, bottom: 20, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

// Specify range of x axis, match state to width
	var x = d3.scaleBand()
	.rangeRound([0, width])
	.paddingInner(0.5)
	.paddingOuter(0.5);

	// Specify range of y axis, match population to height
	var y = d3.scaleLinear()
	.rangeRound([height, 0]);

	// Match age catogories to color
	var color = d3.scaleOrdinal()
	.range(["#98abc4", "#8a8aa5", "#7a6887", "#6a496a", "#9e5d57", "#ce7442" ,"#fc8c25"]);

	// x axis
	var xAxis = d3.axisBottom(x)
	.scale(x)
	.tickSize(6)
	.tickPadding(6);

	// y axis
	var yAxis = d3.axisLeft(y)
	.scale(y)
	.ticks(null, "s");

var min = Number.POSITIVE_INFINITY;
var max = Number.NEGATIVE_INFINITY;


// read data
d3.csv("world_population.csv", 
	function(d, i, columns) {
// console.log(columns)
for (i = 2, t = 0; i < columns.length; ++i) {
//console.log(d[columns[i]])
t +=  (d[columns[i]] = +d[columns[i]]);
}

d.total = t;
if(t < min) { min = t;};
if(t > max) { max = t;};
return d;
},
function(error, data) {
	if (error) throw error;	

// set domains
	x.domain(data.map(function(d) { return d.State; }));
	y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
	var keys = data.columns.slice(1);
	color.domain(keys);
	console.log("here is the data");
	console.log(data);
	// add the bars
	d3.select("#svgchart1").append("g")
	.selectAll("g")
	.data(d3.stack().keys(keys)(data))
	.enter()
	.append("g")
	.attr("fill", function(d) { return color(d.key); })
	.selectAll("rect")
	.data(function(d) { return d; })
	.enter()
	.append("rect")
	.transition()
	.duration(500)
	.delay(function(d, i) { return i * 10; })
	.attr("x", function(d) { return x(d.data.State); })
	.attr("y", function(d) { return y(d[1]); })
	.attr("height", function(d) { return y(d[0]) - y(d[1]); })
	.attr("id", function(d){ return d.data.State; })
	.attr("width", x.bandwidth());

	// add the legend
	var keys = data.columns.slice(1);

	var legend = d3.select("#svgchart1").append("g")
	.attr("font-size", 8)
	.attr("text-anchor", "end")
	.attr("font-family", "sans-serif")
	.selectAll("g")
	.data(keys.slice().reverse())
	.enter()
	.append("g")
	.attr("transform", function(d, i) { return "translate(0," + i * 15 + ")"; });

		  // add the legend rectangle
		  legend.append("rect")
		  .attr("x", width - 13)
		  .attr("width", 13)
		  .attr("height", 13)
		  .attr("fill", color);

		  // add the legend text
		  legend.append("text")
		  .attr("x", width - 24)
		  .attr("y", 9.5)
		  .text(function(d) { return d; });


		  // add the x Axis
	d3.select("#svgchart1").append("g")
	.attr("class", "axisWhite")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis)
	.append("text")
	.attr("x", width)
	.attr("y", y(y.ticks().pop()) + 6)
	.attr("fill", "#000")
	.attr("text-anchor", "start")
	.attr("font-size", 8)
	.text("State");

	// add the y Axis
	d3.select("#svgchart1").append("g")
	.attr("class", "axisNormal")
	.call(yAxis)
	.append("text")
	.attr("x", -45)
	.attr("y", y(y.ticks().pop()) + 8)
	.attr("fill", "#000")
	.attr("text-anchor", "start")
	.attr("font-size", 8)
	.attr("transform", "rotate(-90)")
	.text("Area (sq mi)");

})