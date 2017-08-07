
let userA = "";
let userB = ""; // or computer

let gameMode;
let gameChoice;
let gameBoard;
let gameResult;
let gameStarts;

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
    gameStarts = $("#game-who-starts");

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

                    if(gameWithComputer) { // forced click on empty div
                        let tmpElement = document.getElementById(findEmptyField());
                        if(tmpElement !== null) {
                            tmpElement.click();
                        }
                    }

                } else { // player two or computer

                    if(!gameWithComputer) { // player two
                        makeMove(e, userB);
                    } else { // computer moves

                        if(computerStarted) {

                            console.log("DEBUG: " + movesCounter);

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
                                    computerMakesMove(document.getElementById("9"), userB);
                                }
                            }

                            if(movesCounter === 4) {
                                let move = findMove(userB); // move to win
                                if(move !== -1) {
                                    computerMakesMove(document.getElementById(move.toString()), userB);
                                } else {

                                    move = findMove(userA); // move to block

                                    if(move !== -1) { // if you have to block opponent
                                        computerMakesMove(document.getElementById(move.toString()), userB);
                                    } else { // if you don't have to block opponent
                                        for(let element of corners) {
                                            if(checkIsFieldEmpty(element)) {
                                                if(checkIsFieldEmpty(element-3)) { // loking for empty-open corner
                                                    console.log("CHECK IS FIELD EMPTY: " + element);
                                                    computerMakesMove(document.getElementById(element.toString()), userB);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            if(movesCounter === 6) {
                                let move = findMove(userB);
                                if(move !== -1) {
                                    computerMakesMove(document.getElementById(move.toString()), userB);
                                } else {
                                    move = findMove(userA);
                                    computerMakesMove(document.getElementById(move.toString()), userB);
                                }
                            }

                            if(movesCounter === 8) {
                                let move = findEmptyField();
                                console.log(move);
                                computerMakesMove(document.getElementById(move.toString()), userB);
                            }

                        } else {

                            if (movesCounter === 1) { // should choose a middle field
                                if(checkIsFieldEmpty(5)) { // middle field has been choosen (not smart decision)
                                    computerMakesMove(document.getElementById("5"), userB);
                                } else {
                                    computerMakesMove(document.getElementById("1"), userB);
                                }

                            }

                            if(movesCounter === 3) {

                                let move = findMove(userA); // move to block

                                if(move !== -1) { // if you have to block opponent
                                } else { // if you don't have to block opponent

                                    if(checkIsPossibleToDouble(userA)){
                                        move = 2;
                                    } else {
                                        move = findEmptyFieldNotCorner();
                                    }
                                }

                                computerMakesMove(document.getElementById(move.toString()), userB);
                            }

                            if(movesCounter === 5) {
                                let move = findMove(userB); // for win

                                if(move !== -1) {
                                    computerMakesMove(document.getElementById(move), userB);
                                } else {
                                    move = findMove(userA);

                                    if(move !== -1) {
                                        computerMakesMove(document.getElementById(move), userB);
                                    } else {
                                        move = findEmptyField();
                                        computerMakesMove(document.getElementById(move), userB);
                                    }
                                }
                            }

                            if(movesCounter === 7) {
                                let move = findMove(userA); // for block

                                if(move !== -1) {
                                    computerMakesMove(document.getElementById(move), userB);
                                } else {
                                    move = findEmptyField();
                                    computerMakesMove(document.getElementById(move), userB);
                                }
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
        showWhoseStarts(checkWhoStarts());
    });

    addListenerForElement("o-btn", function action() {
        userA = "O";
        userB = "X";
        addAnimBetweenDivs(gameChoice, gameBoard);
        showWhoseStarts(checkWhoStarts());
    });

    addListenerForElement("back-btn", function action() {
        addAnimBetweenDivs(gameChoice, gameMode);
    });

    addListenerForElement("game-result", function action() {
        restartGame();
    });

    addListenerForElement("game-who-starts", function action() {
        gameStarts.addClass('hidden');

        setTimeout(function () {
            gameStarts.addClass('visually-hidden');
        }, 500);

        if(gameWithComputer && computerStarted) { // forced click on empty div
            document.getElementById("5").click(); // doesn't matter where I 'click'
        }
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
    console.log("FIELD NUM " + fieldNum + ": " + board[fieldNum - 1]);
    return board[fieldNum - 1] === "...";
}

function checkIsPossibleToDouble(opponent) {
    return (board[0] === opponent && board[8] === opponent) || (board[2] === opponent && board[6] === opponent);
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

function showWhoseStarts(message) {
    $("#user-who-starts").html(message);

    gameStarts.removeClass('hidden');

    setTimeout(function () {
        gameStarts.removeClass('visually-hidden');
    }, 500);

}

function restartGame() {

    movesCounter = 0;
    checkWhoStarts();

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

function findMove(symbol) { // to win or to block

    for(let element of combos) {

        if(board[element[0]] === "..." && board[element[1]] === symbol && board[element[2]] === symbol) {
            if(board[element[0]] !== userA || board[element[0]] !== userB) {
                return element[0] + 1;
            }

        }

        if(board[element[0]] === symbol && board[element[1]] === "..." && board[element[2]] === symbol) {
            if(board[element[1]] !== userA || board[element[1]] !== userB) {
                return element[1] + 1;
            }
        }

        if(board[element[0]] === symbol && board[element[1]] === symbol && board[element[2]] === "...") {
            if(board[element[2]] !== userA || board[element[2]] !== userB) {
                return element[2] + 1;
            }
        }
    }

    return -1;
}

function findEmptyField() {
    for(let element of board) {
        if(element === "...") {
            return board.indexOf(element) + 1;
        }
    }
}

function findEmptyFieldNotCorner() {

    const notCorners = [1, 3, 5, 7];

    for(let i=0; i<board.length; i++) {
        if(board[i] === "...") {
            if(notCorners.indexOf(i)) {
                return board.indexOf(board[i]) + 1;
            }
        }
    }
}

function checkWhoStarts() {

    turn = Math.floor((Math.random() * 10) + 1) % 2 === 0; // true - playerOne, false - playerTwo

    if(turn) {

        computerStarted = false;

        if(gameWithComputer) {
            return "You start!";
        } else {
            return "Player 1 starts!";
        }

    } else {
        computerStarted = true;

        if(gameWithComputer) {
            return "Computer starts!"
        } else {
            return "Player 2 starts!";
        }
    }
}


