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
    //console.log(e.key);
        if (e.key === "Escape" || e.key === "Esc"){
            closeModal(e)
        }
    }); 

    
    modalWorks(dataTable);

})//fermeture du Fetch
.catch(error => {
    console.log('error', error);
})

//Fonction qui affiche tous les travaux dans la fenêtre modale
function modalWorks (values) {

    let photosModal = document.querySelector('.photosModal');
    photosModal.innerHTML ='';

    for (let i =  0; i < values.length; i++ ){
        let figure = document.createElement('figure');

        let img = document.createElement('img');    
        img.setAttribute("src", values[i].imageUrl );
        img.classList.add('img-modal');
        
        let categoryId = document.createElement('p');
        categoryId.setAttribute('src', values.categoryId);

        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = 'éditer';

        const deleteWork = document.createElement('i');
        deleteWork.classList.add("fa-solid", "fa-trash-can");
            
//J'intègre à ma première photo le logo déplaçer 
        if (i === 0){
            const moveLogo = document.createElement('i');
            moveLogo.classList.add("fa-solid", "fa-arrows-up-down-left-right");
            figure.appendChild(moveLogo);            }             
        
        figure.append(deleteWork, img, figcaption);               
        photosModal.append(figure);

//Fonction qui supprime le travail en cliquant sur le logo delete
        deleteWork.addEventListener('click', function () {
            deleteProject(values.id);
            //figure.remove()
        })
        
    }    
}


//Je veux supprimer le travail au click pour qu'il ne soit plus visible, par le même biais je veux effacer ce même travail sur mon API 
//puis regénérer les travaux présents sur ma modale sans le travail effacé et regénérer mon index.html sans le travail effacé également

//Function pour supprimer le travail de l'API 
const deleteProject = (id, token = sessionStorage.getItem('token')) => {
    fetch(urlApi + '/' + id, {
        method: "DELETE",
        headers: {
            "Autorization": "Bearer" + token
        },
    })
    .then ((response) => {
        if (response.ok){
            alert("la suppression de l'élémenet a fonctionner")
            retirerElement(id);
            //displayAll(dataTable);
            //displayAllModal(dataTable);

        } else {
            console.error("La suppression de l'élément ne fonctionne pas");
        }
    })
    .catch(error => {
        console.log('error', error);
    });        
}





/**/

//Function qui retire l'élémént id
function retirerElement(id) {
    for (let i = 0; i < dataTable.length; i++){
        console.log (dataTable[i].id)
        if (dataTable[i].id === id){
            dataTable.splice(i, 1);
        }
    }
}




       



/*
            //Suprimer un travail de la modale             
                
                async function deleteWorkById () {

                    //console.log("token", token);            
                
                    const response = await fetch(urlApi + "/" + id, {
                        method: 'DELETE',
                        headers: {
                            "Autorization": "Bearer" + token
                        }
                    });
                    if (!response.ok) {
                        console.log("L'api ne répond pas");
                    }
                    if (response.ok){
                        alert("la suppression de l'élémenet a fonctionner")
                        figureRemove(id);
                    } else {
                        console.error("La suppression de l'élément pose un problème");
                    }
                }
 */                 



/*
fetch(url + "/" + {id} ,  {
    method: "DELETE",
    headers: {
        "Autorization": "Bearer" + token
    },
})
.then ((response) => {
    if (response.ok){                            
        figureRemove();
        alert("la suppression de l'élémenet a fonctionner")
    } else {
        console.error("La suppression de l'élément ne fonctionne pas");                            
    }
})
.catch(error => {
    console.log('error', error);
}); 
*/




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
    if (modal2 === null) return
    e.preventDefault()
    modal2.style.display = 'none';
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')    
    modal2.removeEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-close2').removeEventListener('click', closeModal2)
    modal2.querySelector('.js-modal-stop2').removeEventListener('click', stopPropagation2)
    modal2 = null
}

//Function qui empêche de fermer la modale losque l'on click à l'inrérieur du contenu
const stopPropagation2 = function (e){
    e.stopPropagation()
}

const btnAjouter = document.querySelector('.btnAjouter');

btnAjouter.addEventListener('click', function (){
    //console.log(e)
    openModal2();
    closeModal();
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
const pictureForm = document.getElementById('pictureForm');
const myForm2 = document.getElementById('myForm2');

const profilePicture = document.getElementById('profilePicture');
const inputFile = document.getElementById('input-file');
const labelFile = document.getElementById('labelFile');
const imgSize = document.getElementById('imgSize');

//function qui upload l'image et la fait apparaître dans la modale
inputFile.onchange = function (){
    profilePicture.src = URL.createObjectURL(inputFile.files[0])
    profilePicture.style.width = '129px'; 
    profilePicture.style.height = '169px';
    profilePicture.style.marginTop ='0';
    labelFile.style.background = 'white';       
    labelFile.innerHTML = '';
    imgSize.innerHTML = '';        
}

//Je cible les éléménts du formulaire ajout d'image, messages d'erreur et bouton submit
const btnValider = document.getElementById ('btnValider');
const photoTitle = document.getElementById('photoTitle');
const categoryList = document.getElementById('categoryList');
const uploadPhotoError = document.getElementById('erreur1');
const titleError = document.getElementById('erreur2');
const categoryListError = document.getElementById('erreur3');

//Vérification que les champs du formulaire soient bien rempli
function verif_form(){        
    if (inputFile.value ==""){
        uploadPhotoError.innerText ="Veuillez ajouter une photo";
        return false;
    }     
    if (photoTitle.value ==""){
        titleError.innerText = "Veuillez entrer un titre";        
        return false;
    } else if (photoTitle.value != ""){
        titleError.innerText = "";
    } 
    if (categoryList.value == ""){
        categoryListError.innerText = "Veuillez indiquer une catégorie";
    } else if (categoryList.value != ""){
        categoryListError.innerText = "";
    }  
}

// le formulaire est rempli je veux que le bouton valider soit de couleur bleu
//console.log('pictureForm %o', pictureForm)
//console.log('pictureForm %o', btnValider)
//console.log('myForm2 %o', myForm2)


    
     if ((inputFile.value != "") && (photoTitle.value != "") && (categoryList.value != "")){
        btnValider.style.background = 'blue';
    };

btnValider.addEventListener ('click', function () {    
    verif_form()
});

/*const divModal2 = document.querySelector('.divModal2');

const btnAjout = document.querySelector('.btnAjout');

btnAjout.addEventListener('change', event => {
    console.log('click', btnAjout);
    const files = event.target.files;
    const formData = new FormData();
    formData.append('image', files[0]);

    fetch(url, {
        method: 'POST',
        body:formData,
    })
    .then(response => response.json())
    .then(data =>{
        document.divModal2.style.background = "url,('"+ data.image +"')";
        document.divModal2.style.backgroundSize ='cover';
    })
    .catch(error => {
        console.log('error', error);
    });
});*/
