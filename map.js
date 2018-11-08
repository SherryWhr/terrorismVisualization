function map_func(ctry, terr) {
	console.log(ctry)
	console.log(terr)

	d3.selectAll("g > *").remove();

	var min = Number.POSITIVE_INFINITY;
	var max = Number.NEGATIVE_INFINITY;
	var ctry_id
	// var terr_id

// 	switch (terr) {
//     case "Armed Assault":
//         terr_id = 2;
//         break;
//     case "Assassination":
//         terr_id = 3;
//         break;
//     case "Bombing/Explosion":
//         terr_id = 4;
//         break;
//     case "Facility/Infrastructure Attack":
//         terr_id = 5;
//         break;
//     case "Hijacking":
//         terr_id = 6;
//         break;
//     case "Hostage Taking (Barricade Incident)":
//         terr_id = 7;
//         break;
//     case "Hostage Taking (Kidnapping)":
//         terr_id = 8;
//         break;
//     case "Unarmed Assault":
//         terr_id = 9;
//         break;
//     case "Unknown":
//         terr_id = 10;
//         break;
//     default:
//         terr_id = 11;
// }


// read data
d3.csv("2017.csv", 
	function(d, i, columns) {
		//console.log(d3.entries(d))
		// if (d[columns[1]] == ctry){
		// 	ctry_id = d[columns[0]]
		// 	console.log(ctry_id)
		// }


	// 	for (i = 2, t = 0; i < columns.length; ++i) {
	// 	//console.log(d[columns[i]])
	// 	t +=  (d[columns[i]] = +d[columns[i]]);
	// }

	// d.total = t;
	if(d.total < min) { min = d.total;};
	if(d.total > max) { max = d.total;};
	return d;
},
function(error, data) {
	if (error) throw error;	

	//console.log(d3.entries(d3.entries(data)[0].value)[terr_id])

	// data.forEach(function(d){
	// 	console.log(d[terr])
	// })

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
	.attr("id", function(d) { return d.country; })
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
	// console.log(country.features);
	console.log(byState);

	d3.select("svg").append("g")
	.attr("class", "bubble")
	.selectAll("circle")
	.data(country.features.sort(function(a, b) { return byState[b] - byState[a]; }))
	.enter()
	.append("circle")
	.attr("transform", function(d) { 
		return "translate(" + geoGenerator.centroid(d) + ")"; })
	.attr("r", function(d) { 
		if (byState[d.properties.name]){
		console.log(byState[d.properties.name]);
		return radius(byState[d.properties.name]); 
		}else{
			return 0;
		}
	});

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
	console.log
	d3.select("#"+ctry_id)
	.attr("fill", "orange")
}