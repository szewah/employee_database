//Firebase key

//Initialize the key
firebase.initializeApp(config);
//Assign it to a variable database
var database = firebase.database();

//Initialize variables for the database
var formName;
var formRole;
var formStartDate;
var formSalary;

//Click event that grabs the input value and submits it to the Firebase database
$("#add-employee").on('click', function() {
    event.preventDefault();
    formName = $("#name").val().trim();
    formRole = $("#role").val();
    formStartDate = $("#start-date").val();
    formSalary = $("#monthly-salary").val();
    //Pushing the values into an object. The push() method 
    //creates a unique id when the data is pushed.
    database.ref().push({
        formName: formName,
        formRole: formRole,
        formStartDate: formStartDate,
        formSalary: formSalary,
      }); 
      //Empty the inputs on submit
      $("#name").val("");
      $("#role").val("");
      $("#start-date").val("");
      $("#monthly-salary").val("");
});

//Create a reference to the object
// Child_added event is used when retrieving a list of items from the database. 
// Unlike value which returns the entire contents of the location, child_added is 
// triggered once for each existing child and then again every time a new child 
// is added to the specified path. The event callback is passed a snapshot 
// containing the new child's data.
database.ref().on('child_added', function(snapshot) {
  renderRow(snapshot.val()); 
  },     
  // Create Error Handling
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code)
  });
  
function renderRow(obj) {
  //This draws the information from the database rather than from the value 
  //input in the DOM;
    var salaryInfo = calculateSalary(obj.formStartDate, obj.formSalary);
    var tableRow = $("<tr class='table-row'>");
    var tableDataName = $("<td class='employee-name'>").text(obj.formName);
    var tableDataRole = $("<td class='role'>").text(obj.formRole);
    var tableStartDate = $("<td class='start-date'>").text(obj.formStartDate);
    var tableSalary = $("<td class='salary'>").text(obj.formSalary);
    var tableMonthsWorked= $("<td class='months-worked'>").text(salaryInfo[0]);
    var tableTotalBilled= $("<td class='total-billed'>").text(salaryInfo[1]);
    tableRow.append(tableDataName, tableDataRole, tableStartDate, tableSalary, 
    tableMonthsWorked, tableTotalBilled);
    $(".table").append(tableRow);
};

//This function calculates the salary from months worked and salary paid each month
//It uses moment.js javascript library to organize time and dates
function calculateSalary(date, salary) {
    var startDate = date;
    var dateFormat = "MM-DD-YYYY";
    var convertedDate = moment(startDate, dateFormat);
    var workingDuration = convertedDate.diff(moment(), "months");
    var positiveDuration = Math.abs(workingDuration);
    var formSalary = salary;
    var totalSalary = positiveDuration * formSalary;
    return [positiveDuration, totalSalary]
};





