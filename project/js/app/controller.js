var pixelSize = 5;
var canvas = document.getElementById("pixel-grid");
var $console = $("#console");
var size = canvas.width;
var context = canvas.getContext("2d");


$(document).on("ready", function () {
    context.lineWidth = 1;
    disableControlButtons();
    addEventListenersToButtons();
    //makeGrid();
});