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

    newUser = new User(inputtedName, inputtedBudget);
    newUser.spent = 0;

    console.log(newUser);

  });

  $("form#newTransaction").submit(function(event) {
    event.preventDefault();

    var inputtedAmount = parseInt($("#newSpent").val());

    newUser.addToSpent(inputtedAmount);

    console.log(newUser.spent);

  })

});
