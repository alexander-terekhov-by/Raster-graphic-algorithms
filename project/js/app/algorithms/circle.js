function algorithmCircle(p1, p2) {
    var lengthX = Math.abs(p2.x - p1.x);
    var lengthY = Math.abs(p2.y - p1.y);
    var radius = Math.round(Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)));
    $console.append("radius " + radius);

    var x = 0, y = radius, gap = 0, delta = 1 - 2 * radius;


    $("#next-step").click(function () {
        stepFunction();
        if (y < 0) {
            enableButtons();
        }
    });

    function stepFunction() {
        drawPixel(p1.x + x, p1.y + y);
        drawPixel(p1.x + x, p1.y - y);
        drawPixel(p1.x - x, p1.y - y);
        drawPixel(p1.x - x, p1.y + y);
        gap = 2 * (delta + y) - 1;
        if ((delta < 0) && (gap < 0)) {
            delta += 2 * ++x + 1;
            return;
        }
        gap = 2 * (delta - x) - 1;
        if ((delta > 0) && (gap > 0)) {
            delta += 1 - 2 * --y;
            return;
        }
        x++;
        y--;
        delta -= 2 * ( y - x - 1);
    }
}