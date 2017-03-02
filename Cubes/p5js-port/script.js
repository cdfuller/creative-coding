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

    $("#cubes-count-slider").slider({
        min: 100,
        max: 3000,
        value: 250,
        slide: function(event, ui){
            NUMCUBES = ui.value;
            renderScreen();
        }
    })
});