const gallery = document.querySelector('.gallery');

//Récupération des pièces eventuellement stockées dans le localStorage
//let values = window.localStorage.getItem('values');

//if (values === null){

    //const valeurValues = JSON.stringify(values);

    //stockage des informations dans le localStorage
    //window.localStorage.setItem("response", valeurValues);

//}else{
    //values = JSON.parse(values);
//};
    
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

//Envoi du formulaire Login




const myForm = document.getElementById('myForm');



myForm.addEventListener('submit', function (e){
    let myInputEmail = document.getElementById('eMail');
    let myInputMdp = document.getElementById('mdp');
    
    let eMailValue = 'sophie.bluel@test.tld';
    let mdpValue = 'S0phie';

    if (myInputEmail !== 'sophie.bluel@test.tld' && myInputMdp !== 'S0phie') {        
        alert ('Erreur dans l’identifiant ou le mot de passe');
    } else 
    {

    }
 e.stopPropagation();         
});

//"email": "sophie.bluel@test.tld",
//"password": "S0phie"







    
 