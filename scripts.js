
let userA = "";
let userB = ""; // or computer

let gameMode;
let gameChoice;
let gameBoard;
let gameResult;

let board;
let movesCounter = 0;

let gameWithComputer; // true - computer, false - two players
let computerStarted;
let turn = true; // whose turn is now (true - playerOne, false - playerTwo)

const corners = [1, 3, 7, 9];

const combos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



window.onload = function(){

    // get all divisions

    gameMode = $("#game-mode");
    gameChoice = $("#game-choice");
    gameBoard = $("#game-board");
    gameResult = $("#game-result");

    // -----------------

    let fields = document.getElementById("fields");
    let li = fields.getElementsByTagName("li");

    for (let i=0; i<li.length; i++)
    {
        li[i].addEventListener("click", function(e) {

            if(e.target.innerHTML === "...") {

                if(turn) { // player one
                    makeMove(e, userA);

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
                } else { // player two or computer

                    if(!gameWithComputer) { // player two
                        makeMove(e, userB);
                    } else { // computer moves

                        if(computerStarted) {

                            if(movesCounter === 0 ) { // should choose any corner
                                computerMakesMove(document.getElementById("1"), userB);
                            }

                            if(movesCounter === 2) {
                                if(checkIsFieldEmpty(5)) { // middle field has not chosen, win situation
                                    for(let element of corners) {
                                        if(checkIsFieldEmpty(element)) {
                                            computerMakesMove(document.getElementById(element.toString()), userB);
                                            break;
                                        }
                                    }
                                } else {
                                    // what then?
                                }
                            }

                            if(movesCounter === 4) {
                                let move = findMoveToWin(userB);
                                if(move !== -1) {
                                    computerMakesMove(document.getElementById(move.toString()), userB);
                                } else {
                                    for(let element of corners) {
                                        if(checkIsFieldEmpty(element)) {
                                            computerMakesMove(document.getElementById(element.toString()), userB);
                                            break;
                                        }
                                    }
                                }
                            }

                            if(movesCounter === 6) {
                                let move = findMoveToWin(userB);
                                if(move !== -1) {
                                    computerMakesMove(document.getElementById(move.toString()), userB);
                                }
                            }







                        } else {

                            if(movesCounter === 2) { // should choose a middle field
                                computerMakesMove(document.getElementById("5"), userB);
                            }

                        }










                    }

                    if(checkGameResult(userB) && movesCounter <= 9) {
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
        gameWithComputer = true;
        addAnimBetweenDivs(gameMode, gameChoice);
    });

    addListenerForElement("two-btn", function action() {
        gameWithComputer = false;
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

function makeMove(element, user) {
    element.target.innerHTML = user;
    element.target.style.color = "rgba(220, 220, 220, .7)";
    htmlListToArray();
}

function computerMakesMove(element, computer) {
    element.innerHTML = computer;
    element.style.color = "rgba(220, 220, 220, .7)";
    htmlListToArray();
}

function checkIsFieldEmpty(fieldNum) {
    return board[fieldNum - 1] === "...";
}

function addListenerForElement(id, action) {

    let element = $("#" + id);

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

    for(let i = 0; i<combos.length; i++) { // it could be checked using jquerry without translate html array to js

        if(board[combos[i][0]] === symbol && board[combos[i][1]] === symbol && board[combos[i][2]] === symbol) {
            return true;
        }
    }

    return false;
}

function findMoveToWin(symbol) {

    for(let element of combos) {

        console.log("DEBUG: " + board[element[0]] + " " + board[element[1]] + " " + board[element[2]]);

        if(board[element[0]] === "..." && board[element[1]] === symbol && board[element[2]] === symbol) {
            console.log(board[element[0]] + " " + userA + " COMPARISION ");
            if(board[element[0]] !== userA) {
                return element[0] + 1;
            }

        }

        if(board[element[0]] === symbol && board[element[1]] === "..." && board[element[2]] === symbol) {
            console.log(board[element[1]] + " " + userA + " COMPARISION ");
            if(board[element[1]] !== userA) {
                return element[1] + 1;
            }
        }

        if(board[element[0]] === symbol && board[element[1]] === symbol && board[element[2]] === "...") {
            console.log(board[element[2]] + " " + userA + " COMPARISION ");
            if(board[element[2]] !== userA) {
                return element[2] + 1;
            }
        }
    }

    return -1;
}

function checkWhoStars() {

    //turn = Math.floor((Math.random() * 10) + 1) % 2 === 0; // true - playerOne, false - playerTwo
    turn = false;

    if(turn) {
        //alert("Your turn!"); // TODO: innerHTML
    } else {
        //alert("UserB turn"); // TODO: innerHTML
        computerStarted = true;
    }

}


