function modtager(fiskespil, modtagetBesked) {
    let modtagerBuffer = JSON.parse(modtagetBesked);
	
    let afsenderen = modtagerBuffer.from;
	if (afsenderen == afsenderID)
	{
	    acceleration = modtagerBuffer.val1;
		gamma = modtagerBuffer.val2;
	    // do something with the received value
		console.log(value);
		console.log("Received message:", modtagetBesked);
	}
	
   
}

console.log("AAAAAAAAAAAAAAAAAAReceived message:", modtagetBesked);

