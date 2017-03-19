var running = false;
var stop = false;
var endTime;
var sessionLength;
var timeRemaining;
var pauseTime;
// Set the date we're counting down to

$('#stop').click(function(){
		stop = true;
		console.log("stop");
});

$('#restart').click(function(){
		stop = true;
		restart = true;	
		endTime = new Date().getTime() + (1000 * 60)*$("#sessionLength").val();
		$('#timer').html($("#sessionLength").val() + "m " + "0" + "s ");
});

$('#resume').click(function(){
		restart = false;
		stop = false;

		console.log(new Date().getTime() - pauseTime);
		startTimer(sessionLength + (new Date().getTime() - pauseTime));
});

$("#start").click(function(){
		stop = false;
		restart = false;
		console.log("restart");
		sessionLength = $('#sessionLength').val();
		var endTime = new Date().getTime() + (1000 * 60)*sessionLength;
		startTimer(endTime);
});

function startTimer(endTime){
		running = true;
//		endTime = new Date().getTime() + (1000 * 60)*time;

		// Update the count down every 1 second
		var x = setInterval(function() {
				// Get todays date and time
				var now = new Date().getTime();

				// Find the distance between now an the count down date
				distance = endTime - now;

				sessionLength = endTime;

				// Time calculations for days, hours, minutes and seconds
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);

				// Display the result in the element with id="timer"
				$('#timer').html(minutes + "m " + seconds + "s ");

				// If the count down is finished, write some text
				if (distance < 0) {
						clearInterval(x);
						document.getElementById("timer").innerHTML = "EXPIRED";
				}

				if (stop == true) {
						pauseTime = new Date().getTime();
						clearInterval(x);
				}
		}, 1000);
}
