
//var g=d3.select("#svgchart1").append("g");
//var g2=d3.select("#svgchart2").append("g");
var widthOfWin=$(window).width(); 
function chart_func(ctry, terr) {
	// console.log(ctry)
	// console.log(terr)
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


		    // var valueline = d3.svg.line()
		    //     .x(function(d) { return x(d.year); })
		    //     .y(function(d) { return y(d.attack); });

		    /*------------------ plot world chart ---------------------- */

	d3.csv("sum.csv",function(data){
		    //console.log(data[terr]);
		    return{
		    	year : data.iyear,
		    	attack : data[terr]
		    }
		},function(error,data){
			if(error) throw error;
			// console.log("finished read data");
			// console.log(data[1]);

			xScale.domain(data.map(function(d) { return d.year; }));
			yScale.domain([0, d3.max(data, function(d) { 
		        //console.log("test y axis");
		        //console.log(d.attack);
		        return +d.attack; })]).nice();
			var xAxis = d3.axisBottom(xScale);
			var yAxis = d3.axisLeft(yScale);
			//var g=d3.select("#svgchart1").append("g");
		    // var chart = d3LineWithLegend()
		    //  .xAxis.label('year')
		    //  .width(width(margin))
		    //  .height(height(margin))
		    //  .yAxis.label('frequency of attacks');

		    // var g = d3.select("body")
		    //     .append("svg")
		    //     .attr("width", 1000)
		    //     .attr("height", 600);
		        //.append("path")
		        //.attr("class","line");
			//.attr("d", valueline(data));

			// var tipMouseover = function(d) {
			// 		// var color = colorScale(d.manufacturer);
			// 	var html  = d.year + "<br/>" +
			// 					"<span style='color:steelblue;'>" + d.attack + "</span>";
			// 		console.log("html");
			// 		tooltip.html(html)
			// 			.style("left", (d3.event.pageX + 15) + "px")
			// 			.style("top", (d3.event.pageY - 28) + "px")
			// 		  .transition()
			// 			.duration(200) // ms
			// 			.style("opacity", .9);
			// 		};

			// var tipMouseout = function(d) {
			// 	console.log("mouseout");
			// 	tooltip.transition()
			// 				.duration(300) // ms
			// 				.style("opacity", 0); // don't care about position!
			// 			};
			g.selectAll("dot")
				.data(data)
				.enter().append("circle")
				.attr("r", 3.5)
				.attr("cx", function(d) { return xScale(d.year)+40; })
				.attr("cy", function(d) { return yScale(d.attack); })
				.attr("fill","steelblue")
				// .attr("opacity","0.8")
				.attr("stroke","steelblue")
	        .on("mouseover", function(d) { 
				showNum.style("display", null);
				tooltip.style("display", null);})
	        .on("mouseout", function(d) { 
				showNum.style("display","none")
				tooltip.style("display", "none"); })
	        .on("mousemove", function(d) {
					//console.log(d);
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

		                tooltip.append("text")
		                  .attr("x", 30)
		                  .attr("dy", "1.2em")
		                  .style("text-anchor", "middle")
		                  .attr("fill","darkOrange")
		                  .style("font-size", "16px")
		                  .style("font-weight", "bold");
			
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
				.style("fill","darkOrange");
        		//.style("text-decoration", "underline")  
        		//.text("World");


		//     g.dispatch.on('showTooltip', function(e) {
		//          var offset = $('#test1').offset(), // { left: 0, top: 0 }
		//         left = e.pos[0] + offset.left,
		//         top = e.pos[1] + offset.top,
		//         formatter = d3.format(".04f");

		//          var content = '<h3>' + e.series.label + '</h3>' +
		//                   '<p>' +
		//                   '<span class="value">[' + e.point[0] + ', ' + formatter(e.point[1]) + ']</span>' +
		//                   '</p>';

		//         nvtooltip.show([left, top], content);
		//   });

		//   chart.dispatch.on('hideTooltip', function(e) {
		//     nvtooltip.cleanup();
		//   });
		// add the y Axis
			// d3.select("#svgchart1").append("g")
			// .attr("class", "axisNormal")
			// .call(yAxis)
			// .append("text")
			// .attr("x", -45)
			// .attr("y", y(y.ticks().pop()) + 8)
			// .attr("fill", "#000")
			// .attr("text-anchor", "start")
			// .attr("font-size", 8)
			// .attr("transform", "rotate(-90)")
			// .text("Area (sq mi)");
		
		
		})
/*---------------plot country chart---------------*/

d3.csv("terrorism.csv",function(data){
			//console.log(data[terr]);
			return{
				country: data.country,
				year: data.iyear,
				attack: data[terr]
			}
		},function(error,data){	
			if(error) throw error;
			// console.log("draw country plot");
			// console.log(data);
			filtered = data.filter(function (a) { return a.country == ctry; });
			// console.log(filtered);
			xScale.domain([2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017]);
			yScale.domain([0, d3.max(filtered, function(d) { 
				// console.log("chart2 test y axis");
				// console.log(d.attack);
				return +d.attack; })]).nice();
			var xAxis = d3.axisBottom(xScale);
			var yAxis = d3.axisLeft(yScale);
			
			//var g2=d3.select("#svgchart2").append("g");

			g2.selectAll("dot")
			.data(filtered)
			.enter().append("circle")
			.attr("r", 3.5)
			.attr("cx", function(d) { return xScale(d.year)+40; })
			.attr("cy", function(d) { return yScale(d.attack); })
			.attr("fill","steelblue")
			// .attr("opacity","0.8")
			.attr("stroke","steelblue")
			.on("mouseover", function(d) { 
				showNum.style("display",null);
				tooltip.style("display", null);})
			.on("mouseout", function(d) { 
				showNum.style("display","none");
				tooltip.style("display", "none"); })
			.on("mousemove", function(d) {
				//console.log(d);
				
				var xPosition = d3.mouse(this)[0] -5;
				var yPosition = d3.mouse(this)[1] -30;
				console.log(xPosition);
				console.log(yPosition);
				tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
				tooltip.select("text").text(d.attack);
				//showNum.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
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

		                  tooltip.append("text")
		                  .attr("x", 30)
		                  .attr("dy", "1.2em")
		                  .style("text-anchor", "middle")
		                  .attr("fill","darkOrange")
		                  .attr("font-size", "12px")
		                  .attr("font-weight", "bold");

					g2.append("text")
						  .attr("x", (width / 2))             
						  .attr("y", margin.top-5)
						  .attr("text-anchor", "middle")  
						  .style("font-size", "16px") 
						  .style("text-decoration", "underline")  
						  .text(function(d){
							  //console.log("test ctry: "+ctry);
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
						  .style("fill","darkOrange");

		              })
	
	}