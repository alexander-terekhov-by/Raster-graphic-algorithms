function algorithmEllipse(p1, p2) {

    drawBresenhamEllipse(p1, p2);

    function drawBresenhamEllipse(p1, p2) {
        var x = p1.x;
        var y = p1.y;
        var a = Math.abs(p2.x - x);
        var b = Math.abs(p2.y - y);
        var col, row;
        var d;
        row = b;
        col = 0;
        d = 2 * a * a * ((row - 1) * (row)) + a * a + 2 * b * b * (1 - a * a);


        $("#next-step").click(function () {
            condition(firstCondition, firstPart, firstElse)
        });


        function firstCondition(){
            return (a * a * (row) > b * b * (col));
        }

        function firstElse(){
            d = 2 * b * b * (col + 1) * col + 2 * a * a * (row * (row - 2) + 1) + (1 - 2 * a * a) * b * b;
            $("#next-step").click(function () {
                condition(secondCondition, secondPart, secondElse);
            });
        }

        function firstPart() {
            drawPixel(col + x, row + y);
            drawPixel(col + x, y - row);
            drawPixel(x - col, row + y);
            drawPixel(x - col, y - row);
            if (d >= 0) {
                row--;
                d -= 4 * a * a * (row);
            }
            d += 2 * b * b * (3 + (col * 2));
            col++;
        }


        function secondCondition (){
            return (row + 1 != 0);
        }


        function secondPart(){
            drawPixel(col + x, row + y);
            drawPixel(col + x, y - row);
            drawPixel(x - col, row + y);
            drawPixel(x - col, y - row);
            if (d <= 0) {
                col++;
                d += 4 * b * b * col;
            }
            row--;
            d += 2 * a * a * (3 - (row * 2));
        }

     function secondElse(){
         enableButtons();
     }

        function condition(condition, ifStatement, elseStatement) {
            if (condition()) {
                ifStatement();
            }
            else {
                elseStatement()
            }
        }
    }
}
