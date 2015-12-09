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

context.strokeStyle = "black";
// domyślnie 1.0
context.lineWidth = 10;
// domyślnie butt; square, round
context.lineCap = "square";
// context.lineJoin - wypełniony trójkąt
// domyślnie miter - krawędź na łączeniu
// bevel - diagonala na łączeniu
// round
// miterLimit - maksymalne dozwolone ratio miter length / line width (domyślnie jest 10)
context.beginPath();
context.moveTo(20, 5);
context.lineTo(100, 5);
// finalizacja i rysowanie linii
context.stroke();
context.closePath();

context.strokeStyle = "black";
context.lineWidth = 10;
context.lineJoin = "bevel";
context.lineCap = "round";
context.beginPath();
context.moveTo(5, 5);
context.lineTo(30, 5);
context.lineTo(30, 30);
context.stroke();
context.closePath();

context.beginPath();
context.moveTo(10, 50);
context.lineTo(35, 50);
context.lineTo(35, 75);
context.stroke();
context.closePath();

context.lineJoin = "round";
context.lineCap = "butt";
context.beginPath();
context.moveTo(10, 100);
context.lineTo(35, 100);
context.lineTo(35, 125);
context.stroke();
context.closePath();

context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
// context.arc(x, y, radius, startAngle, endAngle, anticlockwise)
//context.arc(100, 100, 20, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
// wycinek łuku
//context.arc(100, 100, 20, (Math.PI / 180) * 0, (Math.PI / 180) * 90, false);
// dopełnienie wycinka łuku - anticlockwise na true
context.arc(100, 100, 20, (Math.PI / 180) * 0, (Math.PI / 180) * 90, true);
context.stroke();
context.closePath();

context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
// context.arcTo(x1, y1, x2, y2, radius)
// ta funkcja zadziała tylko wtedy, gdy domyślna ścieżka ma przynajmniej jedną podścieżkę (subpath); rysujemy ścieżkę z obecnego punktu do (x1, y1), potem z tego punktu rysujemy łuk o promieniu radius do punktu przesuniętego o (x2, y2)
context.moveTo(5, 5);
context.lineTo(105, 205);
context.arcTo(355, 355, 100, 100, 20);
context.stroke();
context.closePath();

// krzywe Bezier, punkt początkowy, końcowy, jeden lub dwa punkty kontrolne, x i y to punkty końcowe
// context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
// context.quadraticCurveTo(cpx, cpy, x, y)
context.beginPath();
context.strokeStyle = "black";
context.lineWidth = 5;
//context.moveTo(10, 10);
//context.quadraticCurveTo(110, 35, 10, 60);
context.moveTo(150, 10);
context.bezierCurveTo(0, 135, 300, 185, 150, 310);
context.stroke();
context.closePath();

// ===== clipping

context.fillStyle = "black";
context.fillRect(10, 10, 200, 200);
context.save();

context.beginPath();
// clipping region
// można użyć innych metod do obcinania, np. arc
// clip zamyka ścieżkę
context.rect(0, 0, 50, 50);
context.clip();

context.beginPath();
context.strokeStyle = "red";
context.lineWidth = 5;
context.arc(100, 100, 95, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
context.stroke();
context.closePath();

// do stanu jest zapisywany clipping region, więc musimy dać restore(), mimo ustawienia dalej nowego clipping region
context.restore();

context.beginPath();
context.rect(0, 0, 500, 500);
context.clip();

context.beginPath();
context.strokeStyle = "blue";
context.lineWidth = 5;
context.arc(100, 100, 50, (Math.PI / 180) * 0, (Math.PI / 180) * 360, false);
context.stroke();
context.closePath();

// ===== clipping

// ===== compositing

// globalAlpha
// globalCompositeOperation - jak są rysowane kształty po aplikacji globalAlpha i transformacji
// source - kształt do narysowania, destination - current bitmap na canvas
// copy - gdzie się pokrywają, tam source, a nie destination
// destination-atop - destination na source; jeśli się pokrywają i oba są opaque, to destination; jeśli source jest opaque, a destination transparent, to source; gdzie indziej wyświetla przeźroczystość
// destination-in - destination w source; destination, jeśli oba są opaque; gdzie indziej wyświetla przeźroczystość
// destination-out - destination out source; destination, jeśli destination jest opaque, a source jest transparent; gdzie indziej wyświetla przeźroczystość
// destination-over - destination over the source; destination, jeśli destination jest opaque; gdzie indziej wyświetla source
// lighter - source plus destination; suma, wartości kolorów z granicą 1.0
// source-atop
// source-in
// source-out
// source-over (default)
// xor - exclusive OR source i destination
context.fillStyle = "black";
context.fillRect(10, 10, 200, 200);

context.fillStyle = "red";
context.fillRect(1, 1, 50, 50);

context.globalCompositeOperation = "source-over";
context.fillRect(60, 1, 50, 50);

// destination-atop nie działa poprawnie w przeglądarkach
// nie działa w Firefox i Chrome
//context.globalCompositeOperation = "destination-atop";
//context.fillRect(1, 60, 50, 50);

context.globalAlpha = 0.5;

context.globalCompositeOperation = "source-atop";
context.fillRect(60, 60, 50, 50);

// ===== compositing

// ===== rotation; setTransform and translate used

context.fillStyle = "black";
context.fillRect(20, 20, 25, 25);

// (1) najpierw resetujemy macierz transformacji
// obiekt do transformacji musi się pojawić po wywołaniu setTransform()
context.setTransform(1, 0, 0, 1, 0, 0);
var angleInRadians = 45 * Math.PI / 180;

var x = 100;
var y = 100;
var width = 50;
var height = 50;
// (2) punkt transformacji przesuwamy do centrum naszego obiektu
// inaczej, centrum naszego obiektu będzie punktem (0, 0)
context.translate(x + 0.5 * width, y + 0.5 * height);

// rotacja - kąt zero, facing to the left (obiekt może mieć inną facing side, domyślnie to będzie lewa)
context.rotate(angleInRadians);
context.fillStyle = "red";
// najpierw wykonujemy rotację, a potem rysujemy obiekt
// musimy pamiętać o tym, że wykonaliśmy translację centrum obiektu
context.fillRect(-0.5 * width, -0.5 * height, width, height);

// ===== rotation
