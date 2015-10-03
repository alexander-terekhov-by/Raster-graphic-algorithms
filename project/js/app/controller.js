$(document).on("ready", function () {
        var pixelSize = 20;
        var canvas = document.getElementById("pixel-grid");
        var $nextStep = $("#next-step");
        var $console = $("#console");
        var size = canvas.width;
        var context = canvas.getContext("2d");
        context.lineWidth = 1;
        $nextStep.prop('disabled', true);

        addEventListenersToButtons();
        makeGrid();

        function makeGrid() {
            for (var i = 1; i < size; i += pixelSize) {
                drawLine({x: i, y: 0}, {x: i, y: size});
                drawLine({x: 0, y: i}, {x: size, y: i});
            }
        }

        function addEventListenersToButtons() {
            $("#DDA").click(function () {
                templateLineDrawingAlgorithm(algorithmDDA);
                disableButtons(this);
            });
            $("#Brez").click(function () {
                templateLineDrawingAlgorithm(algorithmBresenham);
                disableButtons(this);
            });
            $("#Wu").click(function () {
                templateLineDrawingAlgorithm(algorithmWu);
                disableButtons(this);
            });
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


        function makeRGBGray(intense) {
            var RGBTemplate = "rgb(x, x ,x)";
            var maxColorRGB = 255;
            var currentColor = Math.ceil(maxColorRGB * (1 - intense));
            return RGBTemplate.replace(/x/g, currentColor);
        }

        function drawStartPoint(column, row) {
            fillCell(column, row, "#22B922");
        }

        function drawEndPoint(column, row) {
            fillCell(column, row, "#FF0200");
        }

        function drawWuPixel(column, row, intense) {
            fillCell(column, row, makeRGBGray(intense));
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

        function disableButtons(currentButton) {
            $(".algorithm-btn").each(function (i, button) {
                $(button).attr("disabled", true);
                $(button).off("click");
            });
            $(currentButton).attr("disabled", false);
        }

        function enableButtons() {
            $nextStep.prop('disabled', true);
            $(".algorithm-btn").each(function (i, button) {
                $(button).attr("disabled", false);
            });
            addEventListenersToButtons();
        }


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

            if(isHorizontalOrVertical()){
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
    }
)
;