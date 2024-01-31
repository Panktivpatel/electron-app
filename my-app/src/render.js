// Fetching buttos\ns from html page
const videoElement = document.querySelector('video');
const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const videoSelection = document.getElementById('videoSelectBtn');
console.log(videoSelection); 
// Assigning the function called 'getVideoSources' when videoSelection Button 
// is clicked
videoSelection.onclick = getVideoSources;

// Desktop capture module that e can use right here in our render process
// Electron makes the require function available in the browser 
const { desktopCapturer } = require('electron');
// Process of using remote is to handle inter Process Commuication
// Allows to build native menus directly in our frontend code.
const remote = require('@electron/remote');
const { Menu } = remote;

// Get available video sources
async function getVideoSources() {
    /* To access ll of the windows or screens in the system 
       by calling desktopCapturer

       This method will return a promise use the keyword to await the actual 
       value of value is an array of objects here each object is a windows or 
       screen available on user's computer to add the video
    */
    try {
        const inputSources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
        // This method expects an array of objects
        const videoOptionsMenu = Menu.buildFromTemplate(
            /* Each objects represent different menu item
               Using map to convert our array of input sources nto an array 
               of menu items for each source  
            */
            inputSources.map(source => ({
                /* 
                    Label will be the source name and we will add an event
                    handler for click that calls another function 
                */
                label: source.name,
                click: () => selectSource(source)
          }))
        );
    
        videoOptionsMenu.popup();
      } catch (error) {
        console.error('Error getting video sources:', error.message);
      }
}