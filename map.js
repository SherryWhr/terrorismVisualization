function map_func(ctry, terr) {
	console.log(ctry)
	console.log(terr)

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


	var byState = {}; 
	data.forEach(function(d) {
// Create property for each State, give it value from data
byState[d.id] = +d.total; 
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
	.attr("id", function(d) { return d.id; })
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


	// radius of circle
	var radius = d3.scaleSqrt()
	.domain([min, max])
	.range([0, 50]);
	console.log(country.features);

	d3.select("svg").append("g")
	.attr("class", "bubble")
	.selectAll("circle")
	.data(country.features.sort(function(a, b) { return byState[b] - byState[a]; }))
	.enter()
	.append("circle")
	.attr("transform", function(d) { 
		return "translate(" + geoGenerator.centroid(d) + ")"; })
	.attr("r", function(d) { return radius(byState[d.id]); });

	// Add legend
	var legend = d3.select("svg").append("g")
	.attr("class", "legend")
	.attr("transform", "translate(" + (width - 900) + "," + (height - 250) + ")")
	.selectAll("g")
	.data([max/6, max/2, max])
	.enter()
	.append("g");

	legend.append("circle")
	.attr("cy", function(d) { return -radius(d); })
	.attr("r", radius)
	.attr("fill", "red")
	.attr("stroke", "black")
	.attr("fill-opacity", ".5");

	legend.append("text")
	.attr("y", function(d) { return -2 * radius(d); })
	.attr("dy", "1.3em")
	.attr("font-size", "12spx")
	.text(d3.format(".1s"));
}


})


}