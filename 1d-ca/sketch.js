let generations;
let rule = 109;

function setup() {
	createCanvas(800, 800);
	generations = new Array(800/5);
	for (let i = 0; i < generations.length; i++) {
		generations[i] = new Array(800/5).fill(0);
	}

	for (let i = 0; i < generations[0].length; i++) {
		generations[0][i] = int(random(0, 2));
	}
	// frameRate(10);
}

function draw() {
	background(255);
	drawGrid(generations);
	evolve(generations, rule);
	// noLoop();
}

function evolve(universe, rule) {
	let currentGen = universe[0];
	let nextGen = getNextGeneration(currentGen, rule);
	universe.pop();
	universe.unshift(nextGen);
}

// (0 - 1 + x.length) % x.length

function getNextGeneration(current, rule) {
	let ruleMap = getRuleHash(rule);
	let next = new Array(current.length);
	for (let i = 0; i < next.length; i++) {
		let leftIdx = (i - 1 + next.length) % next.length;
		let centerIdx = i;
		let rightIdx = (i + 1) % next.length;
		let left = current[leftIdx];
		let center = current[centerIdx];
		let right = current[rightIdx];
		let v = `${left}${center}${right}`;
		next[i] = int(ruleMap[v]);
	}
	return next;
}

function getRuleHash(rule) {
	let values = rule.toString(2).padStart(8, '0').split('');
	values.reverse();
	let hash = values.reduce((acc, current, i) => {
		acc[i.toString(2).padStart(3, '0')] = current;
		return acc;
	}, {});
	return hash;
}

function drawGrid(grid) {
	let vertical_cell_size = height / grid.length;
	let horizontal_cell_size = width / grid[0].length;
	noStroke();
	fill(0);
	for (let row = 0; row < grid.length; row++) {
		let y = row * vertical_cell_size;
		for (let col = 0; col < grid[row].length; col++) {
			let x = col * horizontal_cell_size;
			if (grid[row][col] === 1) {
				rect(x, y, horizontal_cell_size, vertical_cell_size);
			}
		}
	}
}