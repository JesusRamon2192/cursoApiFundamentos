console.log('Hello world');

const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=236';

/* fetch(API_URL)
    .then(res => res.json())
    .then(data => {
    const img = document.querySelector('img');
    img.src = data[0].url;})
 */
const input1 = document.getElementById('img1');
const input2 = document.getElementById('img2');
const input3 = document.getElementById('img3');

async function getDog(){
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log(data);
    input1.src = data[0].url;
    input2.src = data[1].url;
    input3.src = data[2].url;

}

getDog();