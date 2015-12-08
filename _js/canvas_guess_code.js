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

    var formElement = document.getElementById("createImageData");
    formElement.addEventListener("click", createImageDataPressed, false);

    // guesses - liczba zgadnięć
    // message - instrukcje jak grać
    // letters - lista liter, do losowania i ustalenia pozycji
    // today - bieżąca data
    // letterToGuess - litera do zgadnięcia
    // higherOrLower - "Higher" || "Lower", gdzie jesteśmy w stosunku do sekretnej litery; lub inny komunikat, np. to nie jest litera
    // lettersGuessed - dotychczas typowane litery
    // gameOver - false, do czasu wygranej użytkownika

    var guesses = 0;
    var message = "Guess The Letter From a (lower) to z (higher)";
    var letters = [
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
    ];

    var today = new Date();
    var letterToGuess = "";
    var higherOrLower = "";
    var lettersGuessed = [];
    var gameOver = false;

    Debugger.log("Drawing Canvas");

    initGame();

    function drawBasicInfo() {
        // background
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 500, 300);

        // box
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290);

        // text alignment
        // wystarczy raz ustawić dla wszystkich następujących tekstów
        context.textBaseline = "top";

        // date
        context.fillStyle = "#000000";
        context.font = "10 px Sans-Serif";
        context.fillText(today, 10, 10);

        // message
        context.fillStyle = "#ff0000";
        context.font = "14px Sans-Serif";
        context.fillText(message, 125, 40);
    }

    function drawScreen() {
        drawBasicInfo();

        // guesses
        context.fillStyle = "#109910";
        context.font = "16px Sans-Serif";
        context.fillText("Guesses: " + guesses, 215, 60);

        // higher or lower
        context.fillStyle = "#000000";
        context.font = "16px Sans-Serif";
        context.fillText("Higher Or Lower: " + higherOrLower, 150, 125);

        // letters guessed
        context.fillStyle = "#ff0000";
        context.font = "16px Sans-Serif";
        context.fillText("Letters Guessed: " + lettersGuessed.toString(), 10, 260);

        // game over
        if(gameOver) {
            context.fillStyle = "#ff0000";
            context.font = "40px Sans-Serif";
            context.fillText("You Got It!", 150, 180);
        }
    }

    function initGame() {
        drawBasicInfo();

        var letterIndex = Math.floor(Math.random() * letters.length);
        letterToGuess = letters[letterIndex];
        guesses = 0;
        lettersGuessed = [];
        gameOver = false;

        window.addEventListener("keydown", eventKeyPressed, true);
    }

    function eventKeyPressed(e) {
        if(!gameOver) {
            var letterPressed = String.fromCharCode(e.keyCode);
            letterPressed = letterPressed.toLowerCase();
            guesses++;
            lettersGuessed.push(letterPressed);

            if(letterPressed == letterToGuess) {
                gameOver = true;
                higherOrLower = letterToGuess + " is the letter";
            } else {
                letterIndex = letters.indexOf(letterToGuess);
                guessIndex = letters.indexOf(letterPressed);
                Debugger.log(guessIndex);

                // indexOf() zwróciła -1
                if(guessIndex < 0) {
                    higherOrLower = "That is not a letter";
                } else if(guessIndex > letterIndex) {
                    higherOrLower = "Lower";
                } else {
                    higherOrLower = "Higher";
                }
            }

            drawScreen();
        }
    }

    function createImageDataPressed(e) {
        window.open(
            theCanvas.toDataURL(),
            "canvasImage",
            "left=0, top=0, width=" +
                theCanvas.width
                ",height=" +
                theCanvas.height +
                ",toolbar=0,resizable=0"
        );
    }
}
