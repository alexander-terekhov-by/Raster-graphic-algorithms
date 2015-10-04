
    var pixelSize = 20;
    var canvas = document.getElementById("pixel-grid");
    var $nextStep = $("#next-step");
    var $console = $("#console");
    var size = canvas.width;
    var context = canvas.getContext("2d");


$(document).on("ready", function () {
    $nextStep.prop('disabled', true);
    context.lineWidth = 1;

    addEventListenersToButtons();
    makeGrid();
});