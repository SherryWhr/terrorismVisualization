var min = Number.POSITIVE_INFINITY;
var max = Number.NEGATIVE_INFINITY;

map_func("All", "total", "2007");
//drawMapTable();
chart_func("All", "total");

// d3.select("#svgslider")
	// .append("input")
	// .attr("id", "ex8")
	// .attr("data-slider-id", "yearSlider")
	// .attr("type", "text")
	// .attr("data-slider-min", "0")
	// .attr("data-slider-max", "20")
	// .attr("data-slider-step", "1")
	// .attr("data-slider-value", "14")

	// d3.select("#range")
	// .style('height', "60")
	// .style('width', "100%")

	var slider = new Slider("#year_selection", {
		tooltip: 'always'});
	var value = slider.getValue();
	console.log(value)

	// slider
	// .setValue(2007)
	// .setValue(2008)
	// .setValue(2009)
	// .setValue(2010)
	// .setValue(2011)
	// .setValue(2012)
	// .setValue(2013)
	// .setValue(2014)
	// .setValue(2015)
	// .setValue(2016)
	// .setValue(2017);

function openCity(evt, cityName) {
			var i, tabcontent, tablinks;
			tabcontent = document.getElementsByClassName("tabcontent");
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = "none";
			}
			tablinks = document.getElementsByClassName("tablinks");
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(" active", "");
			}
			document.getElementById(cityName).style.display = "block";
			//evt.currentTarget.className += " active";
		}

d3.csv("country_whole.csv", 
	// function(d, i, columns) {
	// 	for (i = 2, t = 0; i < columns.length; ++i) {
	// 		t +=  (d[columns[i]] = +d[columns[i]]);
	// 	}
	// 	d.total = t;
	// 	if(t < min) { min = t;};
	// 	if(t > max) { max = t;};
	// 	return d;
	// },
	function(error, data) {
		if (error) throw error;	


		var byState = {}; 
		data.forEach(function(d) {
			// Create property for each State, give it value from data
			byState[d.id] = +d.total; 
		});
		console.log(data[0].x)
		d3.select("#iMode")
		.selectAll("option")
		.data(data)
		.enter()
		.append("option")
		.attr("value", function(d){
			return d.x
		})
		.text(function(d){
			return d.x
		})

	})

// Change name selection
d3.selectAll("button")
.on("click", changed);

d3.selectAll("#iMode")
.on("change", changed)

d3.selectAll("#yearSlider")
.on("mouseup", drawMapTable)


// Change from selection
function changed() {
	// Get mode from the dropdown select
	var sect = document.getElementById("iMode");
	var mod = sect.options[sect.selectedIndex].value;

	// Get button
	var button = document.getElementsByClassName("tabcontent");
	var buttonSelect;

	for (i = 0; i < button.length; i++){
		if(button[i].style.display=="block"){
			buttonSelect = button[i].id;
		}}

	// mod is selected country, buttonSelect Selected attack type
	drawMapTable();
	chart_func(mod, buttonSelect);
	}


function drawMapTable(){ 
	console.log("draw map table")
	// Get mode from the dropdown select
	var sect = document.getElementById("iMode");
	var mod = sect.options[sect.selectedIndex].value;

	// Get button
	var button = document.getElementsByClassName("tabcontent");
	var buttonSelect;

	for (i = 0; i < button.length; i++){
		if(button[i].style.display=="block"){
			buttonSelect = button[i].id;
		}}

	var year = document.getElementById("year_selection").value
	console.log("year_selection")
	console.log(document.getElementById("year_selection"))
	map_func(mod, buttonSelect, year);
	chart_func(mod, buttonSelect);
}