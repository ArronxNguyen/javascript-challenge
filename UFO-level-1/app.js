// from data.js
var tableData = data;

// YOUR CODE HERE!

// Get a reference to the table body
let tbody = d3.select("tbody");
// define references to date field and buttons
//var dateField = d3.select("#datetime");
var button = d3.select("#filter-btn");

// Fill table with data.js
function tableDisplay() {
    // Get a reference to the table body
    tbody;
    data.forEach((record) => {
      var row = tbody.append("tr");
      Object.entries(record).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.html(value);
      });
    });
  };

// populate table
tableDisplay (tableData);


  // Clear existing data
  function deleteTbody(){
    tbody.selectAll("tr").remove()
    .selectAll("td").remove();
  };


  // set function to filter the table by date
  function filterDate(){

        // Prevent the page from refreshing
        d3.event.preventDefault();

        //Clear any data
        deleteTbody();

        // pick up the entered date values
        var userDate = d3.select("#datetime").property("value");

        // apply filter if user entered a date, if value is blank then fill with full table
        if(userDate.trim() === ""){
          tbody.html("") + tableDisplay();}
                
        else{
        // filter tableData to keep rows Where datetime match filtered value
        var tableMatch = tableData.filter(row => row.datetime === userDate);

        // Clear existing table
        //tbody.html("");
        d3.select("tbody").html("");

        // then fill table with data that matches user input
        tableMatch.forEach(row => {
            tbody.append("tr");
        
            for (key in row){
                const cell = tbody.append("td");
                cell.text(row[key]);
            }
        });
        
    };
}

// run function filterDate when user clicks the buttons
button.on("click", filterDate);


