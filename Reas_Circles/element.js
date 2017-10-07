function Element(x, y) {
  this.loc = createVector(x, y);
  this.speed = createVector(2, 2);
  this.diameter = 100;
  this.radius = this.diameter/2;
}

Element.prototype.intersects = function(other){
  var d = this.loc.dist(other.loc);
  if (d < this.radius + other.radius){
    return true;
  } else {
    return false;
  }
}

Element.prototype.checkEdges = function(){
  if (this.loc.x + this.vel.x + this.radius >= width){
    this.vel.rotate(0.01);
    var tempX = this.loc.x;
    this.loc.add(this.vel);
    this.loc.x = tempX;
  } else if (this.loc.x + this.vel.x + this.radius <= this.diameter){
    this.vel.rotate(0.01);
    var tempX = this.loc.x;
    this.loc.add(this.vel);
    this.loc.x = tempX;
  } else if (this.loc.y + this.vel.y + this.radius >= height){
    this.vel.rotate(0.01);
    var tempY = this.loc.y;
    this.loc.add(this.vel);
    this.loc.y = tempY;
  } else if (this.loc.y - this.vel.y + this.radius <= this.diameter){
    this.vel.rotate(0.01);
    var tempY = this.loc.y;
    this.loc.add(this.vel);
    this.loc.y = tempY;
  } else {
    this.loc.add(this.vel);
  }
}

Element.prototype.fleeFrom = function(other) {
  
}