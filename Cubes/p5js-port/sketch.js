function setup() {
    var canvas = createCanvas(640, 640);
    canvas.parent('sketch-container');
    // createCanvas(640, 640);

    colorMode(HSB, 360, 100, 100);
    background(25);
    noStroke();

    CUBESIZE = 50;
    NUMCUBES = 250;

    currentHue = getRandomIntInclusive(0, 360);
    COLOROFFSET = 4;

    ROWS = parseInt(height / CUBESIZE);
    COLS = parseInt(width / CUBESIZE);

    ANGLE = 30;

    // Hack to offset by proper amount;    
    CUBE_OFFSET_X = Math.cos(radians(ANGLE)) * CUBESIZE;
    CUBE_OFFSET_Y = Math.sin(radians(ANGLE)) * CUBESIZE;

    // Track locations    
    GRID = createGrid(ROWS, COLS, CUBESIZE);

    renderScreen();
}

function draw() {

}

// function mouseClicked() {
//     renderScreen();
// }


var renderScreen = function() {
    background(0);
    for (var i = 0; i < NUMCUBES; i++) {
        var row = getRandomIntInclusive(0, ROWS);
        var col = getRandomIntInclusive(0, COLS);
        var cell = GRID[row][col];

        var _h = currentHue % 360;
        currentHue += COLOROFFSET;

        // Offset 50%
        if (Math.random() > 0.5) {
            drawCube(cell.x, cell.y, _h);
        } else {
            drawCube(cell.x + CUBE_OFFSET_X, cell.y + CUBE_OFFSET_Y, _h);
        }
    }
}

var drawCube = function(x, y, cubeHue, cubeSaturation = 90, contrastDiff = 30) {
    var center = { x: x, y: y };

    var width = Math.cos(radians(ANGLE)) * CUBESIZE;
    var height = Math.sin(radians(ANGLE)) * CUBESIZE;

    var south = { x: center.x, y: center.y + CUBESIZE };
    var north = { x: center.x, y: center.y - CUBESIZE };

    // nW & nE are relative to north point by height    
    var northWest = { x: center.x - width, y: center.y - height };
    var northEast = { x: center.x + width, y: center.y - height };

    // sW & sE are relative to south point by height
    var southWest = { x: center.x - width, y: south.y - height };
    var southEast = { x: center.x + width, y: south.y - height };

    // Determine colors
    // 
    var westFaceColor = color(cubeHue, cubeSaturation, 60);
    var eastFaceColor = color(cubeHue, cubeSaturation, 60 - contrastDiff);
    var northFaceColor = color(cubeHue, cubeSaturation, 60 + contrastDiff);

    // North Face  
    fill(northFaceColor);
    quad(
        northWest.x, northWest.y,
        north.x, north.y,
        northEast.x, northEast.y,
        center.x, center.y
    );

    // West Face
    fill(westFaceColor);
    quad(
        northWest.x, northWest.y,
        center.x, center.y,
        south.x, south.y,
        southWest.x, southWest.y
    )

    // East Face
    fill(eastFaceColor);
    quad(
        center.x, center.y,
        northEast.x, northEast.y,
        southEast.x, southEast.y,
        south.x, south.y
    )
}

var createGrid = function(rows, cols, cubeSize) {
    var grid = new Array(rows);

    // Add +1 to rows and cols to allow for overlap    
    for (var row = 0; row < rows + 1; row++) {
        grid[row] = new Array(cols);
        for (var col = 0; col < cols + 1; col++) {
            grid[row][col] = {
                x: row * CUBE_OFFSET_X * 2,
                y: col * CUBE_OFFSET_Y * 2
            }
        }
    }

    return grid;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateGridDimensions(){
    ROWS = parseInt(height / CUBESIZE);
    COLS = parseInt(width / CUBESIZE);

    ANGLE = 30;

    // Hack to offset by proper amount;    
    CUBE_OFFSET_X = Math.cos(radians(ANGLE)) * CUBESIZE;
    CUBE_OFFSET_Y = Math.sin(radians(ANGLE)) * CUBESIZE;

    // Track locations    
    GRID = createGrid(ROWS, COLS, CUBESIZE);
}