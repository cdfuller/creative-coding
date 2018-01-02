const SHAPE_SIZE = 25;

let g;

function setup() {
	createCanvas(windowWidth, windowHeight);

	g = new Grid(10 * 2, 10);
}

function draw() {
	background(51);
	g.draw();
}

function Grid(cols, rows) {
	this.cols = cols;
	this.rows = rows;
	this.cells = [];

	this.populateCells = function populateCellsGrid() {
		console.log("POPULATING");
		this.cells = new Array(this.cols);
		for (let i = 0; i < this.cols; i++) {
			this.cells[i] = new Array(this.rows);
			for (let j = 0; j < this.cells[i].length; j++) {
				let x = i * SHAPE_SIZE;
				let y = j * SHAPE_SIZE;
				let c = getColor(x, y);
				let d = j % 2
				this.cells[i][j] = new Cell(x, y, SHAPE_SIZE, d, c);
			}
		}
	}

	this.populateCells();

	this.draw = function drawGrid() {
		for (let i = 0; i < this.cells.length; i++) {
			for (let j = 0; j < this.cells[i].length; j++) {
				this.cells[i][j].draw();
			}
		}
	}
}

function getColor(x, y) {
	return randomColor();
}

function randomColor() {
	return [int(random(255)), int(random(255)), int(random(255)), 255];
}

function Cell(x, y, size, d, c) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.color = c;
	this.direction = d 

	this.draw = function drawCell() {
		push();
		translate(this.x, this.y);

		fill(this.color);

		let x1 = 0;
		let y1 = - (this.size);
		let x2 = - (this.size / 2);
		let y2 = 0;
		let x3 = (this.size / 2);
		let y3 = 0;
		triangle(x1, y1, x2, y2, x3, y3);
		pop();
	}
}