window.addEventListener("load", eventWindowLoaded, false);

var Debugger = function() { };
Debugger.log = function(message) {
    try {
        // jeśli funkcja console.log() jest wspierana w przeglądarce
        console.log(message);
    } catch(exception) {
        // przechwytujemy błąd wyrzucany przez przeglądarkę i nic nie robimy
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
    // dostajemy obiekt CanvasRenderingContext2D
    // jest to referencja do kontekstu canvas 2d
    // używamy kartezjańskiego układu współrzędnych od (0, 0) w prawo i w dół
    var context = theCanvas.getContext("2d");

    Debugger.log("Drawing Canvas");

    function drawScreen() {
        // background
        context.fillStyle = "#ffffaa";
        context.fillRect(0, 0, 500, 300);

        // text
        context.fillStyle = "#000000";
        context.font = "20px Sans-Serif";
        // vertical alignment
        context.textBaseline = "top";
        context.fillText("Hello World!", 195, 80);

        // image
        var helloWorldImage = new Image();
        helloWorldImage.onload = function() {
            context.drawImage(helloWorldImage, 160, 130);
        };
        helloWorldImage.src = "_img/helloworld.gif";

        // box
        context.strokeStyle = "#000000";
        context.strokeRect(5, 5, 490, 290);
    }

    drawScreen();
}
