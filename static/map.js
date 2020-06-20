
var e = document.getElementById("cars");
var strUser = e.options[e.selectedIndex].value;

function mappy(year=2008){ 

 
// The svg
var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
  .center([0,20])                // GPS of location to zoom on
  .scale(110)                       // This is like the zoom
  .translate([ width/2, height/2 ])

d3.queue()
.defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
.defer(d3.csv, "https://raw.githubusercontent.com/gresamurati/refugee-project/master/unhcr_cleaned2-git.csv") // Position of circles
.await(ready);

function ready(error, dataGeo, data) {

// Filter the data to include only fruit of interest
var data = data.filter(function(d){
              return d.Year == year;
            })

console.log(data)

// Create a color scale
var allContinent = d3.map(data, function(d){return(d.Asylum_Country)}).keys()
var color = d3.scaleOrdinal()
  .domain(allContinent)
  .range(d3.schemePaired);

// Add a scale for bubble size
var valueExtent = d3.extent(data, function(d) { return +d.Total_Population; })
var size = d3.scaleSqrt()
  .domain(valueExtent)  // What's in the data
  .range([ 1, 50])  // Size in pixel

// Draw the map
svg.append("g")
    .selectAll("path")
    .data(dataGeo.features)
    .enter()
    .append("path")
      .attr("fill", "#5F9EA0")
      .attr("d", d3.geoPath()
          .projection(projection)
      )
    .style("stroke", "none")
    .style("opacity", .3)

   svg.on("mousemove", function(d,i) {
      var coors = d3.mouse(this);
      tooltip.classed("hidden", false)
        .attr("style", "left:"+(coors.x)+"px;top:"+(coors.y)+"px")  //<- use d3.mosue to get position
        .html(d.Asylum_Country);  //<-- bound data d is passed...                                                   
      });

// Add Tooltip

var tooltip = d3.select("#maptooltip").append("div")
.style("opacity", 5)
     
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("width", "auto")
      .style("height", "auto")

// Add circles:
svg
  .selectAll("myCircles")
  .data(data.sort(function(a,b) { return +b.Total_Population - +a.Total_Population }).filter(function(d,i){ return i<1000 }))
  .enter()
  .append("circle")
    .attr("cx", function(d){ return projection([+d.longitude, +d.latitude])[0] })
    .attr("cy", function(d){ return projection([+d.longitude, +d.latitude])[1] })
    .attr("r", function(d){ return size(+d.Total_Population) })
    .style("fill", "#4c8bf5")
   
    .attr("stroke", function(d){ if(d.Total_Population>2000){return "black"}else{return "none"}  })
    .attr("stroke-width", 1)
    .attr("fill-opacity", .4)

  .on("mouseover", function(d) {
    tooltip.transition()
      .style('opacity', .9)
      .style('background', 'steelblue')
      .text("(Asylum Country): " + d.Asylum_Country + " (Total # of Asylees): " + d.Total_Population)
      .style('left', (d3.event.pageX - 35) + 'px')
      .style('top', (d3.event.pageY - 30) + 'px')
      .duration(100);
  })
  .on("mouseout",function(d) {
     tooltip.transition()
       .style("opacity", "0")
       .duration(50);
  })
// Add title and explanation
svg
  .append("text")
    .attr("text-anchor", "end")
    .style("fill", "black")
    .attr("x", width - 10)
    .attr("y", height - 30)
    .attr("width", 90)
    .html("Global Refugee Populations")
    .style("font-size", 24)


          }
        }
       

// When the button is changed, run the updateChart function
d3.select("#cars").on("change", function(d) {
// recover the option that has been chosen
d3.selectAll("circle").remove();
d3.select("#maptooltip").selectAll("div").remove();



var e = document.getElementById("cars");
var strUser = e.options[e.selectedIndex].value;
console.log(parseInt(strUser))

mappy(parseInt(strUser))



})

mappy(parseInt(strUser))