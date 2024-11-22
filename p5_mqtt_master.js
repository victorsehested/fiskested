let alfa = 0;
let beta = 0;
let val = 0;
let kastet = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill('yellow');
  textAlign(CENTER, CENTER);
  text('Jeg modtager', windowWidth / 2, windowHeight / 2);
}

function draw() {
  background(220);

  // Display received values
  fill('yellow');
  text(`alfa: ${alfa}`, width / 2, height / 2 - 40);
  text(`beta: ${beta}`, width / 2, height / 2);
  text(`val (gamma): ${val}`, width / 2, height / 2 + 40);
  text(`kastet: ${kastet ? "Yes" : "No"}`, width / 2, height / 2 + 80);

  // Debugging log
  console.log("Current values:", { alfa, beta, val, kastet });
}
