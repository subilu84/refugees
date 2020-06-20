// Define SVG area dimensions
var svgWidth = 450;
var svgHeight = 400;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 90,
  left: 69 
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg5 = d3.select("#departures")
  .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)
  .append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data 
d3.csv("https://raw.githubusercontent.com/subilu84/Project-2/master/data/departure2.csv", function(data) {

  console.log(data);

  data.forEach(function(d) {
    d.Total_departure = +d.Total_departure;

  });

  var xBandScale = d3.scaleBand()
    .domain(data.map(d => d.Year))
    .range([0, chartWidth])
    .padding(0.1);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Total_departure)])
    .range([chartHeight, 0]); // reversed range

    // Create two axis
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(5);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  svg5.append("g")
    .call(leftAxis);

  svg5.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create the rectangles

  svg5.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.Year))
    .attr("y", d => yLinearScale(d.Total_departure)) 
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.Total_departure))
    .attr("fill", "lightblue")

  // Add a label
  svg5.append("text")
  .attr("x", (chartWidth / 2))             
  .attr("y", 0 - (chartMargin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "12px") 
  .text("Amount of People that Depart by Year");

    
   

    });
    


