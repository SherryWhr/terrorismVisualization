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

