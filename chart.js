
var widthOfWin=$(window).width(); 
function chart_func(ctry, terr) {
	var g=d3.select("#svgchart1").append("g");
	var g2=d3.select("#svgchart2").append("g");

// Initial drawable area values

var margin = {top: 20, right: 40, bottom: 20, left: 10},
width = widthOfWin*0.3233 - margin.left - margin.right,
height = 325 - margin.top - margin.bottom;

		 // Specify range of x axis, match state to width

		 var xScale = d3.scaleBand()
		 .rangeRound([0, width])
		 .paddingInner(0.5)
		 .paddingOuter(0.5);

		 	// Specify range of y axis, match population to height

		 	var yScale = d3.scaleLinear()
		 	.rangeRound([height, 20]);

		 	/*------------------ plot world chart ---------------------- */

		 	d3.csv("sum.csv",function(data){
		 		return{
		 			year : data.iyear,
		 			attack : data[terr]
		 		}
		 	},function(error,data){
		 		if(error) throw error;

		 		xScale.domain(data.map(function(d) { return d.year; }));
		 		yScale.domain([0, d3.max(data, function(d) { 
		 			return +d.attack; })]).nice();
		 		var xAxis = d3.axisBottom(xScale);
		 		var yAxis = d3.axisLeft(yScale);

		 		g.selectAll("dot")
		 		.data(data)
		 		.enter().append("circle")
		 		.attr("r", 3.5)
		 		.attr("cx", function(d) { return xScale(d.year)+40; })
		 		.attr("cy", function(d) { return yScale(d.attack); })
		 		.attr("fill","steelblue")
		 		.attr("stroke","steelblue")
		 		.on("mouseover", function(d) { 
		 			showNum.style("display", null);
		 			tooltip.style("display", null);})
		 		.on("mouseout", function(d) { 
		 			showNum.style("display","none")
		 			tooltip.style("display", "none"); })
		 		.on("mousemove", function(d) {
		 			showNum.text("num: "+d.attack);
		 			var xPosition = d3.mouse(this)[0] -5;
		 			var yPosition = d3.mouse(this)[1] -30;
		 			console.log(xPosition);
		 			console.log(yPosition);
		 			tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
		 			tooltip.select("text").text(d.attack);
		 		});
		 		var lineGenerator = d3.line()
		 		.x(function(d) { 
		 			return xScale(d.year)+40; 
		 		})
		 		.y(function(d) { 
		 			return yScale(d.attack); 
		 		});	

		 		/* plot path of the graph */
		 		g.append("path")
		 		.attr("class","chart")
		 		.style("fill", "none")
		 		.attr("stroke", "steelblue")
		 		.attr("stroke-width", 2)
		 		.attr("stroke-linejoin", "round")
		 		.attr("stroke-linecap", "round")
		 		.attr("d", lineGenerator(data));

		 		/* append x axis */
		 		g.append("g")
		 		.attr("class", "axisNormal")
		 		.attr("transform", "translate(30," + height + ")")
		 		.call(xAxis)
		 		.append("text")
		 		.attr("class", "label")
	            .attr("x", width) // x-offset from the xAxis, move label all the way to the right
	            .attr("y", -6)    // y-offset from the xAxis, moves text UPWARD!
	            .style("text-anchor", "end") // right-justify text
	            .attr("dy", "0.32em")
	            .attr("fill", "#000")
	            .attr("font-weight", "bold")
	            .text("Year");

		    // Add the Y Axis
		    g.append("g")
		    .attr("class", "axisNormal")
		    .attr("transform", "translate(30,0)")
		    .call(yAxis.ticks(null,"s"))
		    .append("text")
		    .attr("class", "label")
	        .attr("transform", "rotate(-90)") // although axis is rotated, text is not
	        .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
	        .style("text-anchor", "end")
	        .attr("fill", "#000")
	        .attr("font-weight", "bold")
	        .text("frequency of attacks");

	        var tooltip = g.append("g")
	        .attr("class", "tooltip")
	        .style("display", "none");

	        tooltip.append("rect")
	        .attr("width", 60)
	        .attr("height", 20)
	        .attr("fill", "red")
	        .style("opacity", 1);

	        g.append("text")
	        .attr("x", (width / 2))             
	        .attr("y", margin.top-5)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("text-decoration", "underline")  
	        .text("World");

	        var showNum=g.append("text")
	        .attr("x", (width-20))             
	        .attr("y", margin.top-5)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("fill","#895454");
	        
	    })
		 	/*---------------plot country chart---------------*/

		 	d3.csv("terrorism.csv",function(data){
		 		return{
		 			country: data.country,
		 			year: data.iyear,
		 			attack: data[terr]
		 		}
		 	},function(error,data){	
		 		if(error) throw error;
		 		filtered = data.filter(function (a) { return a.country == ctry; });
		 		xScale.domain([2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]);
		 		yScale.domain([0, d3.max(filtered, function(d) { 
		 			return +d.attack; })]).nice();
		 		var xAxis = d3.axisBottom(xScale);
		 		var yAxis = d3.axisLeft(yScale);

		 		g2.selectAll("dot")
		 		.data(filtered)
		 		.enter().append("circle")
		 		.attr("r", 3.5)
		 		.attr("cx", function(d) { return xScale(d.year)+40; })
		 		.attr("cy", function(d) { return yScale(d.attack); })
		 		.attr("fill","steelblue")
		 		.attr("stroke","steelblue")
		 		.on("mouseover", function(d) { 
		 			showNum.style("display",null);
		 			tooltip.style("display", null);})
		 		.on("mouseout", function(d) { 
		 			showNum.style("display","none");
		 			tooltip.style("display", "none"); })
		 		.on("mousemove", function(d) {
		 			
		 			var xPosition = d3.mouse(this)[0] -5;
		 			var yPosition = d3.mouse(this)[1] -30;
		 			console.log(xPosition);
		 			console.log(yPosition);
		 			tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
		 			tooltip.select("text").text(d.attack);
		 			showNum.text("num: " + d.attack);
		 		});

		 		var lineGenerator = d3.line()
		 		.x(function(d) { 
		 			return xScale(d.year)+40; 
		 		})
		 		.y(function(d) { 
		 			return yScale(d.attack); 
		 		});	

		 		/* plot path of the graph */
		 		g2.append("path")
		 		.attr("class","chart")
		 		.style("fill", "none")
		 		.attr("stroke", "steelblue")
		 		.attr("stroke-width", 2)
		 		.attr("stroke-linejoin", "round")
		 		.attr("stroke-linecap", "round")
		 		.attr("d", lineGenerator(filtered));

		 		g2.append("g")
		 		.attr("class", "axisNormal")
		 		.attr("transform", "translate(30," + height + ")")
		 		.call(xAxis)
		 		.append("text")
		 		.attr("class", "label")
		    .attr("x", width) // x-offset from the xAxis, move label all the way to the right
		    .attr("y", -6)    // y-offset from the xAxis, moves text UPWARD!
		    .style("text-anchor", "end") // right-justify text
		    .attr("dy", "0.32em")
		    .attr("fill", "#000")
		    .attr("font-weight", "bold")
		    .text("Year");

		    // Add the Y Axis
		    g2.append("g")
		    .attr("class", "axisNormal")
		    .attr("transform", "translate(30,0)")
		    .call(yAxis.ticks(null,"s"))
		    .append("text")
		    .attr("class", "label")
	        .attr("transform", "rotate(-90)") // although axis is rotated, text is not
	        .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
	        .style("text-anchor", "end")
	        .attr("fill", "#000")
	        .attr("font-weight", "bold")
	        .text("frequency of attacks");

	        var tooltip = g2.append("g")
	        .attr("class", "tooltip")
	        .style("display", "none");

	        tooltip.append("rect")
	        .attr("width", 60)
	        .attr("height", 20)
	        .attr("fill", "red")
	        .style("opacity", 1);

	        g2.append("text")
	        .attr("x", (width / 2))             
	        .attr("y", margin.top-5)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("text-decoration", "underline")  
	        .text(function(d){
	        	if(ctry=="All"||ctry=="Country/Region"){
	        		return("PLEASE SELECT A COUNTRY");
	        	}else{
	        		return ctry;
	        	}
	        });

	        var showNum=g2.append("text")
	        .attr("x", (width-20))             
	        .attr("y", margin.top-5)
	        .attr("text-anchor", "middle")  
	        .style("font-size", "16px") 
	        .style("fill","#895454");

	    })

		 }