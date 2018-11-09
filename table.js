console.log("table js");
var widthOfWin=$(window).width(); //the width of window
console.log(widthOfWin);

var margin = {top: 20, right: 40, bottom: 20, left: 10},
    width =  widthOfWin/2- margin.left - margin.right,
    height = 325 - margin.top - margin.bottom;
   
// var svg=d3.select("#svgtable")
//     .attr("width",widthOfWin)
//     .attr("height",600);

function tabulate(columnNames, data) {
    var table = d3.select('body').append('table');
    var thead = table.append('thead');
    var	tbody = table.append('tbody');

    // append the header row
    thead.append('tr')
      .selectAll('th')
      .data(columnNames)
      .enter()
      .append('th')
      .text(function (d) { 
          return d; 
      });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr');

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
      .data(function (row) {
        return columnNames.map(function (columnName) {
          return {
              key: columnName, 
              value: row[columnName]
          };
        });
      })
      .enter()
      .append('td')
      .text(function (d) { 
          return d.value; 
      });

  return table;
}

d3.csv("terrorism.csv",function(error,data){
    if(error) throw error;

    var keys = data.columns;
    
    console.log(keys);
    tabulate(keys,data);
})