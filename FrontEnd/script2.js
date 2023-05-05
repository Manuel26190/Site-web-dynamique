const urlApi = 'http://localhost:5678/api/works';

const gallery = document.querySelector('.gallery');

//Function pour itérer et afficher sur la page d'accueil les travaux stockés par l'API
function displayWorks (el) {    
   
    gallery.innerHTML = "";

    el.forEach((value) => {
        
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

let dataTable = [];//Je crée une varaiable qui contient un tableau vide dans laquelle je vais stocker les données récupérées de l'API grâce à ma request fetch

//Appel fetch qui copie les données de l'API dans mon tableau dataTable
fetch(urlApi)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function (values) {
        values.forEach(function (element) {
            dataTable.push(element); //je stocke dans le tableau la data retournée                       
        });
        displayWorks(values);//J'appelle ma fonction displayWork qui itère les travaux sur la page d'accueil        

        //Je filtres mes travaux selon leur categoryId en utilisasant la method filter()
        values.forEach(value => {
            const btnTous = document.getElementById('btnTous');           
            btnTous.addEventListener('click', function (){//Function qui au click sur le bouton "Tous" filtre les travaux selon leur categoryId
                const filtreTous = values.filter(function (value) {
                    return value.categoryId == 1,2,3;                   
                });                
                displayWorks(filtreTous);//Fonction qui itère tous les travaux(car categoryId 1,2 et 3) sur la page d'accueil                
            });
            const btnObjets = document.getElementById('btnObjets');           
            btnObjets.addEventListener('click', function (){//Function qui au click sur le bouton "Objets" filtre les travaux selon leur categoryId
                const filtreObjets = values.filter(function (value) {
                    return value.categoryId == 1;                   
                });                
                displayWorks(filtreObjets);//Fonction qui itère seulement les travaux "Objets" ayant la categoryId = 1               
            });
            const btnAppartement = document.getElementById('btnAppartements');           
            btnAppartement.addEventListener('click', function (){//Function qui au click sur le bouton "Appartement" filtre les travaux selon leur categoryId
                const filtreAppartements = values.filter(function (value) {
                    return value.categoryId == 2;                   
                });                
                displayWorks(filtreAppartements);//Fonction qui itère seulement les travaux "Appartements" ayant la categoryId = 2               
            });
            const btnHotels = document.getElementById('btnHotels');           
            btnHotels.addEventListener('click', function (){//Function qui au click sur le bouton "Hôtels & restaurants" filtre les travaux selon leur categoryId
                const filtreHotels = values.filter(function (value) {
                    return value.categoryId == 3;                   
                });                
                displayWorks(filtreHotels);//Fonction qui itère seulement les travaux "Hôtels & restaurants" ayant la categoryId = 3               
            });
        })

//Apparition du mode edition
let token = sessionStorage.getItem("token");

    if (token) {  
        const modalLinks = document.querySelectorAll(".js-modal");       
        
        modalLinks.forEach((link)=> {
            link.style.display ='flex';
        });    
    };
    modalWorks(dataTable);
})
.catch(error => {
    console.log('error', error);
})
 
//Ouverture de la fenêtre modale
let modal = null;//Variable qui sert à fermer la boite modale

//Fonction qui cible mes lien href et annule le display block pour faire apparaître la fenêtre modale
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
        deleteProject.addEventListener("click", function (e) {
            e.preventDefault();
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
          deleteElement(id); //Function qui retire l'élémént id         
          modalWorks(dataTable); //itération des travaux de la fénêtre modale
          
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
//Fonction qui ouvre la modale 2
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
//Fonction qui ferme la modale 2
const closeModal2 = function () {    
    if (modal2 === null) return;    
    modal2.style.display = 'none';
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal');    
    modal2.removeEventListener('click', closeModal2);
    modal2.querySelector('.js-modal-close2').removeEventListener('click', closeModal2);
    modal2.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation2);
    modal2 = null;
};

//Function qui empêche de fermer la modale losque l'on click à l'inrérieur du contenu
const stopPropagation2 = function (e){
    e.stopPropagation()
}

const btnAjouter = document.querySelector('.btnAjouter');

//function qui ouvre la modale 2 et ferme la modale 1 au click sur le bouton ajouter une photo
btnAjouter.addEventListener('click', function (){    
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

//Ajout du fichier photo vers l'API
//Je cible les différents champs du fomulaire ajout d'image 
const profilePicture = document.getElementById('profilePicture');
const inputFile = document.getElementById('input-file');
const labelFile = document.getElementById('labelFile');
const imgSize = document.getElementById('imgSize');

//function qui upload le fichier image du formulaire et la fait apparaître dans la modale remplaçant le logo image
inputFile.onchange = function (){
    profilePicture.src = URL.createObjectURL(inputFile.files[0])
    profilePicture.style.width = '129px'; 
    profilePicture.style.height = '169px';             
    labelFile.remove();    
    imgSize.remove();
}

const title = document.getElementById('photoTitle');
const btnValidModal2 = document.getElementById('btnValider');

//Fonction qui vérifie que les champs ajout de photo et titre du formulaire soient bien rempli et active le bouton submit 
function CheckForm (el, el2, valid){
    if ( el.value !== "" || el2.files.length === 0) {
        valid.disabled = false;
    } else {
        valid.disabled = true;
    }
};

//Fonction qui vérifie si l'utilisateur entre des données dans le champs "titre" du formulaire
title.addEventListener("input", () => {
    CheckForm(title, inputFile, btnValidModal2)
});

//Fonction qui vérifie si l'utilisateur entre des données dans le champs "ajout d'image" du formulaire
inputFile.addEventListener("input", () => {
    CheckForm(title, inputFile, btnValidModal2)
}); 

const pictureForm = document.getElementById('pictureForm');
 
//function au click du submit du formulaire qui appelle la function sendWork et closeMoadal2
btnValidModal2.addEventListener('click', function (e) {
    e.preventDefault();       
    SendWork(pictureForm);//Fonction qui récupère les données du formulaire ajout d'image et les envoie vers l'API
    closeModal2();//Fonction qui ferme la modale 2 ajout d'image                  
});

//fonction qui récupère les données du formulaire ajout d'image et les envoie vers l'API
const SendWork = (el) => {
    const formData = new FormData(el); //Création de l'objet formData qui récupère les valeurs du formulaire    

    const category = document.getElementById('categoryList');
//Vérification que tous les champs du formulaire soient remplis
    if (!title.value || !inputFile.files || !category.value) { 
        alert("Veuillez remplir tous les les champs du fomrulaire.");
        return;
    }        

    fetch(urlApi, {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem("token"),
        },           
        body: formData,            
    })    
        .then(function (response){
            if (response.ok){                
                alert('Projet envoyé');
                return response.json();
            } else {
                throw new Error ('Réponse négative du serveur');
            }
        })
        .then(function (data) {
            dataTable.push(data); //Ajout du projet à mon tableau dataTable
            displayWorks(dataTable); //Function qui itère les travaux sur la page d'accueil
            modalWorks(dataTable); //Fonction qui itère les travaux sur la modale
        })
        .catch(function (error){
            console.error('error', error);
            alert("Erreur lors de l'ajout de l'élément");
        })
}; 


