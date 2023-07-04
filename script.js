const astroContainer = document.getElementById('astro-container');
const astroText = document.getElementById('message');
const newAstroBtn = document.getElementById('new-message');
const loader = document.getElementById('loader');
const apiResponseContainer = document.getElementById('apiResponse');


let astroMessages = [];

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
    // Check if astroMessages array is empty or undefined
    if (astroMessages && astroMessages.length > 0) {
        // pick a random sign
        const message = astroMessages[Math.floor(Math.random() * astroMessages.length)];
        // Set Quote, Hide Loader
        astroText.textContent = message.text;
    }
    removeLoadingSpinner();
}


// Get Quotes from API
async function getMessages() {
    showLoadingSpinner();
    const apiUrl = 'https://horoscope-astrology.p.rapidapi.com/affinity?sign1=Libra&sign2=Aries';
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8e867b7743msh28ac5e34ec4bd13p1a0628jsncb88b58e606e',
		'X-RapidAPI-Host': 'horoscope-astrology.p.rapidapi.com'
	}
};

try {
    const response = await fetch(apiUrl, options);
        astroMessages = await response.json(); // Store response data in astroMessages
        apiResponseContainer.textContent = JSON.stringify(astroMessages); // Display API response in the container
        console.log(astroMessages);
        newMessage(); // Call newMessage after populating astroMessages
    } catch (error) {
        console.log(error);
    }
//     const apiResponse = await response.json();
//     console.log(apiResponse);
//     if (response) {
//         removeLoadingSpinner();
//     }
//     newMessage();
// } catch (error) {
// 	console.log(error);
// }
}
// function show(data) {
//     let signs =
//     `<ul>
//     <li>Aries<li>
//     <li>Taurus<li>
//     <li>Gemini<li>
//     <li>Cancer<li>
//     <li>Leo<li>
//     <li>Virgo<li>
//     <li>Libra<li>
//     <li>Scorpio<li>
//     <li>Sagitarius<li>
//     <li>Capricorn<li>
//     <li>Aquarius<li>
//     <li>Pisces<li>
//     </ul>`;
//     // Loop to access all signs
//     for (let signs of data.list) {
//         signs +=`<ul>
//         <li>${signs.Aries}</li>
//         </ul>`;
//     }
    document.getElementById("apiResponse").innerHTML = JSON.stringify(apiResponse);



// Event Listeners
newAstroBtn.addEventListener('click', newMessage);

// On Load
getMessages();