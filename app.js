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

    //store value of most recent user;
    console.log("I was clicked");
    formName = $("#name").val();
    formRole = $("#role").val();
    formStartDate = $("#start-date").val();
    formSalary = $("#monthly-salary").val();

    database.ref().push({
        formName: formName,
        formRole: formRole,
        formStartDate: formStartDate,
        formSalary: formSalary
      }); 


});

database.ref().on('child_added', function(snapshot) {
    renderRow(snapshot.val()); 
  },     
  // Create Error Handling
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code)
  });
  
function renderRow(obj) {
    var tableRow = $("<tr class='table-row'>");
    var tableDataName = $("<td class='employee-name'>").text(obj.formName);
    var tableDataRole = $("<td class='role'>").text(obj.formRole);
    var tableStartDate = $("<td class='start-date'>").text(obj.formStartDate);
    var tableTotalBilled = $("<td class='total-billed'>").text(obj.formSalary);
    tableRow.append(tableDataName, tableDataRole, tableStartDate, tableTotalBilled);
    $(".table").append(tableRow);
};

