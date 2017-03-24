var request = require('request');
var r = request.defaults({ 'proxy': 'http://172.31.1.6:8080/' });



var recommend = function (emotion) {
    var feel;
    if (emotion == "anger") { feel = "love"; }
    else if (emotion == "disgust") { feel = "art"; }
    else if (emotion == "fear") { feel = "management"; }
    else if (emotion == "joy") { feel = "life"; }
    else if (emotion == "sadness") { feel = "funny"; }

    var options = {
        url: 'http://quotes.rest/qod.json?category=' + feel,
        method: 'GET'
    };

    switch (emotion) {
        case 'anger':
            anger();
            break;
        case 'disgust':
            disgust();
            break;
        case 'fear':
            fear();
            break;
        case 'joy':
            joy();
            break;
        case 'sadness':
            sadness();
    }
}
var quote = function (text, mycallback) {
    options.body = '{"text": "' + text + '"}';
    r(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('requests successful');
            mycallback(response);
        } else {
            console.log('response failed');
            console.log(error);
        }
    });
};


function sad() {
    var obj = {
        music: list_music,
        articles: list_article,
        quotes: list_quote
    };
    var list_music = [
        {
            title: '“Happy” by Pharrell Williams',
            url: "https://www.youtube.com/watch?v=y6Sxv-sUYtM"
        },
        {
            title: '“Three Little Birds” by Bob Marley',
            url: "https://youtu.be/zaGUr6wzyT8"
        },
        {
            title: '“Cecilia” by Simon and Garfunkel',
            url: "https://youtu.be/a5_QV97eYqM"
        },
        {
            title: '“Here Comes The Sun” by The Beatles',
            url: "https://youtu.be/wysBZYBx6UI"
        },
        {
            title: '“See You Again” by Carrie Underwood',
            url: "https://youtu.be/vTnWFT3DvVA"
        },
        {
            title: '“Stand By Me” by Ben E King',
            url: "https://youtu.be/hwZNL7QVJjE"
        },
        {
            title: '“Dance With Me” by Orleans',
            url: "https://youtu.be/_-IXJLgRnvs"
        },
        {
            title: '“Shake It Off” by Taylor Swift',
            url: "https://youtu.be/nfWlot6h_JM"
        },
        {
            title: '“The Weight” by The Band',
            url: "https://youtu.be/HmRDM7GyJXE"
        },
        {
            title: '“My Girl” by The Temptations',
            url: "https://youtu.be/6IUG-9jZD-g"
        }
    ];
    var list_article = [
        {
            title: "25 Things To Do When You're Feeling Down - BuzzFeed",
            url: "https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=12&cad=rja&uact=8&ved=0ahUKEwjrvO2D4-7SAhWFuY8KHaBIC-wQFghOMAs&url=http%3A%2F%2Fwww.buzzfeed.com%2Fhnigatu%2Fthings-to-do-when-youre-feeling-down&usg=AFQjCNFwXYwvIN36vxv7NBUMnhWT8OkisA&sig2=JH2Qr10nIhF7cY1CC_eAjQ"
        },
        {
            title: "30 Ways to Improve Your Mood When You're Feeling Down",
            url: "https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=14&cad=rja&uact=8&ved=0ahUKEwjrvO2D4-7SAhWFuY8KHaBIC-wQFghcMA0&url=http%3A%2F%2Ftinybuddha.com%2Fblog%2F30-ways-to-improve-your-mood-when-youre-feeling-down%2F&usg=AFQjCNE5kHJ5xpyTqk4bF6VtScGLZZk0hA&sig2=4eaS5_bQdWLftmGhaxyEIQ"
        },
        {
            title: "4 Ways to Get Happy when You're Sad - wikiHow",
            url: "https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=23&cad=rja&uact=8&ved=0ahUKEwjrvO2D4-7SAhWFuY8KHaBIC-wQFgh4MBY&url=http%3A%2F%2Fwww.wikihow.com%2FGet-Happy-when-You%2527re-Sad&usg=AFQjCNHJjWATYAnnRAehLOiVLtZlfxcssw&sig2=7NsIV8euIOgzlY2Q10FFwg"
        }

    ];

    var list_quote = quote();
}
module.exports = { recommend }
