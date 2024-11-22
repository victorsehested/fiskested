function modtager(topic, modtagetBesked) {
    let modtagerBuffer = JSON.parse(modtagetBesked);
  
    // Extract values from the received message
    let afsenderen = modtagerBuffer.from;
    let receivedAlfa = modtagerBuffer.val1;
    let receivedBeta = modtagerBuffer.val2;
    let receivedVal = modtagerBuffer.val3;
    let receivedKastet = modtagerBuffer.val4;
  
    // Update global variables with received values
    alfa = receivedAlfa;
    beta = receivedBeta;
    val = receivedVal;
    kastet = receivedKastet;
  
    // Debugging log
    console.log("Received data:", { alfa, beta, val, kastet });
  }
  