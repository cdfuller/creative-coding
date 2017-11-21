// 1d Cellular Automata
// 
// Reference:
// http://mathworld.wolfram.com/ElementaryCellularAutomaton.html
// 

let g;

function setup() {
  createCanvas(900, 900);
  frameRate(10);
  g = createGrid(100, 100);
  g = populateGrid(g);
  drawGrid(g);
}

function draw() {
  drawGrid(g);
  g = tickGrid(g);
}

// a SIMULATION will contain an array of GENERATIONS (rows) that will contain an array of CELLS which have STATES that are determined via RULES

function Simulation(args) {
  this.history_length = args.history_length || 100;
  this.generation = args.generation || 0;
  // Use a queue because we want a FIFO data structure to use with the history_length.
  this.queue = args.queue || new Array(this.history_length);
  // Do we want to keep track fo rows and cols in the Simulation object?
  // this.rows ??
  // this.cols ??
}


Simulation.prototype.tick = function() {

}


Simulation.prototype.draw = function() {
  // Draw most recent generations limited to the amount we can fit on the screen
}

// FSM

// function Grid(cell_size) {
//   this.cell_size = cell_size;
//   // this.num_cells = function(odd_num_cells) {
//   //   let n = int(width / odd_num_cells);
    
//   // }(odd_num_cells);
//   let self = this;
//   this.cells = function() {
//     let new_cells = [];
//     for (let row = 0; row * self.cell_size < height; row++) {
//       new_cells[row] = [];
//       for (let col = 0; col * self.cell_size < width; col++) {
//         let cell = random([0, 1]);
//         new_cells[row][col] = cell;
//       }
//     }
//     return new_cells;
//   }();
// }


function createGrid(width, height) {
  let new_grid = new Array(height);
  for (let i = 0; i < new_grid.length; i++) {
    new_grid[i] = new Array(width);
  }
  return new_grid;
}


function tickGrid(grid) {
  let row_length = grid[0].length;
  let new_row = Array(row_length);
  for (let i = 0; i < new_row.length; i++) {
    new_row[i] = random([0, 1]);
  }
  grid.shift();
  grid.push(new_row);
  return grid;
}

function populateGrid(grid) {
  let new_grid = grid.slice(0);
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      let cell = random([0, 1]);
      new_grid[row][col] = cell;
    }
  }
  return new_grid;
}

function drawGrid(grid) {
  let vertical_cell_size = height / grid.length;
  let horizontal_cell_size = width / grid[0].length;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 1) {
        push();
        translate(col * horizontal_cell_size, row * vertical_cell_size);
        fill(0);
        noStroke();
        rect(0, 0, horizontal_cell_size, vertical_cell_size);
        pop();
      } else {
        push();
        translate(col * horizontal_cell_size, row * vertical_cell_size);
        fill(255);
        noStroke();
        rect(0, 0, horizontal_cell_size, vertical_cell_size);
        pop();
      }
    }
  }
}


// Utils

// https://stackoverflow.com/questions/9939760/how-do-i-convert-an-integer-to-binary-in-javascript/16155417#16155417
function dec2bin(dec){
  return (dec >>> 0).toString(2);
} 