var status;
function toggleIconAndTitle() {

  // check if Youtube tab is found or not
  getYoutubeTab();

  if (status == "" || status == 'Not playing') {
    chrome.browserAction.setIcon({path:"images/iconplay.png"});
    chrome.browserAction.setTitle({title: "Play song on youtube"});
    status = 'Playing'
    console.log('Not playing');
  } else if (status == 'Playing') {
    chrome.browserAction.setIcon({path:"images/iconpause.png"});
    chrome.browserAction.setTitle({title: "Pause current song"});
    status = 'Not playing';
    console.log('Playing');
  };
};

function getYoutubeTab() {
  // get list of all Youtube tabs

  
  chrome.tabs.query({url: 'https://www.youtube.com/*'}, function(tabs) {
    if (tabs.length > 0) {
      console.log('youtube is present.');

      // find activetabs
      activeTabs = tabs.filter(function(tab) { return tab.status == 'complete';})
      console.log("No. of active instances present:", activeTabs.length);
      activeTabs.forEach(function(item) {
        console.log(item.id, item.status);
      })

      findPlayer(activeTabs[0]);

    } else {
      console.log('No youtube instance found.');
      chrome.tabs.create({url: 'https://www.youtube.com/'}, function(tab) {
        console.log('Opening http://www.youtube.com');
      });
    }
  });
};

function findPlayer(tab) {
  console.log('Searching for player...');

  // Initiate communication request with content script.
  chrome.tabs.sendMessage(tab.id, {msg: status}, function(response) {
    console.log('accessing tab: ', tab.id);
    console.log('found player: ', response);
  })
}

chrome.browserAction.onClicked.addListener(toggleIconAndTitle);
toggleIconAndTitle();
