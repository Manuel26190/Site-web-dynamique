const gallery = document.querySelector('.gallery');

//fetch qui envoi une demande à l'API//
fetch('http://localhost:5678/api/works')
.then ((response) => response.json())

//function qui génére les fiches projets//
.then ((data) => {
for (let i = 0; i < data.length; i++) {   
    const article = data[i]; 

    const fiches = document.createElement("fiches");

    const img = document.createElement("img");
    img.innerHTML = img.src = data[i].imageUrl;

    const figcaption =document.createElement("figcaption");
    figcaption.innerHTML = article.title;    
    
    fiches.appendChild(img);
    fiches.appendChild(figcaption);
    gallery.appendChild(fiches);
    }     
} )


    