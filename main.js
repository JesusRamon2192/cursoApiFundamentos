console.log('Hello world');

/* Here's your API key:

live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T

Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g. 'api_key=live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T' */

const API_URL = 'https://api.thedogapi.com/v1/images/search?limit=3&api_key=live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T';

/* const API_URL = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&limit=100&apikey=a00003a2ae815a80abb93c18d5772340&hash=7ec63277d684a0e5222b1f195f89eeb9'; */
const container = document.querySelector('#marvel-row')
let contentHTML = '';

//Clave priv 1530013163d257c659eb7f168cfcdc49909bd6ff3a00003a2ae815a80abb93c18d5772340

/* fetch(API_URL)
    .then(res => res.json())
    .then(data => {
    const img = document.querySelector('img');
    img.src = data[0].url;})
 */

async function reload() {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    console.log(data[0].url);
    
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url

    /* for (const hero of data.data.results){
        let urlHero = hero.urls[0].url;
        contentHTML = `
        <div class="col-md-4">
            <a href="${urlHero}" target="_blank">
                <img width= 250 src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
            </a>
            <h3 class="title">${hero.name}</h3>
        </div>`;
        container.innerHTML += contentHTML;
    } */

}

reload();