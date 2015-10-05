function algorithmBresenham(p1, p2) {
    var dx = ((p2.x - p1.x) >= 0 ? 1 : -1);
    var dy = ((p2.y - p1.y) >= 0 ? 1 : -1);
    var lengthX = Math.abs(p2.x - p1.x);
    var lengthY = Math.abs(p2.y - p1.y);
    var iterationNumber = Math.max(lengthX, lengthY);
    var x = p1.x;
    var y = p1.y;
    var step = 0;
    var stepFunction;
    var error;
    $console.append("\nАлгоритм Брезенхема: Количество шагов = " + iterationNumber + "\n");
    $console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");

    if (lengthY <= lengthX) {
        $console.append(" Угол меньше 45 град \n");
        error = -lengthX;
        stepFunction = bresenhamStepWhenAngleLess45;
    }
    else {
        $console.append(" Угол больше 45 град \n");
        error = -lengthY;
        stepFunction = bresenhamStepWhenAngleMore5;
    }


    $("#next-step").click(function () {
        stepFunction();
        if (step > iterationNumber) {
            enableButtons();
        }
    });


    function bresenhamStepWhenAngleMore5() {
        step++;
        $console.append("Шаг №" + step + ": x = " + x + ", y " + y + ", error = " + error + "\n");
        drawPixel(x, y);
        y += dy;
        error += 2 * lengthX;
        if (error > 0) {
            error -= 2 * lengthY;
            x += dx;
        }
    }

    function bresenhamStepWhenAngleLess45() {
        step++;
        $console.append("Шаг №" + step + ": x = " + x + ", y " + y + ", error = " + error + "\n");
        drawPixel(x, y);
        x += dx;
        error += 2 * lengthY;
        if (error > 0) {
            error -= 2 * lengthX;
            y += dy;
        }
    }
}
