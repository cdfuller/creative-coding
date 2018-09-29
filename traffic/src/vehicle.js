class Vehicle {
  constructor(position) {
    this.position = position;
    this.speed = 0.007;
  }

  draw() {
    let x = cos(this.position) * 225;
    let y = sin(this.position) * 225;
    ellipse(x, y, 10);
  } 

  update() {
    this.position += this.speed;
  }

}