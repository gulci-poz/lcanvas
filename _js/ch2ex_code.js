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
        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 45 * Math.PI / 180;
        var x = 50;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-0.5 * width, -0.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 75 * Math.PI / 180;
        var x = 100;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-0.5 * width, -0.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 90 * Math.PI / 180;
        var x = 150;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-0.5 * width, -0.5 * height, width, height);

        context.setTransform(1, 0, 0, 1, 0, 0);
        var angleInRadians = 120 * Math.PI / 180;
        var x = 200;
        var y = 100;
        var width = 40;
        var height = 40;
        context.translate(x + 0.5 * width, y + 0.5 * height);
        context.rotate(angleInRadians);
        context.fillStyle = "red";
        context.fillRect(-0.5 * width, -0.5 * height, width, height);
    }
}
