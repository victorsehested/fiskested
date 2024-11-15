function modtager(fiskespil, modtagetBesked) {
    let modtagerBuffer = JSON.parse(modtagetBesked);
	
    let afsenderen = modtagerBuffer.from;
	if (afsenderen == afsenderID)
	{
	    let value = modtagerBuffer.val;
	    // do something with the received value
		console.log(value);
		console.log("Received message:", modtagetBesked);
	}
	
   
}

console.log("AAAAAAAAAAAAAAAAAAReceived message:", modtagetBesked);