var smallButton = document.getElementById('small');
var mediumButton = document.getElementById('medium');
var squareButton = document.getElementById('square');
var monoChromaticSwitch = document.getElementById('monochrome-switch');
var image = document.getElementById('image');

var baseUrl = 'https://cataas.com/cat?';

// generic cat API call user by each button to request different image types
function queryCatAPI(imageType) {

    var url = `${baseUrl}${monoChromaticSwitch.checked ? `filter=mono&` : ``}type=${imageType}`

    // no-store to prevent caching image
    fetch(url, { cache: "no-store" })

        // convert response to image blob to be rendered through image element
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            image.src = imageObjectURL;
            if (image.src !== "") {
                image.classList.add('show');
            }
        })

        // hide image element if there was an error fetching or rendering the image
        .catch((error) => {
            console.log(error);
            image.classList.remove('show');
        });
}

// Add event handlers for each button
smallButton.addEventListener('click', (e) => {
    queryCatAPI('sm')
})
mediumButton.addEventListener('click', (e) => {
    queryCatAPI('md')
})
squareButton.addEventListener('click', (e) => {
    queryCatAPI('sq')
})