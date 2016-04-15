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
    if (returnUser.spent === returnUser.budget) {
      $("#underBudget").css('width', 100+'%');
      $("#displayUser").empty();
      $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name + "'s Budget:   " + returnUser.budget + "<h3>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4>" + "Spent: " + returnUser.spent + "<h4>");
      $("#disclaimer").hide();
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();
    } else if (returnUser.spent >= returnUser.budget) {
      overValue = (((returnUser.spent - returnUser.budget) / returnUser.budget) * 100) * 0.1;
      $("#underBudget").css('width', 75+'%');
      $("#overBudget").css('width', overValue+'%');
      $("#displayUser").empty();
      $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name + "'s Budget:   " + returnUser.budget + "<h3>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4>" + "Spent: " + returnUser.spent + "<h4>");
      $("#disclaimer").hide();
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();
    } else {
      var returnUserProgress = (returnUser.spent / returnUser.budget) * 100;
      $("#displayUser").empty();
      $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name + "'s Budget:   " + returnUser.budget + "<h3>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4>" + "Spent: " + returnUser.spent + "<h4>");
      $("#disclaimer").hide();
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();
      $(".progress-bar").css('width', returnUserProgress+'%');
    }

  }
  console.log(localStorage);
  // $("#userBudget").hide();

  $("#over21").click(function(event) {
    event.preventDefault();

    $("#userInfo").show();
    $("#disclaimer").hide();
    $("#userBudget").hide();
///////// We don't need this to show yet. We need it to show after user info is inputted /////////
    // $("#transaction_output").show();


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
      $("#displayUser").append("<h3 id='content'>" + returnUser.name + "</h3>" + "<br>" + "<h4>" + "Budget Amount: $" + returnUser.budget + "</h4>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4>" + "Amount Spent: $" + returnUser.spent + "</h4>");
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();

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
        $("#userBudget").show();
        $("#transaction_input").hide();
        $("#newTransactionBtnCont").show();
        localStorage.setObject('returnUser', returnUser);

        console.log(newAmount);
      } else {

        alert("Please enter a transaction amount.");

      }
    } else {

      alert("Fail")

    }

    var spentValue = 0;
    var overValue = 0;
    if (newAmount === returnUser.budget) {
      $("#underBudget").css('width', 100+'%');
    } else if (newAmount > spentValue && newAmount < returnUser.budget) {
      spentValue = (newAmount / returnUser.budget) * 100;
      $("#underBudget").css('width', spentValue+'%');
    } else if (newAmount > returnUser.budget) {
      overValue = (((newAmount - returnUser.budget) / returnUser.budget) * 100) * 0.1;
        if (overValue < 25) {
          $("#underBudget").css('width', 75+'%');
          $("#overBudget").css('width', overValue+'%');
        } else {
          alert("You are too far over budget. What's the point?")
        }
    }



  })

  $("#resetStorage").click(function(event) {
    event.preventDefault();

    var reset = confirm("Do you want to reset and create a new user?")
    if (reset == true) {
      localStorage.clear();
      $("#displaySpent").empty();
      $("#displayUser").empty();
      $(".progress-bar").css('width', 0+'%').attr('aria-valuenow', 0);
      $("#newUserName").val("");
      $("#newUserBudget").val("");
      $("#newSpent").val("");
      $("#transaction_input").hide();
      $("#userInfo").show();
      $("#userBudget").hide();
    }



  })
  $("#newTransactionBtn").click(function(event) {
    event.preventDefault();

    $("#transaction_input").show();
    $("#newTransactionBtnCont").hide()
  })

});
