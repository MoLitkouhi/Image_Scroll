
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalLoadedImages = 0;
const count = 30;
const apiKey = '28J4POCbLHRSn1dUf3MIRV4jjCQ09c5o_G3KylgGjUI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


function setAttribute(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
} 

// Check if all images were loaded:
function imageLoaded() {
    console.log("image Load")
    imagesLoaded++
    if(imagesLoaded === totalLoadedImages) {
        ready = true;
        console.log('ready= ', ready)
    }
}


// Create Element for links and photos, Add to DOM
function displayPhotos() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank'
        })
        // item.setAttribute('href', photo.links.html);
         // item.setAttribute('target', '_blank');

        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })

        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        // Put img inside a and add both to our imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
        img.addEventListener('load', imageLoaded)

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
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000){
        // console.log('Wi= ', window.innerHeight);
        // console.log('WSY= ', window.scrollY);
        // console.log('WiSi= ', window.innerHeight + window.scrollY);
        // console.log('doc.b.off - 1000= ', document.body.offsetHeight - 1000);
    }

})

getPhoto();