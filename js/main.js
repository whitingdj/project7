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
    toggleFullScreen();
  });
  
  function toggleFullScreen() {
   var videoDiv = document.getElementById('video-container');
    if (!document.fullscreenElement &&
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
      if (videoDiv.requestFullscreen) {
        videoDiv.requestFullscreen();
      } else if (videoDiv.msRequestFullscreen) {
        videoDiv.msRequestFullscreen();
      } else if (videoDiv.mozRequestFullScreen) {
        videoDiv.mozRequestFullScreen();
      } else if (videoDiv.webkitRequestFullscreen) {
        videoDiv.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }


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
      $controls.fadeIn(500);
    }),
$vidContainer.mouseleave(function () {
      $controls.fadeOut(500);
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

function secondsFromTimespan(timeSpan) {
    if(!timeSpan || !timeSpan.indexOf(':')) return 0;
    var parts = timeSpan.split(':');
    return +parts[0] * 60 + +parts[1]
}

function constructIntervals(transcripts) {
    var intervals = [];
    for(var i = 0; i < transcripts.length; i++) {
        if(i == transcripts.length - 1) {
            intervals.push({
                lowerBound: secondsFromTimespan($(transcripts[i]).attr('data-start')),
                upperBound: Math.floor($video[0].duration),
                transcript: transcripts[i] // current transcript
            });
        } else {
            intervals.push({
                lowerBound: secondsFromTimespan($(transcripts[i]).attr('data-start')),
                upperBound: secondsFromTimespan($(transcripts[i + 1]).attr('data-start')),
                transcript: transcripts[i] // current transcript
            });
        }

    }
    return intervals;
}

function isTimeWithinInterval(interval, currentTime) {
    var lowerBoundSeconds = interval.lowerBound;
    var upperBoundSeconds = interval.upperBound;
    return lowerBoundSeconds <= currentTime && currentTime < upperBoundSeconds;
}


/******************************************
Highlight Text from Video
******************************************/


$(function () {

    var transcripts = $("span[data-start]");
    var intervals = constructIntervals(transcripts);
    $video[0].addEventListener('timeupdate', function () {

        $('span[data-start]').removeClass('highlight');
        for(var i = 0; i < intervals.length; i++) {
            if(isTimeWithinInterval(intervals[i], $video[0].currentTime)) {
                $(intervals[i].transcript).addClass('highlight');
            }
        }
    })

});


        

