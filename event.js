var min = Number.POSITIVE_INFINITY;
var max = Number.NEGATIVE_INFINITY;
var down = false;

map_func("All", "total", "2007");
chart_func("All", "total");

	var slider = new Slider("#year_selection", {
		tooltip: 'always'});
	var value = slider.getValue();

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
		}

d3.csv("country_whole.csv", 

	function(error, data) {
		if (error) throw error;	


		var byState = {}; 
		data.forEach(function(d) {
			// Create property for each State, give it value from data
			byState[d.id] = +d.total; 
		});
		
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
.on("mousedown", function(d){
	down = true;
	console.log(down)
})

$(document)
.mouseup(function(d){
	if(down){
		drawMapTable();
		down = false;
	}
});

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
	map_func(mod, buttonSelect, year);
	chart_func(mod, buttonSelect);
}