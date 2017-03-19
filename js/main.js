var running = false;
var stop = false;
var started = false;
var endTime;
var sessionLength;
var timeRemaining;
var pauseTime;
var type = "pomo";

$('#restart').click(function(){
		stop = true;
		started = false;
		restart = true;	
		endTime = new Date().getTime() + (1000 * 60)*$("#sessionLength").val();
		$('#timer').html($("#sessionLength").val() + "m " + "0" + "s ");
		$('#start').html('Start Timer');
});

$("#start").click(function(){
		if (running == false && started == false) {
				$('#start').html('Stop Timer');
				$('#start').attr('class', 'btn red');
				stop = false;
				restart = false;
				sessionLength = $('#sessionLength').val();
				var endTime = new Date().getTime() + (1000 * 60)*sessionLength;
				startTimer(endTime);
				running = true;
				started = true;
		} else if (running == false && started == true) {
				$('#start').html('Stop Timer');
				$('#start').attr('class', 'btn red');
				restart = false;
				stop = false;
				startTimer(sessionLength + (new Date().getTime() - pauseTime));
		} else {
				$('#stop').attr('id', 'start');
				$('#start').html('Resume Timer');
				$('#start').attr('class', 'btn green');
				stop = true;
				running = false;
		}
});

function startTimer(endTime){
		if (type == "pomo") {
				$("#timer").css("color", "green");	
		} else {
				$("#timer").css("color", "red");
		}
		running = true;

		// Update the count down every 1 second
		var x = setInterval(function() {
				// Get todays date and time
				var now = new Date().getTime();

				// Find the distance between now an the end time 
				distance = endTime - now;

				sessionLength = endTime;

				// Time calculations for minutes and seconds
				var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((distance % (1000 * 60)) / 1000);

				// Display the result in the element with id="timer"
				$('#timer').html(minutes + "m " + seconds + "s ");
				
				if (stop == true) {
						pauseTime = new Date().getTime();
						clearInterval(x);
				}
				// If the count down is finished, write some text
				if (distance < 0) {
						console.log("zero");
						clearInterval(x);
						if (type == "pomo") {
								type = "break";
								sessionlength = $('#breaklength').val();
								endTime = new Date().getTime() + (1000 * 60)*sessionLength;
								startTimer(endTime)

						} else {
								type = "pomo";
								sessionlength = $('#sessionlength').val();
								endTime = new Date().getTime() + (1000 * 60)*sessionLength;
								startTimer(endTime)
						}
				}

				
		}, 1000);
}
