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

    Debugger.log("Drawing Canvas");

    drawScreen();

    function drawScreen() {
        // drawing canvas here
    }
}
