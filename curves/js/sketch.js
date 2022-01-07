console.log("hello world");

const oranges = ["#ffa068", "#a4260d", "#7b1a0b"];
const blues = ["#02c1fd", "#025dea", "#210b5f"];
const black = "#15010a";

const curveHeight = 120;
const curveWidth = 55;


let colorPool = oranges.concat(blues);
colorPool = [black].concat(colorPool).concat([black]);
let xOffset, yOffset;
let xIndex;

function setup() {
    createCanvas(800, 800);
    colorMode(HSB, 360, 100, 100);
    //frameRate(2);


    background(black);
    // drawCurve(400, 400);

    xOffset = curveWidth; 
    yOffset = curveHeight;

    //stroke(black);
    //strokeWeight(0.4);
    noStroke();
    
    xIndex = width + curveWidth;
}

let verticalOffset = false;

function draw() {
    drawColumn(xIndex, verticalOffset);

    verticalOffset = !verticalOffset;
    if (xIndex < 0) {
        noLoop();
    } else {
        xIndex -= xOffset / 2;
    }
}


function getColor(x, y){
    let percentage = x / width * 100;
    let offsetMax = width / colorPool.length;
    let offset = random(-offsetMax, offsetMax);
    let v = x + offset;
    let i = int((v / width) * colorPool.length);
    i = constrain(i, 0, colorPool.length - 1); 

    let baseColor = color(colorPool[i]);
    let h = hue(baseColor);
    let s = saturation(baseColor);
    let b = brightness(baseColor);

    let vary = 7;
    h = h;
    s = constrain(s + random(-vary, vary), 0, 100);
    b = constrain(b + random(-vary, vary), 0, 100);
    return color(h, s, b);
}


function drawCurve(x, y, n) {
    let c = getColor(x, y)
    //let c = random(255);
    fill(c);
    ellipse(x, y, curveWidth, curveHeight);
}

function drawColumn(x, verticalOffset){
    let yStart = verticalOffset ? yOffset/2 : 0;
    let yOverlap = -10;
    for (let y = yStart; y < height + curveHeight; y += curveHeight + yOverlap){
        drawCurve(x, y);
    }
}

function drawScene(){
    let xNoise = 0.0;
    let yNoise = 0.0;
    let noiseOffset = 0.01;

    for(let y=0; y < height + curveHeight; y += yOffset){
        let verticalOffset = false;
        for(let x=width + curveWidth; x > -xOffset ; x -= xOffset / 2){
            let n = noise(xNoise, yNoise);
            if (verticalOffset) {
                drawCurve(x, y + yOffset / 2, n);
            } else {
                drawCurve(x, y, n);
            }

            verticalOffset = !verticalOffset;
            xNoise += noiseOffset;
        }
        yNoise += noiseOffset;
    }
}
