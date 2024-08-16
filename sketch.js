let outerCircle;
let circles = [];

function setup() {
  createCanvas(1200, 800);

  outerCircle = { x: width / 2, y: height / 2, radius: min(width, height) * 0.4 };
  
  // Randomly generate radii for the first two circles
  let r1 = random(outerCircle.radius / 5, outerCircle.radius / 3);
  let r2 = random(outerCircle.radius / 5, outerCircle.radius / 3);
  
  // Calculate radius of the third circle using Descartes' Circle Theorem
  let k1 = 1 / r1;
  let k2 = 1 / r2;
  let k3 = k1 + k2 + 2 * sqrt(k1 * k2); // Curvature of third circle
  let r3 = 1 / k3;
  
  // Position the circles inside the outer circle
  let circle1 = { x: outerCircle.x - r1, y: outerCircle.y, radius: r1 };
  let circle2 = { x: outerCircle.x + r1 + r2, y: outerCircle.y, radius: r2 };
  let circle3 = { x: outerCircle.x, y: outerCircle.y + r1 + r3, radius: r3 };
  
  circles.push(circle1, circle2, circle3);
}

function draw() {
  background(200);



  
  // Draw the outer circle
  noFill();
  stroke(0);
  strokeWeight(2);
  ellipse(outerCircle.x, outerCircle.y, outerCircle.radius * 2);
  
  // Draw the three mutually tangent circles
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    ellipse(c.x, c.y, c.radius * 2);
  }
}



