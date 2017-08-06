
var userA = "";
var userB = ""; // or computer

var gameMode;
var gameChoice;
var gameBoard;

var combos;
var board;

var turn = true; // whose turn is now (true - playerOne, false - playerTwo)


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

            if(turn) {
                e.target.innerHTML = userA;
                htmlListToArray();

                if(checkGameResult(userA)) {
                    alert("UserA won!");
                }

                turn = false;
            } else {
                e.target.innerHTML = userB;
                htmlListToArray();

                if(checkGameResult(userB)) {
                    alert("UserB won!");
                }

                turn = true;
            }

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

        // game should start here
    });

    addListenerForButton("o-btn", function action() {
        userA = "O";
        userB = "X";
        addAnimBetweenDivs(gameChoice, gameBoard)

        // game should start here
    });

    addListenerForButton("back-btn", function action() {
        addAnimBetweenDivs(gameChoice, gameMode); // change it
    });

    // GAME LOGIC - it shouldn't start on window.load

    // check who stars - player 1 or player 2 (computer)

    turn = Math.floor((Math.random() * 10) + 1) % 2 === 0; // true - playerOne, false - playerTwo

    if(turn) {
        alert("Your turn!"); // innerHTML
    } else {
        alert("UserB turn"); // innerHTML
    }


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


