const API_URL = 'https://api.thedogapi.com/v1/';


const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T';


const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?limit=2&api_key=live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T';


const API_KEY = 'live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T';


const spanError = document.getElementById('error');
//Clave priv 1530013163d257c659eb7f168cfcdc49909bd6ff3a00003a2ae815a80abb93c18d5772340


/* fetch(API_URL)
    .then(res => res.json())
    .then(data => {
    const img = document.querySelector('img');
    img.src = data[0].url;})
 */


async function loadRandomDogs() {
    const response = await fetch(`${API_URL}images/search?limit=30`);
    const data = await response.json();
    console.log('Random');
    console.log(data);
    
    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
    
        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouritesDog(data[0].id);
        btn2.onclick = () => saveFavouritesDog(data[1].id);
    }


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


async function loadFavoritesDogs() {
    const response = await fetch(`${API_URL}favourites?limit=100&api_key=${API_KEY}`);
    const data = await response.json();
    console.log('Favorites');
    console.log(data);


    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status;
    } else {
        const section = document.getElementById('favorites');
        const toRender = [];

        data.forEach( dog => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');

            btn.appendChild(btnText);
            img.src = dog.image.url;
            img.width = 150;
            article.append(img, btn);
            toRender.push(article);
        })
        section.append(...toRender);
    }
    
}


async function saveFavouritesDog(id) {
    const res = await fetch(`${API_URL}favourites?api_key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = res.json();
    console.log('Saved');
    console.log(res);


    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } 
}


loadRandomDogs();
loadFavoritesDogs();
