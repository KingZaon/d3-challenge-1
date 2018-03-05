function init(xAxisParam, yAxisParam){

  console.log("X Axis: ", xAxisParam);
  console.log("Y Axis: ", yAxisParam);

  // Define SVG area dimensions
  var svgWidth = 800;
  var svgHeight = 600;

  // Define the chart's margins as an object
  var margin = {
    top: 60,
    right: 60,
    bottom: 100,
    left: 160
  };

  // Define dimensions of the chart area
  var chartWidth = svgWidth - margin.left - margin.right;
  var chartHeight = svgHeight - margin.top - margin.bottom;

  d3.select("svg").remove();

  // Select body, append SVG area to it, and set its dimensions
  var svg = d3
    .select("body")
      .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        // Append a group area, then set its margins
        .append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

  factorY = 1;
  yLabel1 = "Heavy Drinker (%)";
  yLabel2 = "Obese (BMI > 30) (%)";
  yLabel3 = "Sedentary (%)";
  yLabel4 = "Current Smoker (%)";
  xLabel1 = "Not High School Grad (%)";
  xLabel2 = "High School Grad or eq. (%)";
  xLabel3 = "Some College (%)";
  xLabel4 = "Bachelor Degree or Higher (%)";

  factorX = 1;

  // Load data from forcepoints.csv
  d3.csv("data.csv", function(error, csvData) {

    var xLimits = d3.extent(csvData, function(data) {
      data[xAxisParam] = parseFloat(data[xAxisParam]);
      return data[xAxisParam];
    });
    var yLimits = d3.extent(csvData, function(data) {
      data[yAxisParam] = parseFloat(data[yAxisParam]);
      return data[yAxisParam];
    })
    var minX1 = xLimits[0] - (1*factorX);
    var minY1 = yLimits[0] - (0.5*factorY);
    var maxX1 = xLimits[1] + (1.5*factorX);
    var maxY1 = yLimits[1] + (1*factorY) ;
    console.log("Limits:"+"minX:"+minX1+";maxX:"+maxX1+"minY:"+minY1+";maxY:"+maxY1);

    // Throw an error if one occurs
    if (error) throw error;

    // Print the csvData
    console.log(csvData);

    d3.selectAll("circle").remove();

    // Format the date and cast the force value to a number
    csvData.forEach(function(data) {

      var node = d3.select("svg").append('g');
      var xLoc = (chartWidth) - (chartWidth * (((((maxX1-minX1)) - (data[xAxisParam]-minX1) ))/(maxX1-minX1))) + margin.left;
      var yLoc = (chartHeight) - (chartHeight * 1/(maxY1-minY1) * (data[yAxisParam] - minY1)  ) + margin.top

      var d = data;
      console.log(d.state);
      node
        .append("circle")
          .attr("class", "circle")
          .attr("cx", xLoc)
          .attr("cy", yLoc)
          .attr("r", 12)
          .style("fill", "lightblue" )
        .append("title")
          .attr("text-anchor","middle")
          .text(data['state']+"\n"+'------------------'+"\n"+xAxisParam+": "+data[xAxisParam]+"\n"+yAxisParam+": "+data[yAxisParam])

      node
        .append("text")
          .attr("text-anchor", "middle")
          .style("fill","white")
          .attr("x", xLoc)
          .attr("y", yLoc+5)
          .text(data.abbr)
    });

    // Configure a linear scale with a range between 0 and the chartWidth
    var xLinearScale = d3.scaleLinear().range([0, chartWidth]);

    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale = d3.scaleLinear().range([chartHeight, 0]);

    // Set the domain for the xLinearScale function
    xLinearScale.domain([ minX1, maxX1]);

    // Set the domain for the xLinearScale function
    yLinearScale.domain([ minY1, maxY1 ]);

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append an SVG group element to the SVG area, create the left axis inside of it
    svg.append("g")
      .attr("class", "y-axis")
      .call(leftAxis);

    // Append an SVG group element to the SVG area, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0, " + chartHeight + ")")
      .call(bottomAxis);

    svg
      .append("g")
        .attr("transform", "translate(0, " + chartHeight + ")")
      .append("text")
        .attr("text-anchor","middle")
        .attr("class", "heavyDrinker")
        .attr("transform","rotate(-90)")
        .attr("x", svgHeight/3)
        .attr("y", -svgWidth/20)
        .style("font-weight", "")
        .style("fill", "black")
        .on("click", function () {
          init(xAxisParam, "heavyDrinker");
        })
        .text(yLabel1);

    svg
      .append("g")
        .attr("transform", "translate(0, " + chartHeight + ")")
      .append("text")
        .attr("text-anchor","middle")
        .attr("class", "obese")
        .attr("transform","rotate(-90)")
        .attr("x", svgHeight/3)
        .attr("y", -(svgWidth/20 + (margin.left/8)))
        .style("font-weight", "")
        .style("fill", "black")
        .on("click", function () {
          init(xAxisParam, "obese");
        })
        .text(yLabel2);

    svg
      .append("g")
        .attr("transform", "translate(0, " + chartHeight + ")")
      .append("text")
        .attr("text-anchor","middle")
        .attr("class", "sedentary")
        .attr("transform","rotate(-90)")
        .attr("x", svgHeight/3)
        .attr("y", -(svgWidth/20 + (margin.left/4)))
        .style("font-weight", "")
        .style("fill", "black")
        .on("click", function () {
          init(xAxisParam, "sedentary");
        })
        .text(yLabel3);

    svg
          .append("g")
            .attr("transform", "translate(0, " + chartHeight + ")")
          .append("text")
            .attr("text-anchor","middle")
            .attr("class", "currentSmoker")
            .attr("transform","rotate(-90)")
            .attr("x", svgHeight/3)
            .attr("y", -(svgWidth/20 + (margin.left/2.7)))
            .style("font-weight", "")
            .style("fill", "black")
            .on("click", function () {
              init(xAxisParam, "currentSmoker");
            })
            .text(yLabel4);

    svg
      .append("g")
        .attr("transform", "translate(" + chartWidth + ", 0)")
      .append("text")
        .attr("text-anchor","middle")
        .attr("class", "notHighSchoolGrad")
        .attr("x", -svgWidth/3)
        .attr("y", chartHeight+margin.top-(margin.bottom/5))
        .style("font-weight", "")
        .style("fill", "black")
        .on("click", function () {
          init("notHighSchoolGrad", yAxisParam);
        })
        .text(xLabel1);

    svg
      .append("g")
        .attr("transform", "translate(" + chartWidth + ", 0)")
      .append("text")
        .attr("text-anchor","middle")
        .attr("class", "highSchoolGrad")
        .attr("x", -svgWidth/3)
        .attr("y", chartHeight+margin.top)
        .style("font-weight", "")
        .style("fill", "black")
        .on("click", function () {
          init("highSchoolGrad", yAxisParam);
        })
        .text(xLabel2);

    svg
      .append("g")
        .attr("transform", "translate(" + chartWidth + ", 0)")
      .append("text")
        .attr("text-anchor","middle")
        .attr("class", "someCollege")
        .attr("x", -svgWidth/3)
        .attr("y", chartHeight+margin.top+(margin.bottom/2.5))
        .style("font-weight", "")
        .style("fill", "black")
        .on("click", function () {
          init("someCollege", yAxisParam);
        })
        .text(xLabel3);

    svg
        .append("g")
          .attr("transform", "translate(" + chartWidth + ", 0)")
        .append("text")
          .attr("text-anchor","middle")
          .attr("class", "bachelorOrHigher")
          .attr("x", -svgWidth/3)
          .attr("y", chartHeight+margin.top+(margin.bottom/5))
          .style("font-weight", "")
          .style("fill", "black")
          .on("click", function () {
            init("bachelorOrHigher", yAxisParam);
          })
          .text(xLabel4);

    d3.selectAll("." + xAxisParam).style("font-weight", "bold");
    d3.selectAll("." + xAxisParam).style("fill", "blue");

    d3.selectAll("." + yAxisParam).style("font-weight", "bold");
    d3.selectAll("." + yAxisParam).style("fill", "blue");


  });

};

init("notHighSchoolGrad", "heavyDrinker");
