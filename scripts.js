
var userA = "";
var userB = ""; // or computer

var gameMode;
var gameChoice;
var gameBoard;
var gameResult;

var combos;
var board;
var movesCounter = 0;

var gameWithComputer; // true - computer, false - two players
var turn = true; // whose turn is now (true - playerOne, false - playerTwo)



window.onload = function(){

    // get all divisions

    gameMode = $("#game-mode");
    gameChoice = $("#game-choice");
    gameBoard = $("#game-board");
    gameResult = $("#game-result");

    // -----------------

    var fields = document.getElementById("fields");
    var li = fields.getElementsByTagName("li");

    for (var i=0; i<li.length; i++)
    {
        li[i].addEventListener("click", function(e) {

            if(e.target.innerHTML === "...") {

                if(turn) {
                    e.target.innerHTML = userA;
                    e.target.style.color = "rgba(220, 220, 220, .7)";
                    htmlListToArray();

                    if(checkGameResult(userA) && movesCounter <= 9) {
                        if(!gameWithComputer) {
                            showGameResults("Player 1 wins!");
                        } else {
                            showGameResults("You lost!")
                        }
                    }

                    if(movesCounter === 9) {
                        showGameResults("It was a draw!");
                    }

                    turn = false;
                } else {
                    e.target.innerHTML = userB;
                    e.target.style.color = "rgba(220, 220, 220, .7)";
                    htmlListToArray();

                    if(checkGameResult(userB && movesCounter <= 9)) {
                        if(!gameWithComputer) {
                            showGameResults("Player 2 wins!");
                        } else {
                            showGameResults("You lost!")
                        }
                    }

                    if(movesCounter === 9) {
                        showGameResults("It was a draw!");
                    }

                    turn = true;
                }
            }

            },false);
    }

    addListenerForElement("one-btn", function action() {
        gameWithComputer = false;
        addAnimBetweenDivs(gameMode, gameChoice);
    });

    addListenerForElement("two-btn", function action() {
        gameWithComputer = true;
        addAnimBetweenDivs(gameMode, gameChoice);
    });

    addListenerForElement("x-btn", function action() {
        userA = "X";
        userB = "O";
        addAnimBetweenDivs(gameChoice, gameBoard);
        checkWhoStars();
    });

    addListenerForElement("o-btn", function action() {
        userA = "O";
        userB = "X";
        addAnimBetweenDivs(gameChoice, gameBoard);
        checkWhoStars();
    });

    addListenerForElement("back-btn", function action() {
        addAnimBetweenDivs(gameChoice, gameMode);
    });

    addListenerForElement("game-result", function action() {
        restartGame();
    })
};

function addListenerForElement(id, action) {

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

function showGameResults(winnerMsg) {

    $("#winner").html(winnerMsg);

    gameResult.removeClass('hidden');

    setTimeout(function () {
        gameResult.removeClass('visually-hidden');
    }, 500);
}

function restartGame() {

    movesCounter = 0;

    $("ul li i").each(function() {
        $(this).css("color", "transparent");
        $(this).text("...");
    });

    gameResult.addClass('hidden');

    setTimeout(function () {
        gameResult.addClass('visually-hidden');

    }, 500);
}

function htmlListToArray() {

    board = [];

    $("ul li").each(function() { board.push($(this).text().toString().replace(/\s/g,''))});

}

function checkGameResult(symbol) {

    movesCounter+=1;

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

    for(var i = 0; i<combos.length; i++) { // it could be checked using jquerry without translate html array to js

        if(board[combos[i][0]] === symbol && board[combos[i][1]] === symbol && board[combos[i][2]] === symbol) {
            return true;
        }
    }

    return false;
}

function checkWhoStars() {

    turn = Math.floor((Math.random() * 10) + 1) % 2 === 0; // true - playerOne, false - playerTwo

    if(turn) {
        alert("Your turn!"); // TODO: innerHTML
    } else {
        alert("UserB turn"); // TODO: innerHTML
    }

}


