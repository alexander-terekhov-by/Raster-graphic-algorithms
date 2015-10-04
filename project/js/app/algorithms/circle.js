
function algorithmCircle(p1, p2) {
    var lengthX = Math.abs(p2.x - p1.x);
    var lengthY = Math.abs(p2.y - p1.y);
    var radius = Math.round(Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)));

    var x = 0, y = radius, gap = 0, delta = (2 - 2 * radius);


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
        if (delta < 0 && gap <= 0) {
            x++;
            delta += 2 * x + 1;

        } else if (delta > 0 && gap > 0) {
            y--;
            delta -= 2 * y + 1;


        } else {

            x++;
            delta += 2 * (x - y);
            y--;
        }
    }
}