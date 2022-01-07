const AGENT_COUNT = 1000;

let agents = [];

function setup() {
    createCanvas(800, 800);
    colorMode(RGB);
    noStroke();

    // background(51);
    for(let i=0; i<AGENT_COUNT; i++){
        let x = int(random(width));
        let y = int(random(height));
        let agent = new Agent(x, y);
        agents.push(agent);
    }
}

function draw() {
  for(let agent of agents) {
      agent.render();
  }

  for(let agent of agents) {
      agent.update();
  }
}

function Agent(x, y) {
    this.loc = createVector(x, y);
    this.diameter = 3;
    this.velocity = createVector(random(-1, 1), random(-1, 1)).normalize().mult(3);
    this.color = color(0, 0, 0);
    this.age = 0;
}

Agent.prototype.update = function() {
    this.loc.add(this.velocity);

    // Left edge
    if (this.loc.x < 0) {
        this.velocity.x *= -1;
        this.color.levels = [255, 255, 255, 255];
        this.age += 1;
        
    // Right edge
    } else if (this.loc.x > width) {
        this.velocity.x *= -1;
        this.color.levels = [255, 255, 255, 255];
        this.age += 1;
    }
    
    // Top edge
    if (this.loc.y < 0) {
        this.velocity.y *= -1;
        this.color.levels = [0, 0, 0, 255];
        this.age += 1;
        
        // Bottom edge
    } else if (this.loc.y > height) {
        this.velocity.y *= -1;
        this.color.levels = [0, 0, 0, 255];
    }
}

Agent.prototype.render = function() {
    fill(this.color);
    circle(this.loc.x, this.loc.y, this.diameter);
}
