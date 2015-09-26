$(document).on("ready", function () {

    var pixelSize = 20;
    var canvas = document.getElementById("pixel-grid");
    var $nextStep = $("#next-step");
    var $console = $("#console");

    var size = canvas.width;
    var context = canvas.getContext("2d");

    context.lineWidth = 1;
    $nextStep.prop('disabled', true);
    $("#DDA").click(function () {
        templateLineDrawingAlgorithm(algorithmDDA)
    });
    $("#Brez").click(function () {
        templateLineDrawingAlgorithm(algorithmBresenham)
    });
    makeGrid();

    function makeGrid() {
        for (var i = 1; i < size; i += pixelSize) {
            drawLine({x: i, y: 0}, {x: i, y: size});
            drawLine({x: 0, y: i}, {x: size, y: i});
        }
    }

    function drawLine(p1, p2) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);
        context.lineTo(p2.x, p2.y);
        context.stroke();
    }


    function drawIdealLine(p1, p2) {
        context.strokeStyle = "#FF0000";
        context.setLineDash([15, 15]);
        context.lineWidth = 2;
        drawLine({x: getCenterOfCell(p1.x), y: getCenterOfCell(p1.y)},
            {x: getCenterOfCell(p2.x), y: getCenterOfCell(p2.y)}
        );
    }

    function fillCell(column, row, color) {
        var x = column * pixelSize + 2;
        var y = row * pixelSize + 2;
        context.fillStyle = color;
        context.fillRect(x, y, pixelSize - 2, pixelSize - 2);
    }

    function drawStartPoint(column, row) {
        fillCell(column, row, "#22B922");
    }

    function drawEndPoint(column, row) {
        fillCell(column, row, "#FF0200");
    }

    function drawPixel(column, row) {
        fillCell(column, row, "#4A4A4A");
    }

    function getNumberOfCellByPixel(pixel) {
        return Math.ceil(pixel / pixelSize) - 1;
    }

    function getCenterOfCell(coord) {
        return coord * pixelSize + pixelSize / 2 + 1;
    }

    //$(".algorithm-box").on("change", function (event) {
    //    console.log($(event.target).attr("checked"));
    //    //if ($(event.target).attr("checked") == false) {
    //        disableCheckboxes();
    //    //}
    //});

    //function disableCheckboxes() {
    //    $(".algorithm-box").each(function (i, checkbox) {
    //        console.log($(checkbox).attr("checked", false));
    //    });
    //}


    function templateLineDrawingAlgorithm(lineAlgorithm) {
        $nextStep.prop('disabled', true);
        $nextStep.off('click');
        var pointsSet = [];
        var $pixelGrid = $("#pixel-grid");


        $pixelGrid.on("click", function (e) {
            if (pointsSet.length == 1) {
                pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
                drawIdealLine(pointsSet[0], pointsSet[1]);
                drawEndPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
                lineAlgorithm(pointsSet[0], pointsSet[1]);
                prepareForDrawingLine();
            }
            else {
                pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
                drawStartPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
            }
        });


        function prepareForDrawingLine() {
            $nextStep.prop('disabled', false);
            $pixelGrid.off("click");
        }
    }

    function algorithmDDA(p1, p2) {

        var iterationNumber = Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
        var step = 0;
        var dX = (p2.x - p1.x) / iterationNumber;
        var dY = (p2.y - p1.y) / iterationNumber;
        var x = p1.x;
        var y = p1.y;
        $console.append("Алгоритм DDA: Количество шагов = " + iterationNumber + ", dx = " + dX + ", dy = " + dY + "\n");
        $console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");

        $("#next-step").click(function () {
            ddaStep(x, y, dX, dY);
            if (step > iterationNumber) {
                endDrawing();
            }
        });

        function endDrawing() {
            templateLineDrawingAlgorithm(algorithmDDA);
        }

        function ddaStep() {
            step++;
            $console.append("Шаг №" + step + ": x + dx = " + x + ", y + dy = " + y + "\n");
            drawPixel(Math.round(x), Math.round(y));
            x += dX;
            y += dY;
        }
    }

    function algorithmBresenham(p1, p2) {
        var dx = ((p2.x - p1.x) >= 0 ? 1 : -1);
        var dy = ((p2.y - p1.y) >= 0 ? 1 : -1);
        var lengthX = Math.abs(p2.x - p1.x);
        var lengthY = Math.abs(p2.y - p1.y);
        var iterationNumber = Math.max(lengthX, lengthY);
        var x = p1.x;
        var y = p1.y;
        var d;
        var step = 0;
        var stepFunction;
        $console.append("Алгоритм Брезенхема: Количество шагов = " + iterationNumber + "\n");
        $console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");

        if (lengthY <= lengthX) {
            $console.append(" Угол меньше 45 град \n");
            d = -lengthX;
            stepFunction = bresenhamStepWhenAngleLess45;
        }
        else {
            $console.append(" Угол больше 45 град \n");
            d = -lengthY;
            stepFunction = bresenhamStepWhenAngleMore5;
        }


        $("#next-step").click(function () {
            stepFunction();
            if (step > iterationNumber) {
                endDrawing();
            }
        });

        function endDrawing() {
            templateLineDrawingAlgorithm(algorithmBresenham);
        }


        function bresenhamStepWhenAngleMore5() {
            step++;
            $console.append("Шаг №" + step + ": x = " + x + ", y " + y + ", error = " + d + "\n");
            drawPixel(x, y);
            y += dy;
            d += 2 * lengthX;
            if (d > 0) {
                d -= 2 * lengthY;
                x += dx;
            }
        }

        function bresenhamStepWhenAngleLess45() {
            step++;
            $console.append("Шаг №" + step + ": x = " + x + ", y " + y + ", error = " + d + "\n");
            drawPixel(x, y);
            x += dx;
            d += 2 * lengthY;
            if (d > 0) {
                d -= 2 * lengthX;
                y += dy;
            }
        }
    }
})
;