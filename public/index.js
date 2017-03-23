var begin = function () {
    "use strict";
    document.getElementById("contentwrap").className = "animated flipOutX";
    document.getElementById("close").className = "animated fadeIn";
    document.getElementById("Clouds").className = "hidden";
    document.getElementById("mic").className = "animated fadeInUpBig";
    document.body.style.backgroundImage = "none";
};

var close = function () {
    "use strict";
    document.getElementById("contentwrap").className = "animated flipInX";
    document.getElementById("close").className = "animated fadeOut";
    document.getElementById("Clouds").className = "block";
    document.getElementById("mic").className = "animated fadeOutDownBig";
    document.body.style.backgroundImage = "background-image: radial-gradient(circle, #00b5ff 0%, #26b2fa 70%, #1fd2fb 100%)";
};

//var change = function () {
//    "use strict";
//    var html = document.getElementsByTagName('html')[0];
//    html.style.setProperty("--bgcolor", "red");
//    document.getElementById('word').className = "animated zoomIn";
//    document.getElementById('word').className = "animated zoomOut";
//};

document.getElementById("start").addEventListener('click', begin);
document.getElementById("close").addEventListener('click', close);

