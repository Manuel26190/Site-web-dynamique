// je stock dans une variable l'url de l'API
const urlApi = 'http://localhost:5678/api/works';

const gallery = document.querySelector('.gallery');

//function pour itérer et afficher les travaux stockés dans l'API
function displayWorks (toto) {
    toto.forEach( value => {
        
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");
    
        img.setAttribute("src", value.imageUrl);
        figcaption.setAttribute("alt", value.title);
        img.setAttribute("crossorigin", "anonymous");
    
        figcaption.innerHTML = value.title;
    
        figure.append(img, figcaption);
        //let figure = cElement(value)
        gallery.append(figure);    
    }
    );    
}; 

/*
const cElement = function (el){
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");

    img.setAttribute("src", el.imageUrl);
    figcaption.setAttribute("alt", el.title);
    img.setAttribute("crossorigin", "anonymous");

    figcaption.innerHTML = el.title;    
    figure.append(img, figcaption);
    return figure;
}
*/

let dataTable = [];//Je crée une constante qui contient un tableau vide

//Appel fetch qui copie les données de l'APÏ dans mon tableau dataTable
fetch(urlApi)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (values) {
        values.forEach(function (element) {
            dataTable.push(element); //je veux stocker dans un tableau la data retournée             
            //cElement(element)//j'appelle une fonction qui crée des éléments dans le DOM 
            //console.log ('element %o',element.id)            
        });

        displayWorks(dataTable);
        
//console.log('values %o', values[0].title)

// Création d'une fonction pour filtrer les objets en fonction du bouton de catégorie cliquer sur le site
    function filterObjets(values, categoryId) {

        let filteredValues;

// Création de l'option "par défaut" pour dire que SI aucune catégorie n'est choisi (en cliquant sur le bouton 'tous'
// alors tout les éléments apparraitront à l'écran)
        if (categoryId.length === 0) {
            filteredValues = values;

        }else{ //Sinon, on filtrera les objets pour afficher seulement ceux dont la catégorie est mentionner au click boutton
            filteredValues = values.filter(value => categoryId.includes(value.categoryId));
            //console.log ('filter value', filteredValues);
        }

// On vide les éléments HTML présent dans Gallery
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

    modalWorks(dataTable);

})//fermeture du Fetch
.catch(error => {
    console.log('error', error);
})
 
//Ouverture de la fenêtre modale

//Variable qui sert à fermer la boite modale
let modal = null;

//Foinction qui cible mes lien href et annule le display block pour faire apparaître la fenêtre modale
const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = 'flex';
    modal.removeAttribute('aria-hidden')
    modal.setAttribute ('aria-modal', 'true')
    modal.addEventListener ('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)  
    
};
 //Fonction qui ferme la modale
const closeModal = function () {    
    if (modal === null) return        
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener ('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)    
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)    
    modal = null    
};

//Function qui empêche de fermer la modale losque l'on click à l'inrérieur du contenu
    const stopPropagation = function (e) {
        e.stopPropagation()
    }

//Création de l'événement au click sur les liens <a> mode édition
    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', openModal)     
    });

//Fermeture de la modale avec l'utilisation de "échap"
    window.addEventListener('keydown', function (e){
    //console.log(e.key);
        if (e.key === "Escape" || e.key === "Esc"){
            closeModal(e)
        }
    }); 

//Fonction qui affiche tous les travaux dans la fenêtre modale
function modalWorks (values) {
    
    let photosModal = document.querySelector('.photosModal');
    photosModal.innerHTML = "";
    
    values.forEach ((value) =>  {
        
        let figure = document.createElement('figure');

        let img = document.createElement('img');    
        img.setAttribute("src", value.imageUrl );
        img.classList.add('img-modal');
        
        let categoryId = document.createElement('p');
        categoryId.setAttribute('src', value.categoryId);

        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = 'éditer';

        const deleteProject = document.createElement('i');
        deleteProject.classList.add("fa-solid", "fa-trash-can");
            
//J'intègre à ma première photo le logo déplaçer 
        if (value.id === 1){
            const moveLogo = document.createElement('i');
            moveLogo.classList.add("fa-solid", "fa-arrows-up-down-left-right");
            figure.appendChild(moveLogo);          
        }             
        
        figure.append(deleteProject, img, figcaption);               
        photosModal.append(figure);        

//Fonction qui supprime le travail en cliquant sur le logo delete
        deleteProject.addEventListener("click", function () {
            deleteWork(value.id);                        
        });        
    });   
}


//Function pour supprimer le travail de l'API 
const deleteWork = (id, token = sessionStorage.getItem("token")) => {

    fetch(urlApi + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("La suppression de l'élément a fonctionner");
          deleteElement(id);          
          modalWorks(dataTable); //itération des travaux de la fénêtre modale
          //displayWorks(dataTable); //itération des travaux de la page d'accueil
        } else {
          console.error("La suppression de l'élément pose un problème, veuillez contacter l'équipe de maintenance du site.", response);
        }
      })
    };

//Function qui retire l'élémént id
function deleteElement(id) {    
    for (let i = 0; i < dataTable.length; i++){
        //console.log ('dataTableId',dataTable[i].id)
        if (dataTable[i].id === id){
            dataTable.splice(i, 1);
        }
    }        
}       

//Création de la Modale 2 ajout de photo

let modal2 = null;

const openModal2 = function () {    
    const target2 = document.querySelector('.modal2');
    target2.style.display = null;
    target2.removeAttribute('aria-hidden')
    target2.setAttribute('aria-modal','true')
    modal2 = target2
    modal2.addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-close2').addEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop2').addEventListener('click', stopPropagation2)
}; 

const closeModal2 = function (e) {
    e.preventDefault();
    if (modal2 === null) return;    
    modal2.style.display = 'none';
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal');    
    modal2.removeEventListener('click', closeModal2);
    modal2.querySelector('.js-modal-close2').removeEventListener('click', closeModal2);
    modal2.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation2);
    modal2 = null;
}

//Function qui empêche de fermer la modale losque l'on click à l'inrérieur du contenu
const stopPropagation2 = function (e){
    e.stopPropagation()
}

const btnAjouter = document.querySelector('.btnAjouter');

//function qui ouvre la modale 2 et ferme la modale 1 au click sur le bouton ajouter une photo
btnAjouter.addEventListener('click', function (){
    //console.log(e)
    closeModal();
    openModal2();    
});

//Fermeture de la modale avec l'utilisation de "échap"
window.addEventListener('keydown', function (e){
    //console.log(e.key);
    if (e.key === "Escape" || e.key === "Esc"){
        closeModal2(e)
    }
});

//ajout photo vers l'API
//Je cible les différents champs du fomulaire ajout d'image 

const profilePicture = document.getElementById('profilePicture');
const inputFile = document.getElementById('input-file');
const labelFile = document.getElementById('labelFile');
const imgSize = document.getElementById('imgSize');

//function qui upload l'image et la fait apparaître dans la modale
inputFile.onchange = function (){
    profilePicture.src = URL.createObjectURL(inputFile.files[0])
    profilePicture.style.width = '129px'; 
    profilePicture.style.height = '169px';             
    labelFile.remove();    
    imgSize.remove();
}


const title = document.getElementById('photoTitle');
const btnValidModal2 = document.getElementById('btnValider');

//Fonction qui vérifie que les champs ajout de photo et titre du formulaire soient bien rempli 
function CheckForm (el, el2, valid){
    if ( el.value !== "" || el2.files.length === 0) {
        valid.disabled = false;
    } else {
        valid.disabled = true;
    }
};

//Fonction qui vérifie si l'utilisateur entre des données dans le champs titre du fomulaire
title.addEventListener("input", () => {
    CheckForm(title, inputFile, btnValidModal2)
});

//Fonction qui vérifie si l'utilisateur entre des données dans le champs ajout d'image du fomulaire
inputFile.addEventListener("input", () => {
    CheckForm(title, inputFile, btnValidModal2)
}); 

const pictureForm = document.getElementById('pictureForm');
 
//function au click du submit du formulaire qui appelle la function sendWork
btnValidModal2.addEventListener('click', function (e) {
    e.preventDefault();       
    SendWork(pictureForm);
    closeModal2();   
    //displayWorks(dataTable);//fonction qui itére les travaux sur la page d'acceuil              
});



//fonction qui récupère les données du formulaire ajout d'image et les envoie vers l'API
const SendWork = (el) => {
    const formData = new FormData(el);    

    const category = document.getElementById('categoryList');

    if (!title.value || !inputFile.files || !category.value) {
        alert("Veuillez remplir toutles les champs du fomrulaire.");
        return;
    }      
    
    token = sessionStorage.getItem("token");    

    fetch('http://localhost:5678/api/works', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
        },           
        body: formData,            
    })    
        .then(function (response){
            if (response.ok){
                //closeModal2();
                alert('Travail correctement envoyé');
                return response.json();
            } else {
                throw new Error ('Réponse négative du serveur');
            }
        })
        .then(function (data) {
            dataTable.push(data);
            //displayWorks(dataTable);
            //modalWorks(dataTable);
        })
        .catch(function (error){
            console.error('error', error);
            alert("Erreur lors de l'ajout de l'élément");
        })
}; 

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
    
//Je cible les éléménts du formulaire ajout d'image, messages d'erreur et bouton submit
/*
const btnValider = document.getElementById ('btnValider');
const photoTitle = document.getElementById('photoTitle');
const categoryList = document.getElementById('categoryList');
const uploadPhotoError = document.getElementById('erreur1');
const titleError = document.getElementById('erreur2');
const categoryListError = document.getElementById('erreur3');

//Vérification que les champs du formulaire soient bien rempli
function verif_form(file, title, cat){        
    if (file.value ==""){
        uploadPhotoError.innerText ="Veuillez ajouter une photo";        
    } else if (file.value != ""){
        uploadPhotoError.innerText = "";
    }     
    if (title.value ==""){
        titleError.innerText = "Veuillez entrer un titre";        
    } else if (title.values != ""){
        titleError.innerText = "";
    } 
    if (cat.value ==""){
        categoryListError.innerText = "Veuillez indiquer une catégorie";
    } else if (cat.value != ""){
        categoryListError.innerText = "";
    }  
}
*/

/*    for (var pair of formData.entries()) {
        console.log("clés %o valeur %o", pair[0], pair[1] )    }

    formData.append('image', inputFile.files[0] );
    formData.append('title', photoTitle.value);
    formData.append('category', categoryList.value); */ 