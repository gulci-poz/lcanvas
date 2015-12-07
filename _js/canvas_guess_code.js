window.addEventListener("load", eventWindowLoaded, false);

var Debugger = function() { };
Debugger.log = function(message) {
    try {
        console.log(message);
    } catch(exception) {
        return;
    }
}

function eventWindowLoaded() {
    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if(!canvasSupport) {
        return;
    }

    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    // guesses - liczba zgadnięć
    // message - instrukcje jak grać
    // letters - lista liter, do losowania i ustalenia pozycji
    // today - bieżąca data
    // letterToGuess - litera do zgadnięcia
    // higherOrLower - "Higher" || "Lower" gdzie jesteśmy w stosunku do sekretnej litery
    // lettersGuessed - dotychczas typowane litery
    // gameOver - false, do czasu wygranej użytkownika

    var guesses = 0;
    // 72

    Debugger.log("Drawing Canvas");

    function drawScreen() {
        // drawing canvas here
    }

    drawScreen();
}
