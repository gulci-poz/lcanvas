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
        // drawing canvas here
        context.fillStyle = "#aaaaaa";
        context.fillRect(0, 0, 200, 200);
        context.fillStyle = "#000000";
        context.font = "20px _sans";
        context.textBaseline = "top";
        context.fillText("Canvas!", 0, 0);
    }
}
