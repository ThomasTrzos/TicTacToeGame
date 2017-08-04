
var userA = "";
var userB = ""; // or computer

window.onload = function(){

    var fields = document.getElementById("fields");
    var li = fields.getElementsByTagName("li");

    for (var i=0; i<li.length; i++)
    {
        li[i].addEventListener("click", function(e) {
            e.target.innerHTML = "O"; // or "X"
            /*console.log(e.target.parentNode.className);*/
            },false);
    }

    // add event listener for 'X' & 'O' buttons in game-choice division

    var x = document.getElementById("x-btn");
    var o = document.getElementById("o-btn");
    var back = document.getElementById("back-btn");

    addListenerForButton(x);
    addListenerForButton(o);
    addListenerForButton(back);

};

function addListenerForButton(button) {

    button.addEventListener("click", function (e) {
        var btnValue = e.target.innerHTML;

        if(btnValue === "X") {
            userA = btnValue;
            userB = "O";

            // TODO: and go to next division

        } else if(btnValue === "O") {
            userA = btnValue;
            userB = "X";

            // TODO: and go to next division
        } else if(btnValue.indexOf("Back") !== -1) {
            //TODO: back to previous diviison
        }

    }, false);

}

function selectChar() {

}


