function algorithmEllipse(p1, p2) {
    var a = Math.abs(p2.x - p1.x);
    var b = Math.abs(p2.y - p1.y);
    var x = 0, y = b, gap = 0, delta = 1 - 2 * a;
    var step = 0;
    $console.append("\n�������� ����������( ����� ) \n");
    $console.append("����� = (" + p1.x + ", " + p1.y + "), a = " + a + " b = " + b + "\n");

    $("#next-step").click(function () {
        stepFunction();
        if (y < 0) {
            enableButtons();
        }
    });

    function stepFunction() {
        step++;
        //drawPixel(p1.x + x, p1.y + y);
        drawPixel(p1.x + x, p1.y - y);
        //drawPixel(p1.x - x, p1.y - y);
        //drawPixel(p1.x - x, p1.y + y);
        gap = 2 * (delta + y) - 1;
        if ((delta < 0) && (gap < 0)) {
            $console.append("��� �" + step +  " ��������� ��� �� ����������� (������ < 0)\n");
            delta += 2 * ++x + 1;
            return;
        }
        gap = 2 * (delta - x) - 1;
        if ((delta > 0) && (gap > 0)) {
            $console.append("��� �" + step +  " ��������� ��� �� ��������� (������ > 0)\n");
            delta += 1 - 2 * --y;
            return;
        }
        $console.append("��� �" + step +  " ��������� ��� �� ��������� (������ = 0)\n");
        x++;
        y--;
        delta -= 2 * ( y - x - 1);
    }
}
