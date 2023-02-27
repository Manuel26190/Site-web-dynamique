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

    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = article.title;    
    
    fiches.appendChild(img);
    fiches.appendChild(figcaption);
    gallery.appendChild(fiches);
    }

    //Trier et filtrer //
    //filtre Objets          
    const boutonObjets = document.querySelector('#btnObjets');
    boutonObjets.addEventListener('click', function () {
        const projetsFiltres = data
        .filter (function (data) {
            return data.categoryId == 1;
        })
        .map(
            (elt) => `<figure>
            <img src =${elt.imageUrl} alt=${elt.title}>
            <figcaption> ${elt.title}</figcaption>
        </figure>`
        );
    gallery.innerHTML = projetsFiltres;        
           
    });

//filtre Appartements
    const boutonAppartements = document.querySelector('#btnAppartements');
    boutonAppartements.addEventListener('click', function () {
        const projetsFiltres = data
        .filter (function (data) {
            return data.categoryId == 2;
        })
        .map(
            (elt) => `<figure>
            <img src =${elt.imageUrl} alt=${elt.title}>
            <figcaption> ${elt.title}</figcaption>
        </figure>`
        );
    gallery.innerHTML = projetsFiltres;        
    })  
//filtre Hôtels et restaurants
    const boutonHotels = document.querySelector('#btnHotels');
    boutonHotels.addEventListener('click', function () {
        const projetsFiltres = data
        .filter (function (data) {
            return data.categoryId == 3;
        })
        .map(
            (elt) => `<figure>
            <img src =${elt.imageUrl} alt=${elt.title}>
            <figcaption> ${elt.title}</figcaption>
        </figure>`
        );
    gallery.innerHTML = projetsFiltres;        
    })
//filtres Tous
    const boutonTous = document.querySelector('#btnTous');
    boutonTous.addEventListener('click', function () {
        const projetsFiltres = data
        .filter (function (data) {
            return data;
        })
        .map(
            (elt) => `<figure>
            <img src =${elt.imageUrl} alt=${elt.title}>
            <figcaption> ${elt.title}</figcaption>
        </figure>`
        );
    gallery.innerHTML = projetsFiltres;        
    })
    
})




    
 