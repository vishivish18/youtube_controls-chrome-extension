var videoElement = document.querySelector('video');

function play() {
  videoElement.play();
}

function pause() {
  videoElement.pause();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
  if (request.msg == 'Playing') {  	
    pause();
    sendResponse({msg: 'Action', data: playButton});
  }
  else if (request.msg == 'Not playing') {  	
    play();
    sendResponse({msg: 'Action', data: playButton});
  }
});
