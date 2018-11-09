function map_func(ctry, terr) {
	console.log(ctry)
	console.log(terr)

	d3.selectAll("svg > *").remove();

	var min = Number.POSITIVE_INFINITY;
	var max = Number.NEGATIVE_INFINITY;
	var ctry_id
	// var terr_id

	// d3.select("#svgslider")
	// .append("input")
	// .attr("id", "ex8")
	// .attr("data-slider-id", "ex1Slider")
	// .attr("type", "text")
	// .attr("data-slider-min", "0")
	// .attr("data-slider-max", "20")
	// .attr("data-slider-step", "1")
	// .attr("data-slider-value", "14")

	// d3.select("#range")
	// .style('height', "60")
	// .style('width', "100%")

	var slider = new Slider("#ex8", {
		tooltip: 'always'});
	// Call a method on the slider
	var value = slider.getValue();

	slider
	.setValue(2007)
	.setValue(2008)
	.setValue(2009)
	.setValue(2010)
	.setValue(2011)
	.setValue(2012)
	.setValue(2013)
	.setValue(2014)
	.setValue(2015)
	.setValue(2016)
	.setValue(2017);


// read data
d3.csv("2016.csv", 
	function(d, i, columns) {
	// d.total = t;
	// console.log(d.total)
	// if(d.total < min) { min = d.total;};
	// if(d.total > max) { max = d.total;};
	return d;
},
function(error, data) {
	if (error) throw error;	

	var byState = {}; 
	data.forEach(function(d) {
		byState[d.country] = d[terr]; 
		// if(byState[d.country] < min) { min = byState[d.country];};
		// if(byState[d.country] > max) { max = byState[d.country];};
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
	var width = 1060.42;
	var height = 660;

	var projection = d3.geoEquirectangular()
	.fitExtent([[0,0], [width, height]], country);

	geoGenerator = d3.geoPath()
	.projection(projection);

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


	// d3.select("#"+ctry)
	// .style("stroke-width", "3px")
	// .style("fill","blue")


	// // radius of circle
	// var radius = d3.scaleSqrt()
	// .domain([min, max])
	// .range([0, 50]);
	// // console.log(country.features);
	// console.log(byState);

	// d3.select("svg").append("g")
	// .attr("class", "bubble")
	// .selectAll("circle")
	// .data(country.features.sort(function(a, b) { return byState[b] - byState[a]; }))
	// .enter()
	// .append("circle")
	// .attr("transform", function(d) { 
	// 	return "translate(" + geoGenerator.centroid(d) + ")"; })
	// .attr("r", function(d) { 
	// 	if (byState[d.properties.name]){
	// 	console.log(byState[d.properties.name]);
	// 	return radius(byState[d.properties.name]); 
	// 	}else{
	// 		return 0;
	// 	}
	// });

	// // Add legend
	// var legend = d3.select("svg").append("g")
	// .attr("class", "legend")
	// .attr("transform", "translate(" + (width - 900) + "," + (height - 250) + ")")
	// .selectAll("g")
	// .data([max/6, max/2, max])
	// .enter()
	// .append("g");

	// legend.append("circle")
	// .attr("cy", function(d) { return -radius(d); })
	// .attr("r", radius)
	// .attr("fill", "red")
	// .attr("stroke", "black")
	// .attr("fill-opacity", ".5");

	// legend.append("text")
	// .attr("y", function(d) { return -2 * radius(d); })
	// .attr("dy", "1.3em")
	// .attr("font-size", "12spx")
	// .text(d3.format(".1s"));

	var x = d3.scaleLinear()
	.domain([0, 1620])
	.rangeRound([600, 860]);

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



 // console.log(color)

 var g = d3.select("#svgmap").append("g")
 .attr("class", "key")
 .attr("transform", "translate(0,40)");

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
	// .style("fill","blue")
}
})

}

