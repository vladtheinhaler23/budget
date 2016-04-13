//BUSINESS LOGIC

function User(name, budget, spent) {
  this.name = name;
  this.budget = budget;
  this.spent = spent;
}

User.prototype.addToSpent = function(amountSpent) {
  this.spent += amountSpent;


}

Storage.prototype.setObject = function(key, object) {
  this.setItem(key, JSON.stringify(object));
}

Storage.prototype.getObject = function(key) {
  return JSON.parse(this.getItem(key));
}
//USER INTERFACE

$(document).ready(function() {

  if (localStorage.getObject("newUser") === null && localStorage.getObject("returnUser") != null) {
    returnUser = localStorage.getObject("returnUser")
    var returnUserProgress = (returnUser.spent / returnUser.budget) * 100;
    $("#displayUser").empty();
    $("#displayUser").append("<h3>" + returnUser.name + "<h3>" + "<br>" + "<h4>" + "Budget Amount: " + returnUser.budget + "</h4>");
    $("#displaySpent").empty();
    $("#displaySpent").append("<h4>" + "Amount Spent: " + returnUser.spent + "<h4>");
    $(".progress-bar").css('width', returnUserProgress+'%').attr('aria-valuenow', returnUserProgress);
  }
  console.log(localStorage);

  $("#over21").click(function(event) {
    event.preventDefault();

    $("#userInfo").show();
    $("#transaction_output").show();
    $("#disclaimer").hide();

  })

  $("form#newUser").submit(function(event) {
    event.preventDefault();

    if ($("#newUserName").val() && $("#newUserBudget").val()) {

      var inputtedName = $("#newUserName").val();
      var inputtedBudget = parseInt($("#newUserBudget").val());


      returnUser = new User(inputtedName, inputtedBudget);
      returnUser.spent = 0;

      localStorage.clear();
      localStorage.setObject('returnUser', returnUser);

      $("#displayUser").empty();
      $("#displayUser").append("<h3>" + returnUser.name + "<h3>" + "<br>" + "<h4>" + "Budget Amount: " + returnUser.budget + "</h4>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4>" + "Amount Spent: " + returnUser.spent + "<h4>");

      console.log(returnUser);
      console.log(localStorage);

    } else {
      alert("Please enter user info");
    }

  });

  $("form#newTransaction").submit(function(event) {
    event.preventDefault();


    if (localStorage.getObject("returnUser") != null) {
      if ($("#newSpent").val()) {

        var inputtedAmount = parseInt($("#newSpent").val());
        var newAmount = returnUser.spent += inputtedAmount;

        $("#displaySpent").empty();
        $("#displaySpent").append("<h4>" + "Amount Spent: " + returnUser.spent + "<h4>");

        localStorage.setObject('returnUser', returnUser);

        console.log(newAmount);
      } else {

        alert("Please enter a transaction amount.");

      }
    } else {

      alert("Fail")

    }

    var spentValue = 0;
    if (newAmount > spentValue) {
      spentValue = (newAmount / returnUser.budget) * 100;
    }
    $(".progress-bar").css('width', spentValue+'%').attr('aria-valuenow', spentValue);
    console.log(spentValue);
  })

  $("#resetStorage").click(function(event) {
    event.preventDefault();

    var reset = confirm("Do you want to reset and create a new user?")
    if (reset == true) {
      localStorage.clear();
      $("#displaySpent").empty();
      $("#displayUser").empty();
    }

    $(".progress-bar").css('width', 0+'%').attr('aria-valuenow', 0);
    $("#newUserName").val("");
    $("#newUserBudget").val("");
    $("#newSpent").val("");

  })


});


// if (returnUserProgress > returnUser.budget) {
//   $(".progress-bar-warning").css('width', 0+'%').attr('aria-valuenow', 0);
// }
