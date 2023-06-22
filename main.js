console.log('Hello world');

const URL = 'https://api.thecatapi.com/v1/images/search';

fetch(URL)
    .then(res => res.json())
    .then(data => {
    const img = document.querySelector('img');
    img.src = data[0].url;})

const input = document.querySelector('input');
input.onclick = getDog;

async function getDog(){
    const response = await fetch(URL);
    const data = await response.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
}
