

function Particle(startx, starty, c){
	this.pos = createVector(startx + random(-50, 50), starty + random(-50, 50));
	this.prevPos = this.pos.copy();
	this.vel = createVector(0, 0);
	this.acc = createVector(0, 0);
	this.maxSpeed = 2;
	this.color = c

	this.alpha = random(3, 10);

	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
		this.edges();
		this.updatePrev();
	}

	this.follow = function(vectors){
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		var index = x + y * cols;
		var force = vectors[index];
		this.applyForce(force);
	}

	this.applyForce = function(force){
		this.acc.add(force);
	}

	this.show = function(){

		stroke(this.color);

		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		// point(this.pos.x, this.pos.y);
	}

	this.updatePrev = function(){
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;

	}

	this.edges = function(){
		if (this.pos.x > width) {
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = width;
			this.updatePrev();
		}
		if (this.pos.y > height) {
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = height;
			this.updatePrev();
		}
	}
}