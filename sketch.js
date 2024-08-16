let outerCircle;
let circles = [];



function customCircle(x, y, radius) {
    // This function draws a circle centered at (x, y) relative to the origin
    noFill();
    stroke(0);
    ellipse(width/2 + x, height/ 2 + y, radius * 2); // Multiply by 2 to account for the diameter
  }




function setup() {
  createCanvas(1300, 600);

  outerCircle = { x: width / 2, y: height / 2, radius: min(width, height) * 0.4 };
  
  // Randomly generate radii for the first two circles
  let x1 = random(-300, 300);
  let y1 = random(0, 80);
  
  
  // Position the circles inside the outer circle
  let circle1 = { x: x1, y: y1, radius: y1 };

  circles.push(circle1);
}

function draw() {
  background(200);


  // Draw the outer circle
  noFill();
  stroke(0);
  strokeWeight(1);
  ellipse(outerCircle.x, outerCircle.y, outerCircle.radius * 2);
  
  customCircle(0,0, outerCircle.radius * 1.1)

  line(outerCircle.x - width, outerCircle.y, 
    outerCircle.x + width, outerCircle.y);


  // Draw the three mutually tangent circles
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    customCircle(c.x, c.y, c.radius * 2);
  }
}



