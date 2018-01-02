const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23];
const FIBONACCI = [1, 2, 3, 5, 8, 13, 21];

let p1;
let p2;
let p3;

function setup() {
	let shortestSide = min(windowWidth, windowHeight);
	createCanvas(shortestSide, shortestSide);
	angleMode(DEGREES);
	background(255);

	let maxD = min(width, height) * 0.50;
	let midpoint = random(maxD*0.9);

	// PLAY WITH THESE NUMBERS;
	// Starting points
	let s1 = random(FIBONACCI) / 100;
	let s2 = random(FIBONACCI) / 100;
	let s3 = random(FIBONACCI) / 100;

	// THETA
	let t1 = random(50, midpoint);
	let t2 = random(t1, maxD);
	let t3 = random(t2, maxD);

	p1 = new Planet(t1, -90, s1);
	p2 = new Planet(t2, -90, s2);
	p3 = new Planet(t3, -90, s3);
	console.log(`p1: ${p1}`);
	console.log(`p2: ${p2}`);
	console.log(`p3: ${p3}`);
}

function draw() {
	// p1.draw();
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
		translate(width/2, height/2);

		ellipse(this.loc.x(), this.loc.y(), 10, 10);
		
		pop();
	}

	this.drawConnectingLine = function connectPlanet(otherPlanet) {
		push();

		translate(width/2, height/2);
		strokeWeight(0.05);
		line(this.loc.x(), this.loc.y(), otherPlanet.loc.x(), otherPlanet.loc.y());

		pop();
	}

	this.update = function update() {
		this.loc.theta += this.speed;
	}

	this.toString = function planetToString() {
		let r = this.loc.r.toFixed(2);
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


function PolarVector(r, theta) {
	this.r = r;
	this.theta = theta;

	this.x = () => this.r * cos(this.theta);
	this.y = () => this.r * sin(this.theta);

}


function keyPressed() {
	if (keyCode === 32) { // 32 === ' '
		noLoop();
		console.log("Stopped", frameCount);
	} else if (keyCode === 76) { // l === 76
		console.log("looping");
		loop();
	} else if (keyCode === 83) { // s === 83
		redraw();
	}
	// } else {
	// 	console.log(keyCode);
	// }
}
