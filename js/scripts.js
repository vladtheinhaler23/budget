//BUSINESS LOGIC

function User(name, budget, spent) {
  this.name = name;
  this.budget = budget;
  this.spent = spent;
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
    recentPurchase = localStorage.getObject("recentPurchase")
    $("#recentPurchaseAmount").empty();
    $("#recentPurchaseAmount").append("0");
    if (returnUser.spent === returnUser.budget) {
      $("#underBudget").css('width', 100+'%');
      $("#underBudgetProgress").empty();
      $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
      $("#displayUser").empty();
      $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name.toUpperCase() + "'s Budget: $" + returnUser.budget + ".00" + "</h3>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent + ".00" + "</h4>");
      $("#recentPurchaseAmount").empty();
      $("#recentPurchaseAmount").append(recentPurchase);
      $("#disclaimer").hide();
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();
    } else if (returnUser.spent >= returnUser.budget) {
      displayOverValue = returnUser.spent - returnUser.budget;
      overValue = (((returnUser.spent - returnUser.budget) / returnUser.budget) * 100) * 0.1;
      if (overValue >= 25) {
        $("#underBudget").css('width', 75+'%');
        $("#underBudgetProgress").empty();
        $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
        $("#overBudget").css('width', 25+'%');
        $("#overBudgetProgress").empty();
        $("#overBudgetProgress").append("$" + displayOverValue + ".00");
        $("#displayUser").empty();
        $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name.toUpperCase()  + "'s Budget: $" + returnUser.budget + ".00" + "</h3>");
        $("#displaySpent").empty();
        $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent + ".00" + "</h4>");
        $("#recentPurchaseAmount").empty();
        $("#recentPurchaseAmount").append(recentPurchase);
        $("#disclaimer").hide();
        $("#transaction_input").hide();
        $("#userInfo").hide();
        $("#userBudget").show();
      } else {
        $("#underBudget").css('width', 75+'%');
        $("#underBudgetProgress").empty();
        $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
        $("#overBudget").css('width', overValue+'%');
        $("#overBudgetProgress").empty();
        $("#overBudgetProgress").append("$" + displayOverValue + ".00");
        $("#displayUser").empty();
        $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name.toUpperCase() + "'s Budget: $" + returnUser.budget + "<h3/>");
        $("#displaySpent").empty();
        $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent + ".00" + "</h4>");
        $("#recentPurchaseAmount").empty();
        $("#recentPurchaseAmount").append(recentPurchase);
        $("#disclaimer").hide();
        $("#transaction_input").hide();
        $("#userInfo").hide();
        $("#userBudget").show();
      }

    } else if (returnUser.spent === 0) {
      var returnUserProgress = (returnUser.spent / returnUser.budget) * 100;
      $("#displayUser").empty();
      $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name.toUpperCase() + "'s Budget: $" + returnUser.budget + ".00" + "</h3>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent + ".00" + "</h4>");
      $("#disclaimer").hide();
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();
      $("#underBudget").css('width', returnUserProgress+'%');
      $("#underBudgetProgress").empty();
    } else {
      var returnUserProgress = (returnUser.spent / returnUser.budget) * 100;
      $("#displayUser").empty();
      $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name.toUpperCase() + "'s Budget: $" + returnUser.budget + ".00" + "</h3>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent + ".00" + "</h4>");
      $("#disclaimer").hide();
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();
      $("#underBudget").css('width', returnUserProgress+'%');
      $("#underBudgetProgress").empty();
      $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
    }




  }
  console.log(localStorage);

  $("#over21").click(function(event) {
    event.preventDefault();

    $("#userInfo").show();
    $("#disclaimer").hide();
    $("#userBudget").hide();



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
      $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name.toUpperCase() + "'s Budget: $" + returnUser.budget + ".00" + "</h3>");
      $("#displaySpent").empty();
      $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent + ".00" + "</h4>");
      $("#transaction_input").hide();
      $("#userInfo").hide();
      $("#userBudget").show();

      console.log(returnUser);
      console.log(localStorage);

    } else {
      alert("Please enter user info");
    }

  });



  var recentPurchase = 0;
  $("#newSpentBtn").click(function(event) {
    event.preventDefault();



    if (localStorage.getObject("returnUser") != null) {
      if ($("#newSpent").val()) {

        var inputtedAmount = parseInt($("#newSpent").val());
        var newAmount = returnUser.spent += inputtedAmount;

       recentPurchase = parseInt($("#newSpent").val());


        $("#displaySpent").empty();
        $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + newAmount + ".00" + "</h4>");
        $("#recentPurchaseAmount").empty();
        $("#recentPurchaseAmount").append(recentPurchase);
        $("#userBudget").show();
        $("#transaction_input").hide();
        $("#newTransactionBtnCont").show();
        localStorage.setObject('returnUser', returnUser);
        localStorage.setObject('recentPurchase', recentPurchase)

        console.log(recentPurchase);
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
      $("#underBudgetProgress").empty();
      $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
    } else if (newAmount > spentValue && newAmount < returnUser.budget) {
      spentValue = (newAmount / returnUser.budget) * 100;
      $("#underBudget").css('width', spentValue+'%');
      $("#underBudgetProgress").empty();
      $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
    } else if (newAmount > returnUser.budget) {
      overValue = (((newAmount - returnUser.budget) / returnUser.budget) * 100) * 0.1;
        if (overValue < 25) {
          displayOverValue = returnUser.spent - returnUser.budget;
          $("#underBudget").css('width', 75+'%');
          $("#overBudget").css('width', overValue+'%');
          $("#underBudgetProgress").empty();
          $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
          $("#overBudgetProgress").empty();
          $("#overBudgetProgress").append("$" + displayOverValue + ".00");
        } else {
          displayOverValue = returnUser.spent - returnUser.budget;
          alert("You are too far over budget. What's the point?")
          $("#underBudgetProgress").empty();
          $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
          $("#overBudgetProgress").empty();
          $("#overBudgetProgress").append("$" + displayOverValue + ".00");
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
      $(".progress-bar").css('width', 0+'%');
      $("#underBudgetProgress").empty();
      $("#overBudgetProgress").empty();
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

  })
  $("#recentPurchaseBtn").click(function(event) {
    event.preventDefault();


    recentPurchase = localStorage.getObject("recentPurchase")
    newAmount = returnUser.spent += recentPurchase;
    localStorage.setObject('returnUser', returnUser);

    $("#displaySpent").empty();
    $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent +  ".00" + "</h4>");

    console.log(recentPurchase);

    var spentValue = 0;
    var overValue = 0;
    if (newAmount == returnUser.budget) {
      $("#underBudget").css('width', 100+'%');
      $("#underBudgetProgress").empty();
      $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
    } else if (newAmount > spentValue && newAmount < returnUser.budget) {
      spentValue = (newAmount / returnUser.budget) * 100;
      $("#underBudget").css('width', spentValue+'%');
      $("#underBudgetProgress").empty();
      $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
    } else if (newAmount > returnUser.budget) {
      overValue = (((newAmount - returnUser.budget) / returnUser.budget) * 100) * 0.1;
        if (overValue < 25) {
          displayOverValue = returnUser.spent - returnUser.budget;
          $("#underBudget").css('width', 75+'%');
          $("#overBudget").css('width', overValue+'%');
          $("#underBudgetProgress").empty();
          $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
          $("#overBudgetProgress").empty();
          $("#overBudgetProgress").append("$" + displayOverValue + ".00");
        } else {
          displayOverValue = returnUser.spent - returnUser.budget;
          alert("You are too far over budget. What's the point?")
          $("#underBudgetProgress").empty();
          $("#underBudgetProgress").append("$" + returnUser.spent + ".00");
          $("#overBudgetProgress").empty();
          $("#overBudgetProgress").append("$" + displayOverValue + ".00");
        }
    }


  })

  $("#newBudgetBtn").click(function(event) {
    event.preventDefault();
    recentPurchase = localStorage.getObject("recentPurchase")
    returnNewBudget = $("#returnUserBudget").val();

    returnUser.budget = returnNewBudget;
    returnUser.spent = 0;
    localStorage.setObject('returnUser', returnUser);

    $("#displayUser").empty();
    $("#displayUser").append("<h3 id='displayUserh3'>" + returnUser.name.toUpperCase() + "'s Budget:  $" + returnUser.budget + ".00" + "</h3>");
    $("#displaySpent").empty();
    $("#displaySpent").append("<h4 id='displayUserh4'>" + "BUDGET USED: $" + returnUser.spent +".00" + "</h4>");
    $("#recentPurchaseAmount").empty();
    $("#recentPurchaseAmount").append("0");
    $("#underBudget").css('width', 0+'%');
    $("#underBudgetProgress").empty();
    $("#overBudget").css('width', 0+'%');
    $("#overBudgetProgress").empty();
    $("#recentPurchaseAmount").empty();
    $("#recentPurchaseAmount").append(recentPurchase);


    console.log(returnUser.budget);


  })
});
