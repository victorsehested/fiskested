// Aquarium variables
let vid; // Video background
let playing = true;
let acceleration = 0;
let gamma = 0;

// Fish variables
let Fish; // Fish image
let fishX; // Fish's x-position
let fishY; // Fish's y-position
let fishSpeed = 2; // Speed of fish movement
let fishDirection = 1; // 1 means right, -1 means left

// Lure variables
let lureImage; // Fishing lure image
let lureY; // Lure's vertical position
let lureSpeed = 6; // Speed of lure movement
let lureStopped = false; // Flag to indicate if the lure has stopped

console.log("Acceleration:", acceleration, "Gamma:", gamma);


function preload() {
  Fish = loadImage("fish1.png");
  vid = createVideo("aquarium.mp4");
  lureImage = loadImage("Fiskeblink.png"); // Load the lure image
}

function setup() {
  // Canvas
  createCanvas(windowWidth, windowHeight);

  // Video background
  vid.size(windowWidth, windowHeight);
  vid.volume(0);
  vid.loop();
  vid.hide(); // Hide the HTML element since we want to draw the video on the canvas

  // Fish start position
  fishX = width / 2; // Start in the middle of the screen on the x-axis
  fishY = height / 2; // Start in the middle of the screen on the y-axis

  // Lure start position
  lureY = 0; // Start at the top of the screen
}

function draw() {
  // Draw video background
  image(vid, 0, 0, width, height);

  // --- Fish Animation ---
  if (fishDirection == 1) {
    // Flip the fish if moving right
    push(); // Save current transformation
    translate(fishX + Fish.width / 2, fishY); // Move the coordinate system to the fish's center
    scale(-1, 1); // Mirror horizontally
    image(Fish, -Fish.width / 2, -Fish.height / 2, 200, 100); // Draw the fish flipped
    pop(); // Restore transformation
  } else {
    // Draw fish normally
    image(Fish, fishX, fishY, 200, 100);
  }

  // Move fish from side to side
  fishX += fishSpeed * fishDirection; // Update fish's x position

  // Check for screen boundaries and reverse direction
  if (fishX + 200 > width || fishX < 0) {
    fishDirection *= -1; // Flip direction
  }
  
  // --- Lure Animation ---
  drawLure();
}

function drawLure() {
  let lureX = width / 2; // Centered horizontally
  let lureWidth = 70; // Width of the lure image
  let lureHeight = 500; // Height of the lure image

  // Draw the lure image manually (top-left aligned)
  image(lureImage, lureX - lureWidth / 2, lureY - lureHeight, lureWidth, lureHeight);

  // Move the lure down only if it hasn't stopped
  if (!lureStopped) {
    lureY += lureSpeed;
  }

  // Stop the lure when it reaches the middle of the screen
  if (lureY >= height / 2) {
    lureStopped = true;
  }
}
