const astroContainer = document.getElementById('astro-container');
const astroText = document.getElementById('message');
const newAstroBtn = document.getElementById('new-message');
const loader = document.getElementById('loader');
const apiResponseContainer = document.getElementById('apiResponse');
const aboutContainer = document.getElementById('about-container');
const signElements = document.querySelectorAll('.twelve-signs li');

signElements.forEach((signElement) => {
    signElement.addEventListener('click', () => {
        const sign = signElement.textContent.toLowerCase();
        getMessages(sign);
    });
});

function showModal(about) {
    const modalAbout = document.getElementById('modal-about');
    modalAbout.textContent = about;
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Close modal when user clicks on button or outside
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close')[0];

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
})

let astroMessage = {};
// let astroMessages = {};

function showLoadingSpinner() {
    // loader.hidden = false;
    astroContainer.hidden = true;
}

function removeLoadingSpinner() {
    astroContainer.hidden = false;
    loader.hidden = true;
}

function newMessage() {
    showLoadingSpinner();
    removeLoadingSpinner();
}
// function newMessage() {
//     showLoadingSpinner();
//     // Check if astroMessages array is empty or undefined
//     if (astroMessage && astroMessage.text) {
//         astroText.textContent = apiResponseContainer.textContent; // Update this line

//     } else {
//         astroText.textContent = "No message available";
//     }
//     removeLoadingSpinner();


// }
// Get Quotes from API
async function getMessages(sign) {
    showLoadingSpinner();
    const apiUrl = `https://horoscope-astrology.p.rapidapi.com/sign?s=${sign}`;
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8e867b7743msh28ac5e34ec4bd13p1a0628jsncb88b58e606e',
		'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
	}
};
try {
    const response = await fetch(apiUrl, options);
    const apiResponse = await response.json();
    const aboutData = apiResponse.about;

    showModal(aboutData);
    removeLoadingSpinner();
    // console.log(aboutData); // Display the 'about' data in the console
     // Display the 'about' data on the screen
    //  aboutContainer.textContent = aboutData;
   
    // newMessage(); // Call newMessage after populating astroMessages
    } catch (error) {
    // console.log(error);
    astroText.textContent = "No message available";
    }
}
document.getElementById('apiResponse').innerHTML = JSON.stringify(astroMessage);


// Event Listeners
// newAstroBtn.addEventListener('click', newMessage);

// On Load
getMessages();