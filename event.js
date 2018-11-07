d3.csv("world_population.csv", 
	function(d, i, columns) {
		for (i = 2, t = 0; i < columns.length; ++i) {
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
		console.log(data[0].name)
		d3.select("#iMode")
		.selectAll("option")
		.data(data)
		.enter()
		.append("option")
		.attr("value", function(d){
			return d.name
		})
		.text(function(d){
			return d.name
		})

	})

// Change name selection
d3.selectAll("button")
.on("click", changed);

d3.selectAll("#iMode")
.on("change", changed)


// Change from selection
function changed() {
	// Get mode from the dropdown select
	var sect = document.getElementById("iMode");
	var mod = sect.options[sect.selectedIndex].value;
	console.log(mod);

	// Get button
	var button = document.getElementsByClassName("tabcontent");
	var buttonSelect;

	for (i = 0; i < button.length; i++){
		if(button[i].style.display=="block"){
			buttonSelect = button[i].id;
			console.log(buttonSelect);
		}}

	}