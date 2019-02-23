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

    database.ref().set({
        formName: formName,
        formRole: formRole,
        formStartDate: formStartDate,
        formSalary: formSalary
      }); 


});

database.ref().on('value', function(snapshot) {
    $(".employee-name").text(snapshot.val().formName);
    $(".role").text(snapshot.val().formRole);
    $(".start-date").text(snapshot.val().formStartDate);
    $(".total-billed").text(snapshot.val().formSalary);
  },     
  // Create Error Handling
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code)
  });


    // var tableDiv = $("<div>");
    // var tableName = $("<p>").text(formName);
    // var tableRole = $("<p>").text(formRole);
    // var tableStartDate = $("<p>").text(formStartDate);
    // var tableSalary = $("<p>").text(formSalary);
    // tableDiv.append(tableName, tableRole, tableStartDate, tableSalary);
    // $(".table").append(tableDiv);