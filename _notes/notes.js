// addEventListener()
// trzeci argument useCapture: true || false
// jeśli true, to funkcja przechwyci zdarzenie przed propagacją niżej w drzewie obiektów DOM
// tutaj używamy false

window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded() {
    canvasApp();
}

// można też inaczej
window.onload = function() {
    // wewnątrz anonimowej funkcji wywołujemy canvasApp()
    // wywołanie nie jest w tej chwili, tylko w chwili wystąpienia zdarzenia
    canvasApp();
};

// lub jeszcze inaczej
// przypisujemy canvasApp do obsługi zdarzenia, ale nie wywołujemy jej w tej chwili
window.onload = canvasApp;

// ==================================================

// jeśli taki element nie istnieje, to dostaniemy false
var theCanvas = document.getElementById("canvasOne");

// sprawdzamy istnienie elementu canvas i kontekstu czyli powierzchni do rysowania zdefiniowanej przez przeglądarkę dla wsparcia canvas
// kontekst 2d html5 to obiekt CanvasRenderingContext2D
// jeśli test się nie uda, to wychodzimy
if(!theCanvas || !theCanvas.getContext) {
    return;
}

// inna metoda od Marka Pilgrima, za pomocą dummy canvas
// po co dwa razy !! ?
function canvasSupport() {
    // sposób na stworzenie obiektu canvas z posiomu JS
    // do width i height można zrobić przypisanie, nie są tylko do odczytu
    // można zmienić rozmiar canvas bez przeładowania strony
    // ustawianie width i height w CSS, to skalowanie, ma miejsce resampling
    return !!document.createElement("canvas").getContext();
}

function canvasApp() {
    if(!canvasSupport) {
        return
    }
}

// modernizr również korzysta z dummy canvas

// w canvas działamy w immediate mode, nie mamy żadnych obiektów, co klatkę odświeżamy obraz (obszar obrazu zapełniany bitmapą); jeśli cokolwiek się zmieni, to wszystko musi być narysowane ponownie; ~global properties - ułatwiają update obrazu
// retained mode korzysta z obiektów przechowywanych w drawing surface, manipulacja za pomocą listy wyświetlania, obiekty mają niezależne stany (np. Flash i Silverlight)

// kontekst
// current state - stos stanów rysowania, który dotyczy globalnie całego canvas
// macierze transformacji: skala, rotacja, transformacja, translacja
// clipping region: tworzone metodą clip()
// właściwości kontekstu: strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline

// na razie mamy metody: fillRect, fillText, drawImage, strokeRect

// obiekt canvas ma dwie publiczne metody: getContext() i toDataURL()

// toDataURL(), zwraca string zawierający bitmapowy obras canvaz wyrenderowany w danej chwili - snapshot ekranu
// żeby otrzymać dane w określonym formacie trzeba podać jako parametr typ MIME, standardowo jest to image/png

// jest jeszcze trzecia metoda w trakcie implementacji: toBlob([callback]), zwraca referencję do pliku zamiast stringu zakodowanego jako base64, na razie żadna przeglądarka nie implementuje tej metody, na stronie mozilli jest wsparcie dla Firefox i IE od 10

// funkcja window.requestAnimFrame(), zmienia się i nie jest jeszcze zaimplementowana we wszystkich przeglądarkach, używa delta timera, żeby poinformować program kiedy przeglądarka jest gotowa do wyrenderowania nowej klatki animacji
window.requestAnimFrame = (function() {
    return
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

(function animloop() {
    requestAnimFrame(animloop);
    render();
})();
// by Paul Irish

// dostępność (accessibility) dla canvas, fallback DOM concept - sub dom, definiujemy element DOM dla każdego elementu z canvas zamiast jednego tekstu w tagu canvas, również tytuł musi być dobrze dostępny
// do imitacji screen readera możemy użyć wtyczki Fangs w Firefoksie, potem right-click i View Fangs
// jest też Chrome Vox dla Chrome
// czytniki chcą znać dokładne położenie elementu sub dom na canvas, W3C Canvas Hit Testing Proposal
