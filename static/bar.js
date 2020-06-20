

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 120, left: 60},
        width = 450- margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    var svg = d3.select("#my_bargraph")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
    
    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/gresamurati/refugee-project/master/demo_10.csv", function(data) {
    
      // sort data
      data.sort(function(b, a) {
        return a.Value - b.Value;
      });
    
      // X axis
      var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.Origin; }))
        .padding(0.2);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
          .attr("transform", "translate(-10,0)rotate(-45)")
          .style("text-anchor", "end");
    
      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 27000])
        .range([ height, 0]);
      svg.append("g")
        .call(d3.axisLeft(y));
    
  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width -170)
      .attr("y", height + margin.top + 35)
      .text("Countries of Origin");
  
  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+ 10)
      .attr("x", -margin.top -20)
      .text("Annual Average Number of Refugees")
  
    
      // Bars
      svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.Origin); })
          .attr("y", function(d) { return y(d.Total); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.Total); })
          .attr("fill", "#B0C4DE")
  
          .on("mousemove", function(d){
              tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html(d.Total);
          })
              .on("mouseout", function(d){ tooltip.style("display", "none");});
    
    svg.append("text")
            .attr("x", (width / 2))             
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")  
            .style("font-size", "13px") 
            .style("text-decoration", "underline")  
            .text("Annual Average of World Refugees by Country of Origin (2017-2020)");
    })
    
