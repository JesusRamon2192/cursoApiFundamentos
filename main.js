const API_URL = 'https://api.thedogapi.com/v1/';
const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T';
const API_URL_FAVOURITES = 'https://api.thedogapi.com/v1/favourites?limit=2&api_key=live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T';
const API_URL_FAVOURITES_DELETE = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_KEY = 'live_tBR1gbQC08HCpF8Zv1YGZKdaCvOBOBZiDo2ANdzVqYPbtRgTMFJUNALClJxUdT1T';


const apiAxios = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers: {'X-API-KEY': API_KEY}
});


//apiAxios.defaults.headers.common['X-API-KEY'] = API_KEY;
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
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;




        btn1.onclick = () => saveFavouritesDog(data[0].id);
        btn2.onclick = () => saveFavouritesDog(data[1].id);
        btn3.onclick = () => saveFavouritesDog(data[2].id);
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
    const response = await fetch(`${API_URL}favourites?limit=100`, {
        method: 'GET',
        headers: {
            'X-API-KEY': `${API_KEY}`
        }
    });
    console.log('Favorites');
    




    if (response.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + response.status;
    } else {
        const data = await response.json();
        console.log(data);
        const section = document.getElementById('favorites');
        const toRender = [];
        section.innerHTML = "";
        /* const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favorites Dogs');
        section.appendChild(h2);
        h2.appendChild(h2Text); */
        data.forEach( dog => {
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al dog de favoritos');




            btn.appendChild(btnText);
            btn.onclick = () => deleteFavorite(dog.id);
            img.src = dog.image.url;
            img.width = 150;
            article.append(img, btn);
            toRender.push(article);
        })
        section.append(...toRender);
    }  
}


async function saveFavouritesDog(id) {
    const { data, status } = await apiAxios.post('/favourites', {
        image_id: id
    });


    /* const res = await fetch(`${API_URL}favourites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${API_KEY}`
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = res.json(); */
    console.log('Saved');
    console.log(data);




    if (status !== 200) {
        spanError.innerHTML = "Hubo un error: " + status + data.message;
    } else {
        console.log('Dog guardado');
    }
    loadFavoritesDogs();
}




async function deleteFavorite(id) {
    const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': `${API_KEY}`
        }
    })
    //const data = await res.json();
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status/*  + data.message */;
    } else {
        console.log('Dog Eliminado');
    }
    loadFavoritesDogs();
}

async function uploadDogPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const res = await fetch(`${API_URL}images/upload`, {
        method: 'POST',
        headers: {
            //'Content-Type': 'multipart/form-data',
            'X-API-KEY': `${API_KEY}`
        },
        body: formData,
    });
    if (res.status !== 200 && res.status !== 201) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const data = await res.json();
        console.log('Dog upload');
        console.log({ data });
        console.log(data.url);
        saveFavouritesDog(data.id);
    }
}

function previewImage(){
    const img = document.querySelector('#imagePreview');
    img.style.display="flex"
    const reader = new FileReader();
    const filePreview = document.querySelector('#file').files[0];
    console.log(filePreview);
    reader.addEventListener('load', () => {
        img.src = reader.result;
    }, false);
    if(filePreview) {
        reader.readAsDataURL(filePreview)
        console.log(reader);
    }
}
loadRandomDogs();
loadFavoritesDogs();
