const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
const FIBONACCI = [1, 2, 3, 5, 8, 13, 21, 34];

let p1;
let p2;

function setup() {
	let shortestSide = min(windowWidth, windowHeight);
	createCanvas(shortestSide, shortestSide);
	angleMode(DEGREES);
	background(255);

	let m = min(width, height) * 0.50;
	p1 = new Planet(random(50, m), random(360), random(FIBONACCI));
	p2 = new Planet(random(50, m), random(360), random(FIBONACCI));
	console.log(`p1: ${p1}`);
	console.log(`p2: ${p2}`);
}

function draw() {
	// p1.draw();
	p1.update();
	p2.update();

	p1.drawConnectingLine(p2);
}

function Planet(r, theta, speed) {
	this.speed = speed;
	this.loc = new PolarVector(r, theta);

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
		strokeWeight(0.1);
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

function System() {
	this.planets = []
}


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
	}
}
