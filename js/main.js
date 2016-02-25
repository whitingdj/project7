var $video = $("#video-player");
var $playButton = $(".play-btn");
var $pauseButton = $(".pause-btn");
var $muteButton = $(".mute-btn");
var $volumeButton = $(".volume-btn");
var $fullScreen = $("#full-screen");
var $progress = $('#progress')[0];
var $progressBar = $('#progress-bar')[0];


/******************************************
Play and Pause Buttons
******************************************/
 
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


/******************************************
Volume and Mute Buttons
******************************************/

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
   $progress.setAttribute('max', $video[0].duration);
});
$video[0].addEventListener('timeupdate', function() {
   $progress.value = $video[0].currentTime;
   $progressBar.style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});
$video[0].addEventListener('timeupdate', function() {
   if (!$progress.getAttribute('max')) $progress.setAttribute('max', $video[0].duration);
   $progress.value = $video[0].currentTime;
   $progressBar.style.width = Math.floor(($video[0].currentTime / $video[0].duration) * 100) + '%';
});


/******************************************
Skip Ahead- JavaScript
******************************************/

$progress.click(function(e) {
   var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
   $video[0].currentTime = pos * video[0].duration;
});

/*$('#current').append($video[0].currentTime);
$('#duration').append($video[0].duration);*/
