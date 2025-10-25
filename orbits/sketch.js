const NUMBER_POOLS = [
    { name: "PRIMES", values: [2, 3, 5, 7, 11, 13, 17, 19, 23], scale: 0.1},
    { name: "FIBONACCI", values: [1, 2, 3, 5, 8, 13, 21], scale: 0.1},
    { name: "CIRCLE_DIVISORS", values: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18], scale: 0.1},
    // { name: "LARGE_CIRCLE_DIVISORS", values: [60, 72, 90, 120, 180], scale: 1},
    { name: "SQUARE_NUMBERS", values: [1, 4, 9, 16, 25], scale: 0.1},
    { name: "TRIANGULAR_NUMBERS", values: [1, 3, 6, 10, 15, 21], scale: 0.1},
]

let p1, p2, p3;


function setup() {
	let shortestSide = min(windowWidth, windowHeight);
    console.log(`windowWidth: ${windowWidth}, windowHeight: ${windowHeight}, shortestSide: ${shortestSide}`);
	createCanvas(shortestSide, shortestSide);
	angleMode(DEGREES);
	background(255);

	// Radial distances
    let minOrbitRadius = min(width, height) * 0.02;
    let orbitPadding = 0.05;
    let maxOrbitRadius = shortestSide * (1 - orbitPadding) / 2;
    console.log(`minOrbitRadius: ${minOrbitRadius}, maxOrbitRadius: ${maxOrbitRadius}`);
    // Give the first planet a smaller maximum orbit radius so that the others
    // have room to orbit outside it.
    let r1 = random(minOrbitRadius, maxOrbitRadius * 0.75);
	let r2 = random(r1, maxOrbitRadius);
	let r3 = random(r2, maxOrbitRadius);

	// Angles
    // -90 to start at the top of the orbits
    let angles = [-90, 30, 150];
	let a1 = random(angles);
	let a2 = random(angles);
	let a3 = random(angles);

    // Speeds
    let numberPool = random(NUMBER_POOLS);
    let values = numberPool.values;
    let scale = numberPool.scale;

    let s1 = random(values) * scale;
    let s2 = random(values) * scale;
    let s3 = random(values) * scale;

	// Center points
	let c1 = createVector(width/2, height/2);
	let c2 = createVector(width/2, height/2);
	let c3 = createVector(width/2, height/2);

	p1 = new Planet(r1, a1, s1, c1);
	p2 = new Planet(r2, a2, s2, c2);
	p3 = new Planet(r3, a3, s3, c3);

    console.log("numberPool:", numberPool.name, values.toString());
	console.log(`p1: ${p1}`);
	console.log(`p2: ${p2}`);
	console.log(`p3: ${p3}`);
}

function draw() {
	p1.update();
	p2.update();
	p3.update();

	p1.drawConnectingLine(p2);
	p3.drawConnectingLine(p1);
	p3.drawConnectingLine(p2);
}

function Planet(r, theta, speed, center) {
	this.speed = speed;
	this.loc = new PolarVector(r, theta);
	this.center = center;

	this.draw = function drawPlanet() {
		push();
		noStroke();
		translate(this.center.x, this.center.y);
		ellipse(this.loc.x(), this.loc.y(), 10, 10);
		pop();
	}

	this.drawConnectingLine = function connectPlanet(otherPlanet) {
		push();

		translate(this.center.x, this.center.y);
		strokeWeight(0.05);
		line(this.loc.x(), this.loc.y(), otherPlanet.loc.x(), otherPlanet.loc.y());

		pop();
	}

	this.update = function update() {
		this.loc.theta += this.speed;
        // this.loc.r -= 0.1;
	}

	this.toString = function planetToString() {
		let r = this.loc.radius.toFixed(2);
		let t = this.loc.theta.toFixed(2);
		let x = this.loc.x().toFixed();
		let y = this.loc.y().toFixed();
		let s = this.speed.toFixed(2);
		return `r: ${r} t: ${t} x: ${x} y: ${y} s: ${s}`;
	}
}

// function System() {
// 	this.planets = []
// }


function PolarVector(radius, theta) {
	this.radius = radius;
	this.theta = theta;

	this.x = () => this.radius * cos(this.theta);
	this.y = () => this.radius * sin(this.theta);
}


function keyPressed() {
	if (keyCode === 32) { // space
		noLoop();
		console.log("Stopped", frameCount);
	} else if (keyCode === 76) { // l => loop
		console.log("looping");
		loop();
	} else if (keyCode === 83) { // s => step
		redraw();
	}
}
