let p1;
let p2;

function setup() {
	let shortestSide = min(windowWidth, windowHeight);
	createCanvas(shortestSide, shortestSide);
	angleMode(DEGREES);
	background(255);
	let m = min(width, height) * 0.50;
	p1 = new Planet(random(50, m), random(360), random(10));
	p2 = new Planet(random(50, m), random(360), random(10));
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
	} else if (keyCode === 76) { // l === 76
		loop();
	}
}
