const astroContainer = document.getElementById('astro-container');
const astroText = document.getElementById('message');
const newAstroBtn = document.getElementById('new-message');
const loader = document.getElementById('loader');
const apiResponseContainer = document.getElementById('apiResponse');
const horescopeContainer = document.getElementById('horescope-container');
const signElements = document.querySelectorAll('.twelve-signs li');


signElements.forEach((signElement) => {
    signElement.addEventListener('click', () => {
        const sign = signElement.textContent.toLowerCase();
        getMessages(sign);
    });
});

// Modal Function
function showModal(horoscope) {
    const modalAbout = document.getElementById('modal-about');
    modalAbout.textContent = horoscope;
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Close modal when user clicks on button or outside
window.addEventListener('click', (event) => {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
});
const modal = document.getElementById('modal');
const closeButton = document.getElementsByClassName('close-icon')[0];

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});


// let astroMessage = {};


//  Hide modal on page load
window.addEventListener('load', () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
});


function showLoadingSpinner() {
    loader.hidden = false;
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

// Get Horescope from API
async function getMessages(sign) {
    showLoadingSpinner();
    const apiUrl = `https://horoscope-astrology.p.rapidapi.com/horoscope?day=month&sunsign=${sign}`;
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
    const horoscopeData = apiResponse.horoscope;
    showModal(horoscopeData);
    removeLoadingSpinner();
    
    } catch (error) {
    astroText.textContent = "No message available";
    }
}
document.getElementById('apiResponse').innerHTML = JSON.stringify(astroMessage);


// Event Listeners
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
})

// On Load
getMessages();