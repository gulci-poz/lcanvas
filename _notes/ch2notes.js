context.fillStyle = "#000000";
context.strokeStyle = "#ff00ff";
context.lineWidth = 2;
context.fillRect(15, 15, 40, 40);
// stroke rozkłada się od środka krawędzi na obie strony (centralnie), rysując na krawędzi canvas możemy nie zobaczyć części stroke, trzeba rysować po odsunięciu sie nieco od krawędzi canvas
context.strokeRect(5, 5, 60, 60);
// czyści daną powierzchnię i czyni ją przeźroczystą (kolorem jest przeźroczysty czarny)
context.clearRect(25, 25, 20, 20);

// stan na stos: informacje z macierzy transformacji (context.rotate(), context.setTransform()), clipping region, wartości atrybutów canvas, m. in. globalAlpha, globalCompositeOperation, strokeStyle, textAlign, textBaseline, lineCap, lineJoin, lineWidth, miterLimit, fillStyle, font, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY
// częścią stanu nie są current path i current bitmap (manipulowane w kontekście canvas), może to być przydatne przy transformacji lub animowania pojedynczych obiektów

// push i pop na stos
context.save();
context.restore();

// kontekst może mieć tylko jedną current path, nie jest to część stanu
beginPath();
closePath();

// subpath - połączenie punktów wewnątrz ścieżki, może być zamknięta
// current transformation matrix będzie miała wpływ na rysowanie ścieżki, jeśli nie chcemy stosować transformacji do ścieżki, to ustawiamy tę macierz na jedność lub ją resetujemy
