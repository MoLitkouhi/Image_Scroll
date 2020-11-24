
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let photosArray = [];
const count = 10;
const apiKey = '28J4POCbLHRSn1dUf3MIRV4jjCQ09c5o_G3KylgGjUI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Create Element for links and photos, Add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        // Put img inside a and add both to our imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
    
}


// Get random photos from Unsplash api
async function getPhoto() {
    try {
        const response = await fetch(apiUrl); 
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();  
    }
    catch (error) {

    }
};

getPhoto();