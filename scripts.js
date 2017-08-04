
var userA = "";
var userB = ""; // or computer

var gameMode;
var gameChoice;
var gameBoard;


window.onload = function(){

    // get all divisions

    gameMode = $("#game-mode");
    gameChoice = $("#game-choice");
    gameBoard = $("#game-board");

    // -----------------

    var fields = document.getElementById("fields");
    var li = fields.getElementsByTagName("li");

    for (var i=0; i<li.length; i++)
    {
        li[i].addEventListener("click", function(e) {
            e.target.innerHTML = userA; // or "X"
            htmlListToArray();
            },false);
    }

    // add event listener for 'X' & 'O' buttons in game-choice division


    addListenerForButton("one-btn", function action() {
        addAnimBetweenDivs(gameMode, gameChoice);
    });

    addListenerForButton("two-btn", function action() {
        addAnimBetweenDivs(gameMode, gameChoice);
    });

    addListenerForButton("x-btn", function action() {
        userA = "X";
        userB = "O";
        addAnimBetweenDivs(gameChoice, gameBoard);
    });

    addListenerForButton("o-btn", function action() {
        userA = "O";
        userB = "X";
        addAnimBetweenDivs(gameChoice, gameBoard)
    });

    addListenerForButton("back-btn", function action() {
        addAnimBetweenDivs(gameChoice, gameMode); // change it
    });

};

function addListenerForButton(id, action) {

    var element = $("#" + id);

    element.on("click", function() {
        action();
    })

}

function addAnimBetweenDivs(divA, divB) { // hide and show divs

    divA.addClass('hidden');

    setTimeout(function () {
        divA.addClass('visually-hidden');

    }, 500);


    divB.removeClass('hidden');

    setTimeout(function () {
        divB.removeClass('visually-hidden');
    }, 500);

}

function htmlListToArray() {

    var optionTexts = [];
    $("ul li").each(function() { optionTexts.push($(this).text().toString().replace(/\s/g,'')) });

    for (var i = 0; i < optionTexts.length; i++) {
        console.log(optionTexts[i]);
    }
}


