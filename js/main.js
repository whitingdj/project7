var $video = $("#video-player");
var $playButton = $(".play-btn");
var $pauseButton = $(".pause-btn");
var $muteButton = $(".mute-btn");
var $volumeButton = $(".volume-btn");
var $fullScreen = $(".full-screen");
 
$playButton.click(function () { 
	$video.get(0).play(); //plays the video
	$('.play-btn').hide();
	$('.pause-btn').show();		
});

$pauseButton.click(function () { 
	$video.get(0).pause(); //pauses the video
	$('.pause-btn').hide();
	$('.play-btn').show();
});

$muteButton.click(function () { 
	$video.prop('muted', true); //mutes the video
	$('.mute-btn').hide();
	$('.volume-btn').show();		
});

$volumeButton.click(function () { 
	$video.prop('muted', false); //gives sound to the video
	$('.volume-btn').hide();
	$('.mute-btn').show();
});

$fullScreen.click(function() {
  if ($video.requestFullscreen) {
    $video.requestFullscreen();
  } else if ($video.msRequestFullScreen) {
  	 $video.msRequestFullscreen();
  } else if ($video.mozRequestFullScreen) {
     $video.mozRequestFullScreen(); // Firefox
  } else if ($video.webkitRequestFullscreen) {
     $video.webkitRequestFullscreen(); // Chrome and Safari
  }
});