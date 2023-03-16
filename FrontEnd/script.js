//Je cible l'élément gallery de ma page HTML
const gallery = document.querySelector('.gallery');
    
//fetch qui envoi une demande à l'API//
    fetch('http://localhost:5678/api/works')
    //transformation des values en JSON
    .then ((response) => response.json())
    //function qui génére les fiches projets//
    .then ((values) => {
    //console.log(data[0].title);
    for (let i = 0; i < values.length; i++) {   
        const article = values[i];
        //console.log(article.categoryId == 2); 

        const fiches = document.createElement("fiches");

        const img = document.createElement("img");
        img.innerHTML = img.src = values[i].imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = article.title;    
    
        fiches.appendChild(img);
        fiches.appendChild(figcaption);
        gallery.appendChild(fiches);
    }

    // Création d'une fonction pour filtrer les objets en fonction du bouton de catégorie cliquer sur le site
    function filterObjets(values, categoryId) {

        let filteredValues;

// Création de l'option "par défaut" pour dire que SI aucune catégorie n'est choisi (en cliquant sur le bouton 'tous'
// alors tout les éléments apparraitront à l'écran)
        if (categoryId.length === 0) {
            filteredValues = values;

        }else{ //Sinon, on filtrera les objets pour afficher seulement ceux dont la catégorie est mentionner au click boutton
            filteredValues = values.filter(value => categoryId.includes(value.categoryId));
        }

// On vide les éléments HTML présent dans Gallery
        let gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";

// Itération sur les objets filtrés pour créer les éléments HTML ci-joints
        filteredValues.forEach( value => {

        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");

        img.setAttribute("src", value.imageUrl);
        figcaption.setAttribute("alt", value.title);
        img.setAttribute("crossorigin", "anonymous");

        figcaption.innerHTML = value.title;

        figure.append(img, figcaption);
        gallery.append(figure);

});
}
// Création d'événements "au click" sur différent bouton pour filtrer les éléments selon leur catégorie (bouton) séléctionné
    const noFilter = document.querySelector("#btnTous");
    noFilter.addEventListener("click", function() {
    filterObjets(values, []);
});

    const boutonObjets1 = document.querySelector("#btnObjets");
    boutonObjets1.addEventListener("click", function() {
    filterObjets(values, [1]);
});

    const boutonObjets2 = document.querySelector("#btnAppartements");
    boutonObjets2.addEventListener("click", function() {
    filterObjets(values, [2]);
});

    const boutonObjets3 = document.querySelector("#btnHotels");
    boutonObjets3.addEventListener("click", function() {
    filterObjets(values, [3]);
});     
    
});

//Apparition du mode edition
let token = sessionStorage.getItem("token");
//console.log(token);

    if (token) {  
        const modalLinks = document.querySelectorAll(".js-modal");
        //console.log('modal links %o', modalLinks);
        
        modalLinks.forEach((link)=> {
            link.style.display ='flex';
        });    
    };
 
//Ouverture de la fenêtre modale

//Variable qui sert à fermer la boite modale
let modal = null;

//Foinction qui cible mes lien href et annule le display block pour faire apparaître la fenêtre modale
const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector (e.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute('aria-hidden')
    modal.setAttribute ('aria-modal', 'true')
    modal.addEventListener ('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)  
    
};
 //Fonction qui ferme la modale
const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()    
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute ('aria-modal')
    modal.removeEventListener ('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)    
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)    
    modal = null    
    
}

//Function qui empêche de fermer la modale losque l'on click à l'inrérieur du contenu
const stopPropagation = function (e) {
    e.stopPropagation()
}

//Création de l'événement au click sur les lien <a>
document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)     
});

//Fermeture de la modale avec l'utilisation de "échap"
window.addEventListener('keydown', function (e){
    console.log(e.key);
    if (e.key === "Escape" || e.key === "Esc"){
        closeModal(e)
    }
})


 