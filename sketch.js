let outerCircle;
let circles = [];
let circlesPlus = [];
let circlesLast = [];


function customCircle(c) {    
    // This function draws a circle centered at (x, y) relative to the origin
    x = 250 * c.x;
    y = 250 * c.y;
    radius = 250 * c.radius;

    noFill();
    ellipse(width/2 + x, height/ 2 - y, radius * 2); // Multiply by 2 to account for the diameter
  }




function XYRtoABC(c) {
    let A0 = -c.x
    let B0 = -c.y
    let C0 = c.x * c.x + c.y * c.y - c.radius * c.radius

    return { A: A0, B: B0, C: C0 };
}

function ABCtoXYR(p) {
    let x0 = -p.A
    let y0 = -p.B
    let r0 = sqrt(p.A * p.A + p.B * p.B - p.C)

    return { x: x0, y: y0, radius: r0 };
}

function invABC(p) {
    // if (p.C === 0) {
    //     let Cinv = 1000000
    // }
    // else {
    //     let Cinv = 1/p.C
    // }
    let Cinv = 1/p.C;
    let A0 = p.A * Cinv;
    let B0 = -p.B * Cinv;
    let C0 = Cinv;

    return { A: A0, B: B0, C: C0 };
}


function invertCircle(c) {
    if (c.x === 0 && c.y ===0) {
        return { x: 0, y: 0, radius: 1/c.radius };
    }
    else{
        print(c);
        return ABCtoXYR(invABC(XYRtoABC(c)));
    }
}


function shiftCircle(c, z) {
    x0 = c.x + z.x;
    y0 = c.y + z.y;
    return { x: x0, y: y0, radius: c.radius };
}


// (c1 + c2i)(x + yi) 
// |z - w| = r => |zz0 - wz0| = r|z0|
function scaleCircle(c, z) {
    r0 = c.radius * sqrt((z.x * z.x + z.y * z.y))
    x0 = c.x * z.x - c.y * z.y
    y0 = c.x * z.y + c.y * z.x
    return { x: x0, y: y0, radius: r0 };
}

function HtoD(c) {
    c1 = shiftCircle(c, {x:0, y:1});
    c2 = invertCircle(c1);
    c3 = scaleCircle(c2, {x:0, y:-2}); 
    c4 = shiftCircle(c3, {x:1, y:0});
    return c4;
}

function DtoH(c) {
    c1 = shiftCircle(c, {x:-1, y:0});
    c2 = scaleCircle(c1, {x:0, y:1/2}); 
    c3 = invertCircle(c2);
    c4 = shiftCircle(c3, {x:0, y:-1});
    return c4;
}



// 
// Getting the next appalonian circle
// 
// 

function getMiddleCircle(c1, c2) {
    a = sqrt(c1.radius)
    b = sqrt(c2.radius)
    c = (a*b)/(a + b)
    r3 = c*c
    x3 = c1.x + 2 * a * c

    return { x: x3, y: r3, radius: r3 };
}

// Function to recursively generate a new list
function getNextLevel(list) {
    // Base case: if the list is empty or has only one element, return it as is
    if (list.length <= 1) {
      return list;
    }
    
    // Recursive case: generate the next element and continue for the rest of the list
    let newList = [list[0], getMiddleCircle(list[0], list[1])];
    
    // Concatenate the result with the recursive call on the rest of the list
    return newList.concat(getNextLevel(list.slice(1)));
  }


// 
// MAKING THE CANVAS
// 
// 

function setup() {
  createCanvas(1300, 600);

  // Randomly generate radii for the first two circles
  let x1 = random(-300/250, 300/250);
  let r1 = random(60/250, 150/250);
  let r2 = random(60/250, 150/250);
  let b1 = 2 * (random() > 0.5 ? 1 : 0) - 1; //either -1 or 1
    //   let x1 = -1
    //   let r1 = .6
    //   let r2 = .4
    //   let b1 = 1

  let x2 = x1 + b1 * 2 * sqrt(r1 * r2);
    
  // Position the circles inside the outer circle
  let circle1 = { x: x1, y: r1, radius: r1 };
  let circle2 = { x: x2, y: r2, radius: r2 };  




  let r30 = sqrt(r1 * r2) / (sqrt(r2) - sqrt(r1))
  let r3 = r30 * r30; 

  let x3;
  let circle3; 
  if (r1 <= r2 && b1 === 1) {
    x3 = x1 - 2 * sqrt(r3 * r1)
    circle3 = { x: x3, y: r3, radius: r3 };
    circlesPlus.push(circle3, circle1);
    circles.push(circle1, circle2);
  }
  else if (r1 <= r2 && b1 === -1) {
    x3 = x1 + 2 * sqrt(r3 * r1)
    circle3 = { x: x3, y: r3, radius: r3 };
    circlesPlus.push(circle1, circle3);
    circles.push(circle2, circle1);
  }
  else if (r2 < r1 && b1 === 1) {
    x3 = x2 + 2 * sqrt(r3 * r2);
    circle3 = { x: x3, y: r3, radius: r3 };
    circlesPlus.push(circle2, circle3);
    circles.push(circle1, circle2);
    circlesLast.push(circle3, circle2);
  }
  else {
    x3 = x2 - 2 * sqrt(r3 * r2)
    circle3 = { x: x3, y: r3, radius: r3 };
    circlesPlus.push(circle3, circle2);
    circles.push(circle2, circle1);
  }


  for (let i = 0; i < 8; i++) {
    circles = getNextLevel(circles)
    circlesPlus = getNextLevel(circlesPlus)
    circlesLast = getNextLevel(circlesLast)
  }

}

function draw() {
  background(200);
  stroke(0,0,255); // black stroke
  noFill();  // No fill

  bigCirc = { x: 0, y: 10000, radius: 10000 };
//   customCircle(bigCirc); 
  customCircle(HtoD(bigCirc));
  

  stroke(255, 0, 0); // Red stroke
  noFill();          // No fill
  
  // Draw the three mutually tangent circles
  for (let i = 0; i < circles.length; i++) {
    let c = circles[i];
    customCircle(HtoD(c));
  }


  stroke(255, 255, 0); // Red stroke
  noFill();          // No fill


  // Draw the three mutually tangent circles
  for (let i = 0; i < circlesPlus.length; i++) {
    let c = circlesPlus[i];
    customCircle(HtoD(c));
  }


//   stroke(0, 255, 0); // Red stroke
//   noFill();          // No fill


//   // Draw the three mutually tangent circles
//   for (let i = 0; i < circlesLast.length; i++) {
//     let c = circlesLast[i];
//     customCircle((c));
//   }

}



