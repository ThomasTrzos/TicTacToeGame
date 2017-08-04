
var userA = "";
var userB = ""; // or computer

var gameChoice = "";
var gameBoard = "";


window.onload = function(){

    // get all divisions

    gameChoice = document.getElementById("game-choice");
    gameBoard = document.getElementById("game-board");

    // -----------------

    var fields = document.getElementById("fields");
    var li = fields.getElementsByTagName("li");

    for (var i=0; i<li.length; i++)
    {
        li[i].addEventListener("click", function(e) {
            e.target.innerHTML = "O"; // or "X"
            },false);
    }

    // add event listener for 'X' & 'O' buttons in game-choice division

    var x = document.getElementById("x-btn");
    var o = document.getElementById("o-btn");
    var back = document.getElementById("back-btn");

    addListenerForButton(x, function action() {
        userA = "X";
        userB = "O";
    });

    addListenerForButton(o, function action() {
        userA = "O";
        userB = "X";
    });

    addListenerForButton(back, function action() {
        //TODO: back to previous diviison
    });

};

function addListenerForButton(button, action) {

    button.addEventListener("click", function (e) {
        functionality();
    }, false);

}

function selectChar() {

}


