let radius = 25;

class Mover {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      if (this.position.y + radius >= surfaceY) {
        // Bounce up
        this.position.y = surfaceY - radius;
        this.velocity.y *= -1;
      }

      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0); // Reset acceleration
    }

    show() {
      stroke(100);
      strokeWeight(2);
      fill(100);
      circle(this.position.x, this.position.y, 2 * radius);
    }
  }