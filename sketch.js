let sliderAng;


function cos_sum(n, T) {
  let sum = 0;
  for(let i = 1; i <= n; i += 1) {
    sum += cos(i*(PI - T));
  }
  return sum;
  
//   let c1 = sin(n*(PI - T)/2);
//   let c2 = sin((PI - T)/2);
//   let c3 = cos((n+1)*(PI - T)/2);
          
//   return c1*c2/c3;

}

function sin_sum(n, T) {
  let sum = 0;
  for(let i = 1; i <= n; i += 1) {
    sum += sin(i*(PI - T));
  }
  return sum;
  
//   let c1 = sin(n * (PI - T) / 2);
//   let c2 = sin((PI - T)/2);
//   let c3 = sin((n+1)*(PI - T) / 2);
  
//   console.log(c1);
//   console.log(c2);
//   console.log(c3);
  
//   return c1*c2/c3;
}


function setup() {
  createCanvas(1200, 600);
  sliderAng = createSlider(185, 360, 0, 5);
  sliderAng.position(10, 10);
  sliderAng.style('width', '180px');
  
  
 
}

function draw() {

  
  background(200);
  
  let T = PI*sliderAng.value()/180;

  
  translate(width / 2, height / 1.5);

  let s = width/7;
  
  
  for (let n = 0; n < 200; n += 1) {
    
    
    line(s*cos_sum(n, T), s*sin_sum(n,T), 
         s*cos_sum(n+1, T), s*sin_sum(n+1,T));
    
  }
}