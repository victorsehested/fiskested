function modtager(topic, modtagetBesked) {
  let modtagerBuffer = JSON.parse(modtagetBesked);
  let afsenderen = modtagerBuffer.from;
  let value = modtagerBuffer.x; // Extract the sent data

  console.log(value); // Log received data for debugging

  // Handle the casting action
  if (value.motion && value.motion.z > 10 && !isFishing && !gameOver) { 
    // Check if the z-axis motion exceeds the threshold to detect casting
    isFishing = true; // Start fishing
    console.log("Fishing line cast!");

    // Set initial hook position based on receiver screen center
    hook.x = width / 2;
    hook.y = height / 2;
  }

  // Handle the motion updates during fishing
  if (isFishing && value.motion) {
    // Update hook position based on motion data
    hook.x = constrain(hook.x + (value.motion.x - neutralTilt.gamma), 0, width);
    hook.y = constrain(hook.y + (value.motion.y - neutralTilt.beta), 0, height);
  }

  // Handle orientation updates to calibrate the neutral tilt
  if (value.orientation) {
    neutralTilt.beta = value.orientation.beta; // Forward/backward tilt calibration
    neutralTilt.gamma = value.orientation.gamma; // Left/right tilt calibration
  }
}
