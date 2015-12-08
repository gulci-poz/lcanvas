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

    var alpha = 0;
    var fadeIn = true;
    var text = "Hello World";
    var helloWorldImage = new Image();
    helloWorldImage.src = "_img/html5bg.jpg";

    Debugger.log("Drawing Canvas");

    gameLoop();

    function drawScreen() {
        // background
        context.globalAlpha = 1;
        context.fillStyle = "#000000";
        context.fillRect(0, 0, 640, 480);

        // text
        context.font = "72px Sans-Serif";
        context.textBaseline = "top";
        context.fillStyle = "#ffffff";
        context.fillText(text, 150, 200);

        if(fadeIn) {
            alpha += 0.01;
            if(alpha >= 1) {
                alpha = 1;
                fadeIn = false;
            }
        } else {
            alpha -= 0.01;
            if(alpha < 0) {
                alpha = 0;
                fadeIn = true;
            }
        }

        context.globalAlpha = alpha;

        // image
        // nie używamy helloWorldImage.onload, obraz jest już załadowany wcześniej, a ładowanie go tutaj łączyłoby się z ponownym ładowaniem dla każdego obiegu gameLoop(), obrazek by migotał, tutaj tylko rysujemy na canvas
        context.drawImage(helloWorldImage, 0, 0);
    }

    // lepiej ze względu na wydajność niż setInterval(), sama się czyści i nie wykonuje się w nieskończoność
    // jest też funkcja window.requestAnimFrame(): notatki
    function gameLoop() {
        window.setTimeout(gameLoop, 20);
        drawScreen();
    }
}
