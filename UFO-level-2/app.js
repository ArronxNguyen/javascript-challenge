// from data.js
var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody")

// Fill table with data.js
function tableDisplay(data) {
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

  // define a function to wipe table
  function deleteTbody() {
    d3.select("tbody")
      .selectAll("tr").remove()
      .selectAll("td").remove();
  };
    
  // Display table
 tableDisplay(tableData);
  
  // Define 'Filter Table' and new 'Reset' button 
  var button = d3.select("#filter-btn");
  var reset = d3.select("#reset-btn");

  // define references to fields
  //var dateField    = d3.select("#datetime");
  //var cityField    = d3.select("#city");
  //var stateField   = d3.select("#state");
  //var countryField = d3.select("#country");
  //var shapeField   = d3.select("#shape");
  //var allFields = ["datetime","city","state","country","shape"]
  
  // Values to filter against when user enter data
  // var filteredDate    = dateField.property("value");
  // var filteredCity    = cityField.property("value").trim().toLowerCase();
  // var filteredState   = stateField.property("value").trim().toLowerCase();
  // var filteredCountry = countryField.property("value").trim().toLowerCase();
  // var filteredShape   = shapeField.property("value").trim().toLowerCase();

  
  // set function to filter the table user's imput
  function filterbyCriteria(){
        
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // wipe table
    deleteTbody();

    // define a variable for the filtered data
    var filteredData = tableData;

    // Get all references under "form-control" instead
    //for AN future reference: https://fundamentals.generalassemb.ly/11_unit/dom-cheatsheet.html

    let formControl = document.getElementsByClassName("form-control");
    
    // iterate through formControl to for field names
    for (i = 0; i < formControl.length; i++) {
      
      // get the names from form-control
      var fieldName = formControl[i].id;

      // define references to fields using d3
      var field = d3.select("#" + fieldName).property("value");      
      
      // when blank just return all data, only run if fields have a value
      // if field is not blank
      if (field.trim() !== "") {
        // Then filteredData = to values inputed in fields (trim and set to low case to avoid errors) 
        var filteredData = filteredData.filter(row =>
          row[fieldName].trim().toLowerCase() ===
          field.trim().toLowerCase());
      }
      // // if data does not exist display text message
      // else {
      //   tbody.html("");
      //   tbody.append("tr").append("td").text("SORRY...NO SIGHTINGS FOUND!")
      // }
      ;
    };
   

    // display the filtered info
    tableDisplay(filteredData);
  };

// reset table to original display
function resetData(){
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // wipe out the tbody to be able to write out new table
  tbody.html("");
  // clear the input value **only works to clear first filter value**
  d3.selectAll(".form-control").node().value = "";
  // populate table
  tableDisplay (tableData);
}
  

// filter when user start typing **doesnt work well if not exact match**
// d3.selectAll(".form-control").on("keyup",filterbyCriteria);

// Getting audio file to play on load ** Doesnt work on Chrome, but works on other browsers**
window.onload = function(){
  document.getElementById("my_audio").play();
}
const myAudio = document.getElementById("my_audio");
function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};

// run function filterbyCriteria & resetData when user clicks the buttons
button.on("click", filterbyCriteria);
reset.on("click", resetData);

//for AN future reference: https://websitesetup.org/javascript-cheat-sheet/
