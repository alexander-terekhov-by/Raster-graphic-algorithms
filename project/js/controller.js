$(document).on("ready", function () {
    var pointsSet = [];
    var pixelSize = 20;
    var canvas = document.getElementById("pixel-grid");
    var size = canvas.width;
    var context = canvas.getContext("2d");
    context.lineWidth = 1;
    $("#next-step").prop('disabled', true);
    $("#DDA").click(acceptDDAAlgorithm);
    makeGrid();

    function makeGrid(canvas) {
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


    function acceptDDAAlgorithm() {
        var pointsSet = [];
        $("#pixel-grid").on("click", function (e) {
            if (pointsSet.length == 1) {
                pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
                drawEndPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
                algorithmDDA(pointsSet[0], pointsSet[1]);
                $("#next-step").prop('disabled', false);
                pointsSet = [];

            }
            else {
                pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
                drawStartPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
            }
        });


        function algorithmDDA(p1, p2) {
            console = $("#console");
            var iterationNumber = Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
            var step = 0;
            var dX = (p2.x - p1.x) / iterationNumber;
            var dY = (p2.y - p1.y) / iterationNumber;
            var x = p1.x;
            var y = p1.y;
            console.append("Алгоритм DDA: Количество шагов = " + iterationNumber + ", dx = " + dX + ", dy = " + dY + "\n");
            console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");

            $("#next-step").click(function () {
                if (step > iterationNumber) {
                    $("#next-step").prop('disabled', false);
                    return;
                }
                ddaStep(x, y, dX, dY);

            });

            function ddaStep() {
                step++;
                console.append("Шаг №" + step + ": x + dx = " + x + ", y + dy = " + y + "\n");
                drawPixel(Math.round(x), Math.round(y));
                x += dX;
                y += dY;
            }
        }
    }

    $("#pixel-grid").on("click", function (e) {
        if (pointsSet.length == 1) {
            pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
            drawEndPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
            algorithmBresenham(pointsSet[0], pointsSet[1]);
            pointsSet = [];

        }
        else {
            pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
            drawStartPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
        }
    });


    function algorithmBresenham(p1, p2) {

        var dx = ((p2.x - p1.x) >= 0 ? 1 : -1);
        var dy = ((p2.y - p1.y) >= 0 ? 1 : -1);
        var lengthX = Math.abs(p2.x - p1.x);
        var lengthY = Math.abs(p2.y - p1.y);
        var length = Math.max(lengthX, lengthY);


        var x = p1.x;
        var y = p1.y;
        var d;
        if (lengthY <= lengthX)
        {


            d = -lengthX;

            // Основной цикл
            length++;
            while(length--)
            {
                drawPixel( x, y);
                x += dx;
                d += 2 * lengthY;
                if (d > 0) {
                    d -= 2 * lengthX;
                    y += dy;
                }
            }
        }
        else
        {
            // Начальные значения

            d = - lengthY;

            // Основной цикл
            length++;
            while(length--)
            {
                drawPixel( x, y);
                y += dy;
                d += 2 * lengthX;
                if (d > 0) {
                    d -= 2 * lengthY;
                    x += dx;
                }
            }
        }



        //var deltax = p2.x - p1.x;
        //var deltay = p2.y - p1.y;
        //var error = 0;
        //var deltaerr = deltay;
        //var y = p1.y;
        //for (var x = p1.x; x < p2.x; x++) {
        //    drawPixel(x, y);
        //    error = error + deltaerr;
        //    if (2 * error >= deltax) {
        //        y = y + 1;
        //        error = error - deltax
        //    }
        //}

        //var deltax = Math.abs(p2.x - p1.x);
        //var deltay = Math.abs(p2.y - p1.y);
        //var error = 0;
        //var deltaerr = deltay;
        //var y = p1.y;
        //for (var x = p1.x; x < p2.x; x++) {
        //    drawPixel(x, y);
        //    error = error + deltaerr;
        //    if (2 * error >= deltax) {
        //        y = y - 1;
        //        error = error - deltax
        //    }
        //}




        //var deltax = p2.x - p1.x;
        //var deltay = p2.y - p1.y;
        //var error = 0;
        //var deltaerr = deltax;
        //var x = p1.x;
        //for (var y = p1.y; y < p2.y; y++) {
        //    drawPixel(x, y);
        //    error = error + deltaerr;
        //    if (2 * error >= deltay) {
        //        x = x + 1;
        //        error = error - deltay;
        //    }
        //}

        //console = $("#console");
        ////var iterationNumber = Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
        ////var step = 0;
        //var x = p1.x;
        //var y = p1.y;
        //var dX = p2.x - p1.x;
        //var dY = p2.y - p1.y;
        //var error = 2 * dY - dX;
        //
        ////if (deltaX > 0) {
        ////    if (deltaY > 0) {
        ////        lineInFirstOctant();
        ////    }
        ////    else {
        ////        lineInFouthOctant();
        ////    }
        ////}
        ////else {
        ////    if (deltaY > 0) {
        ////        lineInSecondOctant();
        ////    }
        ////    else {
        ////        lineInThirdOctant();
        ////    }
        ////}
        //
        //
        //lineInFirstOctant();
        //
        //function lineInFirstOctant() {
        //    for (var i = 1; i < dX; x++) {
        //        drawPixel(x, y);
        //        while (error >= 0) {
        //            y = y + 1;
        //            error -= 2 * dX;
        //        }
        //        x += 1;
        //        error += 2 * dY;
        //    }
        //}

        //
        //function lineInSecondOctant() {
        //    for (var x = p2.x; x < p1.x; x--) {
        //        drawPixel(x, y);
        //        error = error + deltaError;
        //        if (2 * error >= deltaX) {
        //            y += 1;
        //            error = error - deltaX;
        //        }
        //    }
        //}
        //
        //
        //function lineInThirdOctant() {
        //    for (var x = p2.x; x < p1.x; x--) {
        //        drawPixel(x, y);
        //        error = error + deltaError;
        //        if (2 * error >= deltaX) {
        //            y -= 1;
        //            error = error - deltaX;
        //        }
        //    }
        //}
        //
        //
        //function lineInFouthOctant() {
        //    for (var x = p1.x; x < p2.x; x++) {
        //        drawPixel(x, y);
        //        error = error + deltaError;
        //        if (2 * error >= deltaX) {
        //            y -= 1;
        //            error = error - deltaX;
        //        }
        //    }
        //}
        //

        //for (var x = p1.x; x < p2.x; x++) {
        //    drawPixel(x, y);
        //    error = error + deltaError;
        //    if (2 * error >= deltaX) {
        //        y = y + 1;
        //        error = error - deltaX;
        //    }
        //}
        //console.append("Алгоритм DDA: Количество шагов = " + iterationNumber + ", dx = " + dX + ", dy = " + dY + "\n");
        //console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");
        //
        //$("#next-step").click(function () {
        //    if (step > iterationNumber) {
        //        $("#next-step").prop('disabled', false);
        //        return;
        //    }
        //    ddaStep(x, y, dX, dY);
        //
        //});
        //
        //function ddaStep() {
        //    step++;
        //    console.append("Шаг №" + step + ": x + dx = " + x + ", y + dy = " + y + "\n");
        //    drawPixel(Math.round(x), Math.round(y));
        //    x += dX;
        //    y += dY;
        //}
    }


    function acceptBresenhamAlgorithm() {
        var pointsSet = [];
        $("#pixel-grid").on("click", function (e) {
            if (pointsSet.length == 1) {
                pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
                drawEndPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
                algorithmDDA(pointsSet[0], pointsSet[1]);
                $("#next-step").prop('disabled', false);
                pointsSet = [];

            }
            else {
                pointsSet.push({x: getNumberOfCellByPixel(e.offsetX), y: getNumberOfCellByPixel(e.offsetY)});
                drawStartPoint(getNumberOfCellByPixel(e.offsetX), getNumberOfCellByPixel(e.offsetY));
            }
        });


        function algorithmDDA(p1, p2) {
            console = $("#console");
            var iterationNumber = Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
            var step = 0;
            var dX = (p2.x - p1.x) / iterationNumber;
            var dY = (p2.y - p1.y) / iterationNumber;
            var x = p1.x;
            var y = p1.y;
            console.append("Алгоритм DDA: Количество шагов = " + iterationNumber + ", dx = " + dX + ", dy = " + dY + "\n");
            console.append("Точка 1 = (" + p1.x + ", " + p1.y + "), Точка 2 = (" + p2.x + ", " + p2.y + ")\n");

            $("#next-step").click(function () {
                if (step > iterationNumber) {
                    $("#next-step").prop('disabled', false);
                    return;
                }
                ddaStep(x, y, dX, dY);

            });

            function ddaStep() {
                step++;
                console.append("Шаг №" + step + ": x + dx = " + x + ", y + dy = " + y + "\n");
                drawPixel(Math.round(x), Math.round(y));
                x += dX;
                y += dY;
            }
        }
    }

})
;









