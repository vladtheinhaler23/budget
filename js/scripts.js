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

  $("form#newUser").submit(function(event) {
    event.preventDefault();

    var inputtedName = $("#newUserName").val();
    var inputtedBudget = parseInt($("#newUserBudget").val());

    var newUser = new User(inputtedName, inputtedBudget);

    console.log(newUser);

  });



});
