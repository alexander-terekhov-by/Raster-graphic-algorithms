function algorithmWu(p1, p2) {
    var dx = ((p2.x - p1.x) >= 0 ? 1 : -1);
    var dy = ((p2.y - p1.y) >= 0 ? 1 : -1);
    var lengthX = Math.abs(p2.x - p1.x);
    var lengthY = Math.abs(p2.y - p1.y);
    var iterationNumber = Math.max(lengthX, lengthY);
    var x = p1.x;
    var y = p1.y;
    var error = 0.5;
    var dE = 0;
    var step = 0;
    var stepFunction;
    $console.append("\nАлгоритм Ву: Количество шагов = " + iterationNumber + "\n");
    $console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");

    if (lengthY <= lengthX) {
        $console.append(" Угол меньше 45 град \n");
        dE = lengthY / lengthX;
        stepFunction = wuStepWhenAngleLess45;
    }
    else {
        $console.append(" Угол больше 45 град \n");
        dE = lengthX / lengthY;
        stepFunction = wuStepWhenAngleMore45;
    }

    if (isHorizontalOrVertical()) {
        dE = 0;
    }


    $("#next-step").click(function () {
        stepFunction();
        if (step > iterationNumber) {
            enableButtons();
        }
    });

    function wuStepWhenAngleMore45() {
        step++;
        $console.append("Шаг №" + step + ": x = " + x + ", y " + y + ", error = " + error + "\n");
        drawWuPixel(x, y, makeIntensity());
        drawWuPixel(x - dx, y, 1 - makeIntensity());
        y += dy;
        error += dE;
        if (error >= 0.5) {
            $console.append("error =  " + error + " > 0 -> x++" + "\n");
            error -= 1;
            x += dx;
        }
    }

    function makeIntensity() {
        return Number((error).toFixed(1)) + 0.5;
    }


    function isHorizontalOrVertical() {
        return (lengthX == 0 || lengthY == 0)
    }

    function wuStepWhenAngleLess45() {
        step++;
        $console.append("Шаг №" + step + ": x = " + x + ", y " + y + ", error = " + error + "\n");
        drawWuPixel(x, y, makeIntensity());
        drawWuPixel(x, y - dy, 1 - makeIntensity());
        x += dx;
        error += dE;
        if (error >= 0.5) {
            $console.append("error =  " + error + " > 0 -> y++" + "\n");
            error -= 1;
            y += dy;
        }
    }


}