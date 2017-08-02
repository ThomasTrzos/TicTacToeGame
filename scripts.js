
window.onload = function(){

    var fields = document.getElementById('fields');
    var li = fields.getElementsByTagName('li');

    for (var i=0; i<li.length; i++)
    {
        li[i].addEventListener('click', function(e) {
            e.target.innerHTML = "O"; // or "X"
            /*console.log(e.target.parentNode.className);*/
            },false);
    }

};

