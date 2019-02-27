var config = {
  apiKey: "AIzaSyA2vZH3EegVXUPAw3AOknEGYOu8auYv3uE",
  authDomain: "fabulous-project-demo.firebaseapp.com",
  databaseURL: "https://fabulous-project-demo.firebaseio.com",
  projectId: "fabulous-project-demo",
  storageBucket: "fabulous-project-demo.appspot.com",
  messagingSenderId: "322665992078"
};


firebase.initializeApp(config);
var database = firebase.database();

var formName;
var formRole;
var formStartDate;
var formSalary;

$("#add-employee").on('click', function() {
    event.preventDefault();
    formName = $("#name").val().trim();
    formRole = $("#role").val();
    formStartDate = $("#start-date").val();
    formSalary = $("#monthly-salary").val();

    database.ref().push({
        formName: formName,
        formRole: formRole,
        formStartDate: formStartDate,
        formSalary: formSalary,
      }); 
      //emptying the input on the front-end
      $("#name").val("");
      $("#role").val("");
      $("#start-date").val("");
      $("#monthly-salary").val("");
});

database.ref().on('child_added', function(snapshot) {
  renderRow(snapshot.val()); 
  },     
  // Create Error Handling
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code)
  });
  
function renderRow(obj) {
    var salaryInfo = calculateSalary(obj.formStartDate);
    var tableRow = $("<tr class='table-row'>");
    var tableDataName = $("<td class='employee-name'>").text(obj.formName);
    var tableDataRole = $("<td class='role'>").text(obj.formRole);
    var tableStartDate = $("<td class='start-date'>").text(obj.formStartDate);
    var tableSalary = $("<td class='salary'>").text(obj.formSalary);
    var tableMonthsWorked= $("<td class='months-worked'>").text(salaryInfo[0]);
    var tableTotalBilled= $("<td class='total-billed'>").text(salaryInfo[1]);
    tableRow.append(tableDataName, tableDataRole, tableStartDate, tableSalary, tableMonthsWorked, tableTotalBilled);
    $(".table").append(tableRow);
};

function calculateSalary(date) {
    var startDate = date;
    console.log(date);
    var dateFormat = "MM-DD-YYYY";
    var convertedDate = moment(startDate, dateFormat);
    var workingDuration = convertedDate.diff(moment(), "months");
    var positiveDuration = Math.abs(workingDuration);
    console.log(positiveDuration);
    var formSalary = $("#monthly-salary").val();
    var totalSalary = positiveDuration * formSalary;
    console.log(totalSalary);
    return [positiveDuration, totalSalary]
};

// 1. how to push the date difference into the table




