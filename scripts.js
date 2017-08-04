
var userA = "";
var userB = ""; // or computer

var gameMode;
var gameChoice;
var gameBoard;

var combos;
var board;


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
            console.log(checkGameResult(userA));
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

    board = [];

    $("ul li").each(function() { board.push($(this).text().toString().replace(/\s/g,''))});

}

function checkGameResult(symbol) {

    combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(var i = 0; i<combos.length; i++) {

        console.log(board[combos[i][0]] + " " + board[combos[i][1]] + " " + board[combos[i][2]]);

        if(board[combos[i][0]] === symbol && board[combos[i][1]] === symbol && board[combos[i][2]] === symbol) {

            return true;
        }
    }

    return false;
}


