function algorithmDDA(p1, p2) {
    var iterationNumber = Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
    var step = 0;
    var dX = (p2.x - p1.x) / iterationNumber;
    var dY = (p2.y - p1.y) / iterationNumber;
    var x = p1.x;
    var y = p1.y;
    $console.append("\nАлгоритм DDA: Количество шагов = " + iterationNumber + ", dx = " + dX + ", dy = " + dY + "\n");
    $console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");

    $("#next-step").click(function () {
        ddaStep(x, y, dX, dY);
        if (step > iterationNumber) {
            enableButtons();
        }
    });

    function ddaStep() {
        step++;
        $console.append("Шаг №" + step + ": x + dx = " + x + ", y + dy = " + y + "\n");
        drawPixel(Math.round(x), Math.round(y));
        x += dX;
        y += dY;
    }
}
