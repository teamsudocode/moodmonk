var langs = [
    ['English (India)', 'en-IN'],
    ['Hindi', 'hi-IN']
];

var final_transcript = '';
var current_transcript = '';
var recognition = null;
var compatible = false;
var listening = false;
var languageSelector = null;
var currentLanguage = langs[0][1];
var resultDisplay = null;


function checkCompatibility() {
    return 'webkitSpeechRecognition' in window ||
        'SpeechRecognition' in window;
}

function setupRecognitionHandlers() {
    if (!recognition) {
        console.log("Recognition not set up. This should not happen.");
        return;
    }
    recognition.onstart = function() {
        listening = true;
    };
    recognition.onerror = function(event) {
        console.log("recognition says: wtf " + event.error);
    };
    recognition.onend = function() {
        if (listening && recognition) {
            recognition.start();
        }
    };
    recognition.onresult = function(event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                current_transcript = event.results[i][0].transcript;
                final_transcript += event.results[i][0].transcript + '. ';
            }
        }
        final_transcript = capitalize(final_transcript);
        console.log(final_transcript);
        if (resultDisplay)
            resultDisplay.innerText = final_transcript;
        // final_span.innerHTML = linebreak(final_transcript);
    };
}

function setupMic(micElem, outputElem, languageSelect, errorHandlerDiv)
{
    // setup language selectors
    if (languageSelect) {
        languageSelector = languageSelect;
        while (languageSelect.options.length > 0)
            languageSelect.options.remove(0);
        for (let i = 0; i < langs.length; i++)
            languageSelect.options.add(new Option(langs[i][0], langs[i][1]));
    }

    // setup mic elem
    micElem.onclick = micClicked;
    resultDisplay = outputElem;
}

function setLang() {
    if (! languageSelector) {
        console.log("setLang: wtf");
        return;
    }
    currentLanguage = langs[languageSelector.selectedIndex][1];
}

function micClicked(event) {
    if (listening) {
        stopListening();
        return;
    }
    startListening();
}

function startListening() {
    if (!recognition) {
        recognition = new webkitSpeechRecognition();
        setupRecognitionHandlers();
    }
    listening = true;
    final_transcript = '';
    recognition.lang = 'en-IN';
    recognition.start();
}

function stopListening()
{
    if (recognition)
        listening = false;
    recognition = null;
}

var first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
