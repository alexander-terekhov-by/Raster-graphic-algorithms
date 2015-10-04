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
    $("#Circle").click(function () {
        templateLineDrawingAlgorithm(algorithmCircle);
        disableButtons(this);
    });
    $("#Ellipse").click(function () {
        templateLineDrawingAlgorithm(algorithmEllipse);
        disableButtons(this);
    });


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