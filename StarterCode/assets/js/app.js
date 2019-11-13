// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;
current_X = ""
current_Y = ""
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//
//
//start chart off with poverty and healthcare values
current_X = "healthcare"
current_Y = "poverty"

var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);


d3.csv("/assets/data/data.csv").then(function(data) {
    data.forEach(function(x) {
        x.poverty = +x.poverty;
        x.healthcare = +x.healthcare;
        x.obesity = +x.obesity;
        x.income = +x.income;
      });
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([0, width]);
    
    var yScale = d3.scaleLinear()
        .domain([5, d3.max(data, d => d.poverty)])
        .range([height, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)
        .attr("class", "xaxis");

    chartGroup.append("g")
        .call(leftAxis)
        .attr("class", "yaxis");




    chartGroup.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.healthcare))
    .attr("cy", d => yScale(d.poverty))
    .attr("r", "15")
    .attr("fill", "red")
    .attr("opacity", ".5")
    .attr("class", "circles");

    chartGroup.selectAll("g.text")
    .data(data)
    .enter()  
    .append("text")
    .attr("x", d => xScale(d.healthcare))
    .attr("y", d => yScale(d.poverty)+4)
    .attr("text-anchor", "middle")
    .text(d => d.abbr)
    .attr("class", "circle_abbr");

    chartGroup.append("text")
    .attr("x", width / 2 - 20)
    .attr("y", height + 40)
    .text("Healthcare Value")
    .attr("font-weight", "bold")
    .attr("class", "healthcare_value_label");
  
    chartGroup.append("text")
    .attr("x", -height / 2)
    .attr("y", -35)
    .attr("transform", "rotate(-90)")
    .text("Poverty Value")
    .attr("font-weight", "bold")
    .attr("class", "poverty_value_label");

    chartGroup.append("text")
    .attr("x", width / 2 - 20)
    .attr("y", height + 60)
    .text("Household Income")
    .attr("class", "household_value_label");
  

//
//
//OBESE AXIS CHANGE
    chartGroup.append("text")
    .attr("x", -height / 2)
    .attr("y", -55)
    .attr("class", "obese_value_label")
    .attr("transform", "rotate(-90)")
    .text("Obese %")
    .on("click", function(d) {
      current_Y = "obese"
      chartGroup.selectAll(".yaxis").remove();
      
      chartGroup.selectAll(".poverty_value_label").attr("font-weight", "normal")

      chartGroup.selectAll(".obese_value_label")
      .attr("font-weight", "bold");
      var yScale = d3.scaleLinear()
          .domain([18, d3.max(data, d => d.obesity)])
          .range([height, 0]);

      var bottomAxis = d3.axisBottom(xScale);
      var leftAxis = d3.axisLeft(yScale);

      // chartGroup.append("g")
      //     .attr("transform", `translate(0, ${height})`)
      //     .call(bottomAxis);

      chartGroup.append("g")
          .call(leftAxis)
          .attr("class", "yaxis");

      circle = chartGroup.selectAll("circle")
      circle.transition()
      .duration(500)
      .attr("cy", d => yScale(d.obesity));

      stateabbr = chartGroup.selectAll(".circle_abbr");
      stateabbr.transition()
      .duration(500)
      .attr("y", d => yScale(d.obesity)+4);
    });
//
//
//POVERTY AXIS 
chartGroup.selectAll(".poverty_value_label")
.on("click", function(d) {
  current_Y = "poverty"
  chartGroup.selectAll(".yaxis").remove();
  // chartGroup.SelectAll("circles").remove();
  chartGroup.selectAll(".obese_value_label").attr("font-weight", "normal");

  chartGroup.selectAll(".poverty_value_label").attr("font-weight", "bold");

  var yScale = d3.scaleLinear()
      .domain([5, d3.max(data, d => d.poverty)])
      .range([height, 0]);

  // var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  // chartGroup.append("g")
  //     .attr("transform", `translate(0, ${height})`)
  //     .call(bottomAxis);

  chartGroup.append("g")
      .call(leftAxis)
      .attr("class", "yaxis");
    
  circle = chartGroup.selectAll("circle");
  circle.transition()
  .duration(500)
  .attr("cy", d => yScale(d.poverty));

  stateabbr = chartGroup.selectAll(".circle_abbr");
  stateabbr.transition()
  .duration(500)
  .attr("y", d => yScale(d.poverty)+4);
  });
//
//
//Household Income axis
chartGroup.selectAll(".household_value_label")
.on("click", function(d) {
  current_X = "income"
  chartGroup.selectAll(".xaxis").remove();

  chartGroup.selectAll(".healthcare_value_label").attr("font-weight", "normal");

  chartGroup.selectAll(".household_value_label").attr("font-weight", "bold");

  var xScale = d3.scaleLinear()
    .domain([35000, d3.max(data, d => d.income)])
    .range([0, width]);

  var bottomAxis = d3.axisBottom(xScale);
  // var leftAxis = d3.axisLeft(yScale);

  chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis)
      .attr("class", "xaxis");

  // chartGroup.append("g")
  //     .call(leftAxis)
  //     .attr("class", "yaxis");
    
  circle = chartGroup.selectAll("circle");
  circle.transition()
  .duration(500)
  .attr("cx", d => xScale(d.income));

  stateabbr = chartGroup.selectAll(".circle_abbr");
  stateabbr.transition()
  .duration(500)
  .attr("x", d => xScale(d.income));
  });  
//
//
//healcare axis
chartGroup.selectAll(".healthcare_value_label")
.on("click", function(d) {
  current_X = "healthcare"
  chartGroup.selectAll(".xaxis").remove();

  chartGroup.selectAll(".household_value_label").attr("font-weight", "normal");

  chartGroup.selectAll(".healthcare_value_label").attr("font-weight", "bold");

  var xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.healthcare)])
    .range([0, width]);

  var bottomAxis = d3.axisBottom(xScale);
  // var leftAxis = d3.axisLeft(yScale);

  chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis)
      .attr("class", "xaxis");

  // chartGroup.append("g")
  //     .call(leftAxis)
  //     .attr("class", "yaxis");
    
  circle = chartGroup.selectAll("circle");
  circle.transition()
  .duration(500)
  .attr("cx", d => xScale(d.healthcare));

  stateabbr = chartGroup.selectAll(".circle_abbr");
  stateabbr.transition()
  .duration(500)
  .attr("x", d => xScale(d.healthcare));

  }); 



});
// var tip = d3.tip()
// .attr('class', 'd3-tip')
// .html(function(d) { return d };

// /* Initialize tooltip */
// // tip = d3.tip()
// // .attr('class', 'd3-tip')
// // .html(function(d) { return d; });

// /* Invoke the tip in the context of your visualization */
// chartGroup.call(tip)

// svg.selectAll('.circles')
//   .data(data)
//   .enter()
//   .attr("class", "d3-tip")
//   .on('mouseover', function(x) {
//     svg.selectAll(".circles")
//     .append('div')
//     .html('test')
//   };





