const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalLoadedImages = 0;
let count = 5;
const apiKey = '28J4POCbLHRSn1dUf3MIRV4jjCQ09c5o_G3KylgGjUI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded:
function imageLoaded() {
    imagesLoaded++
    if(imagesLoaded === totalLoadedImages) {
        ready = true;
        loader.hidden = true;
        count = 30
    }
}

function setAttribute(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Element for links and photos, Add to DOM
function displayPhotos() {
    totalLoadedImages = photosArray.length
    imagesLoaded = 0
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // Put img inside a and add both to our imageContainer
        img.addEventListener('load', imageLoaded)
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
    
}


// Get random photos from Unsplash api
async function getPhoto() {
    try {
        const response = await fetch(apiUrl); 
        photosArray = await response.json();
        displayPhotos();  
    }
    catch (error) {
    }
};

window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhoto();
    }

})

getPhoto();