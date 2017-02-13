$(function() {
    $("#size-slider").slider({
        min: 10,
        max: 100,
        value: 50,
        slide: function(event, ui) {
            CUBESIZE = ui.value;
            updateGridDimensions();
            renderScreen();
        }
    });
});