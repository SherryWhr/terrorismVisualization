

d3.csv("world_population.tsv", 
		function(d, i, columns) {
			for (i = 1, t = 0; i < columns.length; ++i) {
				t +=  (d[columns[i]] = +d[columns[i]]);
			}
			d.total = t;
			// if(t < min) { min = t;};
			// if(t > max) { max = t;};
			return d;
		},
		function(error, data) {
			if (error) throw error;
			console.log(data)
			d3.select("#iMode")
			.selectAll("option")
			.data(data)
			.enter()
			.append("option")
			.attr("value", data[0])
		
		})

