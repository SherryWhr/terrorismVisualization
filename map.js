function map_func(ctry, terr, yr) {
	console.log("map_func"+ctry+terr+yr)

	if(ctry == "Country/Region") {ctry = "All";}

	d3.selectAll("svg > *").remove();
	d3.selectAll("g > *").remove();
	d3.selectAll("text > *").remove();

	var min = Number.POSITIVE_INFINITY;
	var max = Number.NEGATIVE_INFINITY;
	var ctry_id
	// var terr_id

// read data
d3.csv(yr+".csv", 
	function(d, i, columns) {
	return d;
},
function(error, data) {
	if (error) throw error;	

	var byState = {}; 
	data.forEach(function(d) {
		byState[d.country] = d[terr]; 
	});

// Draw the USA map with channel
d3.json("countries.json", drawMap);

d3.select("#svgmap")
.append("text")
.attr("class", "info")
.attr("id", "info")
.attr("x", 300)
.attr("dy", "1.2em")
.style("display", "none")
.text("-");

function drawMap(error, country) {
	var widthOfWin=$(window).width(); 
	var width = widthOfWin*0.65;
	var height = 660;

	var projection = d3.geoEquirectangular()
	.fitExtent([[0,0], [width, height]], country);

	geoGenerator = d3.geoPath()
	.projection(projection);

	d3.select("#svgmap")
	.attr("width", width-20)

	var paths = d3.select("#svgmap")
	.append("g")
	.attr("id", "country")
	.selectAll("path")
	.data(country.features)
	.enter()
	.append('path')
	.attr("id", function(d) { return d.properties.name; })
	.attr('d', geoGenerator)
	.on("mouseover", function(d){
		d3.select("#info")
		.style("display", null) 
		.text(d.properties.name);
	})
	.on("mouseout", function(d){
		d3.select("#info")
		.style("display", null) 
		.text(" ");
	});

	var x = d3.scaleLinear()
	.domain([0, 1620])
	.rangeRound([width*0.66, width*0.98]);

	var color = d3.scaleThreshold()
	.domain([0, 45, 135, 270, 450, 675, 945, 1260, 1620])
	// .domain(d3.range(0,1440,160))
	.range(d3.schemeReds[9]);

	d3.selectAll("path")
	.data(country.features)
	.style("stroke", "black")
	.style("fill", function(d) {
        return color(byState[d.properties.name]); // get rate value for specific object
        // pass rate to channelcolor function, return channelcolor based on scale
    });

 var g = d3.select("#svgmap").append("g")
 .attr("class", "key")
 .attr("transform", "translate(-50,40)");

 g.selectAll("rect")
 .data(color.range().map(function(d) {
 	d = color.invertExtent(d);
 	if (d[0] == null) d[0] = x.domain()[0];
 	if (d[1] == null) d[1] = x.domain()[1];
 	// console.log(min)
 	// console.log(max)
 	return d;
 }))
 .enter().append("rect")
 .attr("height", 8)
 .attr("x", function(d) { return x(d[0]); })
 .attr("width", function(d) { return x(d[1]) - x(d[0]); })
 .attr("fill", function(d) { return color(d[0]); });

 g.append("text")
 .attr("class", "caption")
 .attr("x", x.range()[0])
 .attr("y", -6)
 .attr("fill", "#000")
 .attr("text-anchor", "start")
 .attr("font-weight", "bold")
 .text("Terrorism rate");

 g.call(d3.axisBottom(x)
 	.tickSize(13)
 	.tickFormat(function(x, i) { return i ? x : x; })
 	.tickValues(color.domain()))
 .select(".domain")
 .remove();

 d3.select("#"+ctry)
 .style("stroke-width", "5px")
 .style("fill", "yellow")
}
})

}

