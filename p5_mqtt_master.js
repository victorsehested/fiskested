let hook = { x: 250, y: 500 }; // Hook position
let fish = []; // Array of fish
let fishCaught = null; // Tracks the caught fish
let isFishing = false; // State: Fishing or not
let gameOver = false; // Tracks if the game has ended
let fishImage, pondImage, hookImage; // Holds the fish, pond, and hook images
let neutralTilt = { beta: 0, gamma: 0 }; // Neutral tilt calibration

// MQTT: Receive messages from the phone
client.on('message', function (topic, message) {
  const data = JSON.parse(message.toString());

  // Casting detected
  if (data.val === 'cast' && data.isCasting && !gameOver) {
    isFishing = true; // Start fishing
    console.log("Fishing line cast!");
  }

  // Orientation updates during fishing
  if (isFishing && data.val !== 'cast') {
    hook.x = constrain(data.val.x - neutralTilt.gamma, 0, width); // Adjusted x
    hook.y = constrain(data.val.y - neutralTilt.beta, 0, height); // Adjusted y
  }
});

function preload() {
  fishImage = loadImage('fisk.jpeg'); // Load fish image
  pondImage = loadImage('pond.jpg'); // Load topside pond image
  hookImage = loadImage('hook.jpg'); // Load hook image
}

function setup() {
  createCanvas(500, 500);

  // Initialize fish with random positions
  for (let i = 0; i < 5; i++) {
    fish.push({
      x: random(width),
      y: random(height / 2, height),
      speed: random(1, 3),
    });
  }

  // Calibrate neutral tilt on start
  calibrateNeutralTilt();
}

function draw() {
  if (gameOver) {
    drawVictoryScreen(); // Display victory message
    return;
  }

  if (!isFishing) {
    image(pondImage, 0, 0, width, height); // Topside pond before casting
    textSize(32);
    fill(255);
    text('Waiting for line to be cast...', width / 2, height / 2);
    return;
  }

  drawUnderwaterScene(); // Draw underwater fishing scene
}

function drawUnderwaterScene() {
  background(255); // White background

  // Draw static blue waves at the top
  fill(0, 100, 255);
  noStroke();
  rect(0, 0, width, 30); // Blue rectangle for water surface

  // Draw the fishing line
  stroke(0);
  line(width / 2, 0, hook.x, hook.y); // Line to the hook
  image(hookImage, hook.x - 10, hook.y - 10, 20, 20); // Hook image

  // Move and draw fish
  for (let f of fish) {
    if (f !== fishCaught) {
      f.x += f.speed;
      if (f.x > width) f.x = 0; // Wrap-around fish movement
      image(fishImage, f.x, f.y, 40, 40); // Draw fish image
    }
  }

  // Collision detection
  if (!fishCaught) {
    for (let f of fish) {
      if (checkCollision(hook, f)) {
        fishCaught = f; // Mark the fish as caught
        console.log("Fish caught!");
        break;
      }
    }
  }

  // Handle the caught fish
  if (fishCaught) {
    image(fishImage, hook.x - 20, hook.y - 20, 40, 40); // Attach fish to hook

    // Check win condition
    if (hook.y <= 0) {
      endGame(); // Trigger victory and reset
    }
  }
}

function checkCollision(hook, fish) {
  return dist(hook.x, hook.y, fish.x, fish.y) < 20; // Collision threshold
}

function endGame() {
  console.log("You caught a fish! Game Over!");
  gameOver = true; // Mark the game as over
  setTimeout(resetGame, 3000); // Reset game after 3 seconds
}

function resetGame() {
  isFishing = false;
  fishCaught = null; // Reset caught fish
  gameOver = false; // Reset game over state
  hook = { x: 250, y: 500 }; // Reset hook position
  fish = []; // Reinitialize fish

  // Generate new fish positions
  for (let i = 0; i < 5; i++) {
    fish.push({
      x: random(width),
      y: random(height / 2, height),
      speed: random(1, 3),
    });
  }
}

function drawVictoryScreen() {
  background(50, 205, 50); // Green background for victory
  textSize(40);
  fill(255);
  text("Congratulations!", width / 2, height / 3);
  textSize(24);
  text("You caught a fish!", width / 2, height / 2);
  text("Get ready for the next game...", width / 2, (2 * height) / 3);
}

// Calibrate the neutral tilt to handle natural phone orientation
function calibrateNeutralTilt() {
  window.addEventListener('deviceorientation', (event) => {
    neutralTilt.beta = event.beta; // Capture the tilt forward/backward
    neutralTilt.gamma = event.gamma; // Capture the tilt left/right
    console.log('Neutral tilt calibrated:', neutralTilt);
    // Remove the event listener once calibrated
    window.removeEventListener('deviceorientation', arguments.callee);
  });
}
