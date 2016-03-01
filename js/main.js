var $video = $("#video-player");
var $vidContainer = $("#video-container");
var $playButton = $("#play-pause");
var $pauseButton = $(".pause-btn");
var $muteButton = $("#mute");
var $fullScreen = $("#full-screen");
var $progress = $('#progress');
var $progressBar = $('#progress-bar');
var $controls =$('#wrapper');
var $caption = $('#caption');


/******************************************
Play and Pause Buttons
******************************************/
 
$playButton.click(function () { 
	if ($video.get(0).paused){ 
			$video.get(0).play(); //plays the video
			$('.play-btn').hide();
			$('.pause-btn').show();		
		} else{
			$video.get(0).pause(); //pauses the video
			$('.pause-btn').hide();
			$('.play-btn').show();
		}
	});


/******************************************
Volume and Mute Buttons
******************************************/

$muteButton.click(function () { 
  if($video[0].muted == false){ 
    $video[0].muted = true; //mutes the video
      $('.mute-btn').hide();
      $('.volume-btn').show();    
  } else {
    $video[0].muted = false; //gives sound to the video
      $('.volume-btn').hide();
      $('.mute-btn').show();
    }
  });


/******************************************
Full Screen Button
******************************************/

$fullScreen.click(function() {
	var video = $video[0]; // redefine global var in order to manipulate true DOM methods
  if (video.requestFullscreen) { //enter fullscreen
    video.requestFullscreen();
  } else if (video.msRequestFullScreen) {
  	 video.msRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
     video.mozRequestFullScreen(); // Firefox
  } else if (video.webkitRequestFullscreen) {
     video.webkitRequestFullscreen(); // Chrome and Safari
  }
});

$fullScreen.click(function() {
	var video = $video[0]; // redefine global var in order to manipulate true DOM methods
  if (video.exitFullscreen) { //exit fullscreen
    video.exitFullscreen();
  } else if (video.msExitFullscreen) {
  	 video.msExitFullscreen();
  } else if (video.mozCancelFullScreen) {
     video.mozCancelFullScreen(); // Firefox
  } else if (video.webkitExitFullscreen) {
     video.webkitExitFullscreen(); // Chrome and Safari
  }
});


/******************************************
Progress Bar - JavaScript
******************************************/

$video[0].addEventListener('loadedmetadata', function() {
   $progress[0].setAttribute('max', $video[0].duration);
});
$video[0].addEventListener('timeupdate', function() {
   $progress[0].value = $video[0].currentTime;
   $progressBar[0].style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});
$video[0].addEventListener('timeupdate', function() {
   if (!$progress[0].getAttribute('max')) $progress[0].setAttribute('max', $video[0].duration);
   $progress[0].value = $video[0].currentTime;
   $progressBar[0].style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});


/******************************************
Skip Ahead
******************************************/
$video.bind("timeupdate", videoTimeUpdateHandler);
$progress.mousedown(progressMouseDown);
        
        function videoTimeUpdateHandler(e) {
            var video = $video.get(0);
            var percent = video.currentTime / video.duration;
            updateProgressWidth(percent);
        }
        
        function progressMouseDown(e) {
            var $this = $(this);
            var x = e.pageX - $this.offset().left;
            var percent = x / $this.width();
            updateProgressWidth(percent);
            updateVideoTime(percent);
        }
        
        function updateProgressWidth(percent) {
            $progressBar.width((percent * 100) + "%");
        }
        
        function updateVideoTime(percent) {
            var video = $video.get(0);
            video.currentTime = percent * video.duration;
        }


/******************************************
Hide controls except Progress Bar
******************************************/

$vidContainer.mouseenter(function () {
      $controls.show('slow', 'swing');
    }),
$vidContainer.mouseleave(function () {
      $controls.hide('slow', 'swing');
    });



/******************************************
Update currentTime and duration
******************************************/

function intoSeconds(seconds, showHours) {
    if(showHours) {
        var hours = Math.floor(seconds / 3600),
            seconds = seconds - hours * 3600;
    }
    var minutes = ("0" + Math.floor(seconds/60)).slice(-2);
    var seconds = ("0" + parseInt(seconds%60,10)).slice(-2);

    if(showHours) {
        var time = hours + ":" + minutes + ":" +  seconds;
    } else {
        var time = minutes + ":" + seconds + " " + "/";
    }
    return time;
}

var video = $video;
video.bind("timeupdate", function () {
    $('#current').html(intoSeconds(video[0].currentTime));
    $('#duration').html(intoSeconds(video[0].duration));
});

/******************************************
Highlight Text from Video
******************************************/

 $(function() {
    var transcript = $("span");
    var i = 0;
    var time = intoSeconds($video[0].currentTime);
        $.each(transcript, function(){
               var start = $(transcript[i]).attr("data-start");
               var startNum = parseFloat(start);
               if (time >= startNum){
                    $(transcript[i]).addClass("highlight");
               } else {
                    $(transcript[i]).removeClass("highlight");
               } 
               i++;
            });


   $video[0].addEventListener('timeupdate', function() {
      var start = $(transcript).attr("data-start");
      var startNum = parseFloat(start);
     //Compare the video's current time to the spans data-start attributes  here//
     if (time === startNum){
                    $(transcript).addClass("highlight");
                    console.log('importante');
               } else {
                    $(transcript).removeClass("highlight");
                    console.log('ive created a monster');
               }  
     })
});

