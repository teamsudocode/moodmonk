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

var change = function (mood) {
    "use strict";
    console.log('changing to ' + mood);
    let moodcolor,textcolor;
    switch (mood) {
        case ("anger"):
            moodcolor = "#e53935";
            textcolor = "white";
        case ("disgust"):
            moodcolor = "#2e7d32";
            textcolor = "white";
        case ("fear"):
            moodcolor = "#5e35b1";
            textcolor = "white";
        case ("joy"):
            moodcolor = "#ffeb3b";
            textcolor = "black";
        case ("sadness"):
            moodcolor = "#0d47a1";
            textcolor = "white";
    }
    var html = document.getElementsByTagName('html')[0];
    html.style.setProperty("--bgcolor", moodcolor);
    document.getElementById('word').innerHTML = mood;
    document.getElementById('word').style.color = textcolor;
    document.getElementById('word').className = "animated zoomIn";
    document.getElementById('word').className = "animated zoomOut";
};

document.getElementById("start").addEventListener('click', begin);
document.getElementById("close").addEventListener('click', close);

var ctr = 0;
document.getElementById("mic").onclick = function () {
    ctr = (ctr + 1) % 2;
    if (ctr == 0)
        micClicked();
};
