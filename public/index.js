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
    try {
        if (listening) stopListening();
    } catch (e) { }
    var html = document.getElementsByTagName('html')[0];
    html.style.setProperty("--bgcolor", '#26b2fa');
};

var change = function (mood) {
    "use strict";
    console.log('changing to ' + mood);
    let moodcolor, textcolor, moodtext;
    switch (mood) {
        case ("anger"):
            moodcolor = "#e53935";
            textcolor = "white";
            moodtext = "Anger";
            break;
        case ("disgust"):
            moodcolor = "#2e7d32";
            textcolor = "white";
            moodtext = "Disgust";
            break;
        case ("fear"):
            moodcolor = "#5e35b1";
            textcolor = "white";
            moodtext = "Fear";
            break;
        case ("joy"):
            moodcolor = "#ffeb3b";
            textcolor = "white";
            moodtext = "Joy";
            break;
        case ("sadness"):
            moodcolor = "#0d47a1";
            textcolor = "white";
            moodtext = "Sadness";
            break;
    }
    var html = document.getElementsByTagName('html')[0];
    html.style.setProperty("--bgcolor", moodcolor);
    var div = document.createElement('div');
    document.body.appendChild(div);
    div.id = 'word';
    document.getElementById('word').textContent = moodtext;
    document.getElementById('word').style.color = textcolor;
    document.getElementById('word').className = "animated zoomIn";
    document.getElementById('word').style.opacity = 0;
    setTimeout(function(){
        $( "#word" ).remove();
    },2000);
};

document.getElementById("start").addEventListener('click', begin);
document.getElementById("close").addEventListener('click', close);

var ctr = 0;
document.getElementById("mic").onclick = function () {
    ctr = (ctr + 1) % 2;
    if (ctr == 0)
        micClicked();
};