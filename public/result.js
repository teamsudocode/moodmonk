var max;
function getDateKey(today) {
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    return mm + '-' + dd + '-' + yyyy;
}

var dati = getDateKey(new Date());
$.get("/logger/day/3-24-2017", function (data) {
    // document.getElementById("moodi").innerHTML = stringi();
    function stringi() {
        max = Math.max(data.emotion_tone.anger, data.emotion_tone.disgust, data.emotion_tone.fear, data.emotion_tone.sadness, data.emotion_tone.joy);
        if (max == data.emotion_tone.anger) {
            carding("anger");
            return "anger";
        }
        if (max == data.emotion_tone.disgust) {
            carding("disgust");
            return "disgust";
        }
        if (max == data.emotion_tone.fear) {
            carding("fear");
            return "fear";
        }
        if (max == data.emotion_tone.sadness) {
            carding("sadness");
            return "sadness";
        }
        if (max == data.emotion_tone.joy) {
            carding("joy");
            return "joy";
        }
        return null;
    }
    console.log(data.social_tone.openness);
    var chart1 = c3.generate({
        bindto: '#g1',
        data: {
            // iris data from R
            columns: [

            ],
            type: 'pie',
            onclick: function (d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function (d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
            }
        },
        color: {
            pattern: ['#0d47a1', '#1976d2', '#2196f3', '#64b5f6', '#bbdefb']
        },
        pie: {
            label: {
                format: function (value, ratio, id) {

                }
            }
        }
    });

    let updateSpeed = 500;
    setTimeout(function() {
        chart1.load({
            columns: [
                ["anger", data.emotion_tone.anger]
            ]
        });
    }, updateSpeed*1);

    setTimeout(function() {
        chart1.load({
            columns: [
                ["fear", data.emotion_tone.fear],
            ]
        });
    }, updateSpeed*2);

    setTimeout(function() {
        chart1.load({
            columns: [
                ["sadness", data.emotion_tone.sadness],
            ]
        });
    }, updateSpeed*3);

    setTimeout(function() {
        chart1.load({
            columns: [
                ["disgust", data.emotion_tone.disgust],
            ]
        });
    }, updateSpeed*4);

    setTimeout(function() {
        chart1.load({
            columns: [
                ["joy", data.emotion_tone.joy],
            ]
        });
    }, updateSpeed*5);



    var chart2 = c3.generate({
        bindto: '#g2',
        data: {
            // iris data from R
            columns: [

            ],
            type: 'pie',
            onclick: function (d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function (d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
            }
        },
        color: {
            pattern: ['#0d47a1', '#1976d2', '#2196f3', '#64b5f6', '#bbdefb']
        },
        pie: {
            label: {
                format: function (value, ratio, id) {

                }
            }
        }
    });

    setTimeout(() => {
        chart2.load({
            columns: [ [ "analytical", data.language_tone.analytical ]]
        });
    }, updateSpeed*1);

    setTimeout(() => {
        chart2.load({
            columns: [
                ["confident", data.language_tone.confident]
            ]
        });
    }, updateSpeed*2);

    setTimeout(function () {
        chart2.load({
            columns: [
                ["tentative", data.language_tone.tentative]
            ]
        });
    }, updateSpeed*3);


    var chart3 = c3.generate({
        bindto: '#g3',
        data: {
            // iris data from R
            columns: [

            ],
            type: 'pie',
            onclick: function (d, i) {
                console.log("onclick", d, i);
            },
            onmouseover: function (d, i) {
                console.log("onmouseover", d, i);
            },
            onmouseout: function (d, i) {
                console.log("onmouseout", d, i);
            }
        },
        color: {
            pattern: ['#0d47a1', '#1976d2', '#2196f3', '#64b5f6', '#bbdefb']
        },
        pie: {
            label: {
                format: function (value, ratio, id) {

                }
            }
        }
    });

    setTimeout(function () {
        chart3.load({
            columns: [
                ["openness", data.social_tone.openness]
            ]
        });
    }, updateSpeed*1);

    setTimeout(function () {
        chart3.load({
            columns: [
                ["conscientiousness", data.social_tone.conscientiousness]
            ]
        });
    }, updateSpeed*2);

    setTimeout(function () {
        chart3.load({
            columns: [
                ["extraversion", data.social_tone.extraversion]
            ]
        });
    }, updateSpeed*3);

    setTimeout(function () {
        chart3.load({
            columns: [
                ["agreableness", data.social_tone.agreableness]
            ]
        });
    }, updateSpeed*4);

    setTimeout(function () {
        chart3.load({
            columns: [
                ["emotional range", data.social_tone.emotional_range],
            ]
        });
    }, updateSpeed*5);


});

function c4 (p, n, x1) {

    var chart4 = c3.generate({
        bindto: '#gl1',
        data: {
            x: 'Date',
            columns: [
                x1,
                p,
                n
            ],
            type: 'spline'
        }
    });
}
// function carding(mood){
//     console.log(mood);
//     $.get("/recommend/video/" + mood, function(data){
//         document.getElementById("vlink").innerHTML = data;
//         document.getElementById("vlink").href = data;
//     });
//     $.get("/recommend/quote/" + mood, function(data){
//         console.log(data);
//         document.getElementById("qlink").innerHTML = data;
//     });
//     $.get("/recommend/activity/" + mood, function(data){
//         document.getElementById("actlink").innerHTML = data;
//     });
// }

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

var dateOneWeekAgo = (new Date()).addDays(-7);
$.get("/logger/range/"+getDateKey(dateOneWeekAgo)+"/"+dati, function(data) {

    // setting up positive chart
    var positiveData = ['Positive emotions'];
    var negativeData = ['Negative emotions'];
    var xTicks       = ['Date'];

    for (let day in data) {
        positiveData.push(data[day].emotion_tone.joy);
        negativeData.push(data[day].emotion_tone.sadness); //+ data[day].emotion_tone.fear +
                          //data[day].emotion_tone.disgust + data[day].emotion_tone.sadness);
        xTicks.push(parseInt(day.substring(2,4)));
    }
    console.log(xTicks);
    console.log(positiveData);
    console.log(negativeData);
    c4(positiveData,negativeData, xTicks);
});
