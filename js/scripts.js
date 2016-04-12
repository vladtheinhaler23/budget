//BUSINESS LOGIC

function User(name, budget, spent) {
  this.name = name;
  this.budget = budget;
  this.spent = spent;
}

User.prototype.addToSpent = function(amountSpent) {
  this.spent += amountSpent;

}
//USER INTERFACE

$(document).ready(function() {



  $("#over21").click(function(event) {
    event.preventDefault();

    $("#userInfo").show();
    $("#transaction_output").show();
    $("#disclaimer").hide();

  })

  $("form#newUser").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("#newUserName").val();
    var inputtedBudget = parseInt($("#newUserBudget").val());

    newUser = new User(inputtedName, inputtedBudget);
    newUser.spent = 0;

    $("#displayUser").empty();
    $("#displayUser").append("<h3>" + newUser.name + "<h3>" + "<br>" + "<h4>" + "Budget Amount: " + newUser.budget + "</h4>");

    console.log(newUser);

  });

  $("form#newTransaction").submit(function(event) {
    event.preventDefault();

    var inputtedAmount = parseInt($("#newSpent").val());

    newUser.addToSpent(inputtedAmount);

    $("#displaySpent").empty();
    $("#displaySpent").append("<h4>" + "Amount Spent: " + newUser.spent + "<h4>");

    console.log(newUser.spent);

  })

});
