const STATES = ["ACCELERATING", "BRAKING", "STOPPED", "COLLISION", "CRUISING"];

class Vehicle {
  constructor(position, index) {
    this.position = position;
    this.speed = 1.3;
    this.state = {};
    this.next = null;
    this.index = index;
  }

  // draw() {
  //   let x = cos(this.position) * 225;
  //   let y = sin(this.position) * 225;
  //   ellipse(x, y, 10);
  // } 

  update() {
    let d = (this.next.position + 1000 - this.position) % 1000;

    if (d < 7) {
      this.speed = 0.3;
    } else if ( d > 75) {
      this.speed += random() / 100 * 5;
    } else {
      this.speed += random() / 100 * 2;
    }
    this.position = (this.position + this.speed) % 1000;
  }

  getPosition() {
    return this.position;
  }

  getState() {
    return {
      speed: this.speed,
      position: this.position,
    }
  }

}