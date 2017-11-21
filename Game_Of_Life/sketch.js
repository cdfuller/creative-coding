function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(10);
  g = new Grid(10);
}

function draw() {
  background(255);
  g.draw();
  g.update();
  console.log(frameCount / 1000 * 100);
  if (frameCount > 1000) {
    g.drawFinal();
    noLoop();
  }
}

function Cell(x, y, side_length) {
  this.x = x;
  this.y = y;
  this.side_length = side_length;
  this.is_alive = false;
  this.time_alive = 0;
  this.neighbors = [];

  this.next_state = undefined;
}

Cell.prototype.calcNextState = function() {
  var count = this.livingNeighborsCount();
  if (this.is_alive && count < 2) {
    this.next_state = false;
  } else if (this.is_alive && (count == 2 || count == 3)) {
    this.next_state = true;
  } else if (this.is_alive && count > 3) {
    this.next_state = false;
  } else if (count == 3) {
    this.next_state = true;
  } else {
    this.next_state = this.is_alive;
  }
}

Cell.prototype.update = function() {
  if (this.is_alive) {
    this.time_alive += 1;
  }
  this.is_alive = this.next_state;
  this.next_state = undefined;
}

Cell.prototype.draw = function() {
  // Fill in cell if alive, else white
  if (this.is_alive) {
    fill(51);
  } else {
    fill(255);
  }
  rect(this.x, this.y, this.x + this.side_length, this.y + this.side_length);
}

Cell.prototype.drawHeatMap = function(_min, _max) {
  var shade = map(this.time_alive, _min, _max, 128, 255, true);
  fill(shade);
  rect(this.x, this.y, this.x + this.side_length, this.y + this.side_length);
}

Cell.prototype.livingNeighborsCount = function() {
  let c = 0;
  for (let i = 0; i < this.neighbors.length; i++) {
    if (this.neighbors[i].is_alive) {
      c++;
    }
  }
  return c;
}

function Grid(cell_size) {
  this.cell_size = cell_size;
  this.horizontal_cell_count = int(width / this.cell_size) + 1;
  this.vertical_cell_count = int(height / this.cell_size) + 1;
  var self = this;
  this.cells = function(){
    let new_cells = [];
    for (x = 0; x < self.horizontal_cell_count; x++) {
      new_cells[x] = [];
      for (y = 0; y < self.vertical_cell_count; y++) {
        let cell = new Cell(x * self.cell_size, y * self.cell_size, self.cell_size);
        cell.is_alive = random([true, false])
        new_cells[x][y] = cell;
      }
    }
    return new_cells;
  }();
  this.populateNeighbors();
}

Grid.prototype.update = function() {
  for (y = 0; y < this.vertical_cell_count; y++) {
    for (x = 0; x < this.horizontal_cell_count; x++) {
      this.cells[x][y].calcNextState();
    }
  }
  for (y = 0; y < this.vertical_cell_count; y++) {
    for (x = 0; x < this.horizontal_cell_count; x++) {
      this.cells[x][y].update();
    }
  }
}

Grid.prototype.draw = function() {
  for (y = 0; y < this.vertical_cell_count; y++) {
    for (x = 0; x < this.horizontal_cell_count; x++) {
      this.cells[x][y].draw();
    }
  }
}


Grid.prototype.drawFinal = function() {
  noStroke();
  var minAge = 1000;
  var maxAge = 0;
  for (y = 0; y < this.vertical_cell_count; y++) {
    for (x = 0; x < this.horizontal_cell_count; x++) {
      if (this.cells[x][y].time_alive > maxAge) {
        maxAge = this.cells[x][y].time_alive;
      }
      if (this.cells[x][y].time_alive < minAge) {
        minAge = this.cells[x][y].time_alive;
      }
    }
  }
  for (y = 0; y < this.vertical_cell_count; y++) {
    for (x = 0; x < this.horizontal_cell_count; x++) {
      this.cells[x][y].drawHeatMap(minAge, maxAge);
    }
  }
}

Grid.prototype.populateNeighbors = function() {
  var neighbor_offets = [[-1, -1], [0, -1], [1, -1], [-1,  0], [1,  0],[-1,  1], [0,  1], [1,  1]]
  for (let y = 0; y < this.vertical_cell_count; y++) {
    for (let x = 0; x < this.horizontal_cell_count; x++) {
      var neighbors = [];
      for (let i = 0; i < neighbor_offets.length; i++) {
        let _x = x + neighbor_offets[i][0];
        let _y = y + neighbor_offets[i][1];
        if (_x < 0) {
          _x = this.horizontal_cell_count - 1;
        }
        if (_x == this.horizontal_cell_count){
          _x = 0;
        }
        if (_y < 0) {
          _y = this.vertical_cell_count - 1;
        }
        if (_y == this.vertical_cell_count) {
          _y = 0;
        }
        neighbors.push(this.cells[_x][_y]);
      }
      this.cells[x][y].neighbors = neighbors;
    }
  }
}

// Grid.prototype.loadCells = function(cells){
//   for (let x = 0; x < cells[0].length; x++) {
//     for (let y = 0; y < cells[x].length; y++) {
//       let c = cells[x][y];
//       if ((c.x * c.y) % 2 == 0) {
//         c.is_alive = false;
//       }
//       this.cells = c;
//     }
//   }
// }