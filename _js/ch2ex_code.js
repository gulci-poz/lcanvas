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
    } else {
        var theCanvas = document.getElementById("canvas");
        var context = theCanvas.getContext("2d");
    }

    Debugger.log("Drawing Canvas");

    drawScreen();

    function drawScreen() {
        context.strokeStyle = "black";
        context.lineWidth = 10;
        context.lineCap = "square";
        context.beginPath();
        context.moveTo(20, 5);
        context.lineTo(100, 5);
        // finalizacja i rysowanie linii
        context.stroke();
        context.closePath();
    }
}
