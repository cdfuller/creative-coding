function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

}

function Planet(d) {
	this.distanceFromCenter = d;
	this.angle = 0;

}

function System() {
	this.planets = []
}