window.onload = function () {
	// Set the date and time in Tunisia (UTC+1)
	const tunisiaTime = new Date("August 14, 2023 00:45:00").getTime();
  
	// Calculate the offset between Tunisia time (UTC+1) and the user's local time
	const tunisiaOffset = -60; // Tunisia is UTC+1, so the offset is -60 minutes
	const userOffset = new Date().getTimezoneOffset(); // User's local time offset from UTC in minutes
	const timeDifference = (userOffset - tunisiaOffset) * 60 * 1000;
  
	// Adjust the Tunisia time according to the user's local time
	const adjustedTunisiaTime = tunisiaTime - timeDifference;
  
	// Update the count every 1 second
	setInterval(function () {
	  // Get the current date and time
	  const now = new Date().getTime();
  
	  // Find the time difference between now and the adjusted Tunisia time
	  const elapsedTime = now - adjustedTunisiaTime;
  
	  // Calculate time in days, hours, minutes, and seconds
	  const days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
	  const hours = Math.floor(
		(elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	  );
	  const minutes = Math.floor(
		(elapsedTime % (1000 * 60 * 60)) / (1000 * 60)
	  );
	  const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
  
	  // Display the result in the respective elements
	  document.getElementById("days").innerHTML = days + " <span>Days</span>";
	  document.getElementById("hours").innerHTML = hours + " <span>Hours</span>";
	  document.getElementById("minutes").innerHTML =
		minutes + " <span>Minutes</span>";
	  document.getElementById("seconds").innerHTML =
		seconds + " <span>Seconds</span>";
	}, 1000);
  };
  