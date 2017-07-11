/*
 * Simon Anatole Orlovsky
 * Pomodoro Timer
 * 19 March 2017
 */

var running = false;
var stop = false;
var started = false;
var endTime;
var sessionLength;
var timeRemaining;
var pauseTime;
var type = "pomo";

// setting initial timer
$('#timer').html($("#sessionLength").val() + "m " + "0" + "s ");
$('#timer').css("color","#55acee");
// clear timer
function reset(type){
    type = "pomo";
    stop = true;
    started = false;
    restart = true;	
    if (type == "pomo"){
        endTime = new Date().getTime() + (1000 * 60)*$("#sessionLength").val();
    } 

    else {
        endTime = new Date().getTime() + (1000 * 60)*$("#breakLength").val();
    }

    if (type == 'pomo'){
        $('#timer').html($("#sessionLength").val() + "m " + "0" + "s ");
        $('#timer').css('color', '#55acee');
        $('#start').html('Start Timer');
        $('#start').attr('class', 'btn btn-primary');
        running = false;
    } else {
        $('#timer').html($("#breakLength").val() + "m " + "0" + "s ");
        $('#timer').css('color', 'red');
        $('#start').html('Start Timer');
        $('#start').attr('class', 'btn btn-primary');
        running = false;
    }
}

// stop and start timer
function toggleTimer(){
    if (running == false && started == false) {
        $('#start').html('Stop Timer');
        $('#start').attr('class', 'btn btn-danger');
        stop = false;
        restart = false;
        if (type=="pomo"){
            sessionLength = $('#sessionLength').val();
        } else {
            sessionLength = $('#breakLength').val();
        }
        var endTime = new Date().getTime() + (1000 * 60)*sessionLength;
        startTimer(endTime);
        running = true;
        started = true;
    } else if (running == false && started == true) {
        $('#start').html('Stop Timer');
        $('#start').attr('class', 'btn btn-primary');
        restart = false;
        stop = false;
        startTimer(sessionLength + (new Date().getTime() - pauseTime));
    } else {
        $('#stop').attr('id', 'start');
        $('#start').html('Resume Timer');
        $('#start').attr('class', 'btn btn-primary');
        stop = true;
        running = false;
    }

}

$('#restart').click(function() {
    reset(type);
});

$("#start").click(function() {
    toggleTimer();
});

function startTimer(endTime) {

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
        if (running == true){
            $('#timer').html(minutes + "m " + seconds + "s ");
        }

        if (stop == true) {
            pauseTime = new Date().getTime();
            clearInterval(x);
        }
        // If the count down is finished, write some text
        if (distance < 0) {
            document.getElementById('beep').play()
            if (type == "pomo") {
                type = "break";
            } else {
                type = "pomo";
            }
            $('#stop').attr('id', 'start');
            $('#start').html('Start Timer');
            $('#start').attr('class', 'btn btn-primary');
            running = false;
            started = false;
            clearInterval(x);
            reset(type);
            toggleTimer();
        }


    }, 1000);
}

// Keyboard Shortcuts
$(document).keydown(function(evt){
    // <c-s> for settings
    if (evt.keyCode==83 && (evt.ctrlKey)){
        evt.preventDefault();
        $('#settingsModal').modal('toggleTimer')
    }

    // Space key to start and stop
    if (evt.keyCode==32) {
        evt.preventDefault();
        toggleTimer();
    }

    // <c-r> for restart
    if (evt.keyCode==82 && (evt.ctrlKey)){
        evt.preventDefault();
        reset();
    }

});
