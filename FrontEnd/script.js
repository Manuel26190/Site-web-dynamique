//Je cible l'élément gallery de ma page HTML
const gallery = document.querySelector('.gallery');
 
const url = 'http://localhost:5678/api/works';


//fetch qui envoi une demande à l'API//
fetch(url)
    //transformation des values en JSON
    .then ((response) => response.json())   
    //function qui génére les fiches projets//
    .then ((values) => {
        let debug = false;
        if (debug === true){
            console.log('entrée dans la fonction fetch');
        }
//


    //console.log(values[0].title);
    for (let i = 0; i < values.length; i++) {   
        
        //console.log(article.categoryId == 2); 

        const fiches = document.createElement("fiches");

        const img = document.createElement("img");
        img.innerHTML = img.src = values[i].imageUrl;

        const figcaption = document.createElement("figcaption");
        figcaption.innerHTML = values[i].title;    
    
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
            console.log ('filter value', filteredValues);
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
    
})
.catch(error => {
    console.log('error', error);
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

//Appel API pour intégrer les photos dans la modale

//je selectionne mon élément Div photos Moadal dans mon HTML
const photosModal = document.querySelector('.photosModal');
//console.log(photosModal); 

//fetch qui envoi une demande à l'API//
fetch(url)
//transformation des values en JSON
.then ((response) => response.json())
//function qui génére les fiches projets//
.then ((values) =>  {      
    
    const insertPicture = function (){
        
        for (let i = 0; i < values.length; i++) {       

            const figure = document.createElement('figure');    
    
            const img = document.createElement('img');    
            img.setAttribute("src", values[i].imageUrl );
            img.classList.add('img-modal');        
    
            const figcaption = document.createElement('figcaption');
            figcaption.innerHTML = 'éditer';
    
            const deleteWork = document.createElement('i');
            deleteWork.classList.add("fa-solid", "fa-trash-can");
    
            /*--categoryId = document.createElement("p");
            categoryId.setAttribute("src", values.categoryId);--*/              
        
            if (i === 0){
                const moveLogo = document.createElement('i');
                moveLogo.classList.add("fa-solid", "fa-arrows-up-down-left-right");
                figure.appendChild(moveLogo);
            }             
            
            figure.append(deleteWork);
            figure.append(img);
            figure.appendChild(figcaption);    
            photosModal.append(figure);

            //console.log('token',token);

            const figureRemove = function () {
                /*forEach(figure =>  {
                    figure.setAttribute('id', values.id);
                })*/
                figure.remove()
            };   
                      
            //console.log('url', url);            

            //Suprimer un travail de la modale 
            deleteWork.addEventListener('click', function (){
                //console.log("token", token);
                    fetch(url + "/" + id,  {
                        method: "DELETE",
                        headers: {
                            "Autorization": "Bearer" + token
                        },
                    })
                    .then ((response) => {
                        if (response.ok){
                            alert("la suppression de l'élémenet a fonctionner")
                            figureRemove();
                        } else {
                            console.error("La suppression de l'élément pose un problème");
                            //figureRemove();
                        }
                    })
                    .catch(error => {
                        console.log('error', error);
                    });                
            })//Fermeture du Fetch Delete
        }//Fermeture de la boucle for  
    };//Fermeture de la function insertPicture
    insertPicture();
       
});

//console.log('token', token)


/*deleteWork.addEventListener('click', function (){
    const deleteProject = (id, token = sessionStorage.getItem('token')) => {
        fetch(url + '/' + {id} , {
            method: "DELETE",
            headers: {
                "Autorization": "Bearer" + token
            }
        })
        .then ((response) => {
            if (response.ok){
                alert("la suppression de l'élémenet a fonctionner")
                figureRemove(id);
            } else {
                console.error("La suppression de l'élément pose un problème");
            }
        })
        .catch(error => {
            console.log('error', error);
        });        
    }
})*/ 

//Modale 2 ajout photo

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
//console.log(btnAjouter)

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

let profilePicture = document.getElementById('profilePicture');
let inputFile = document.getElementById('input-file');
let labelFile = document.getElementById('labelFile');
let imgSize = document.getElementById('imgSize');
//let pictureForm = document.getElementById('pictureForm');

inputFile.onchange = function (){
    profilePicture.src = URL.createObjectURL(inputFile.files[0])
    profilePicture.style.width = '129px'; 
    profilePicture.style.height = '169px';
    profilePicture.style.marginTop ='0';
    labelFile.style.background = 'white';       
    labelFile.innerHTML = '';
    imgSize.innerHTML = '';
        
}


let btnValider = document.getElementById ('btnValider');
let uploadPhotoError = document.getElementById('erreur1');
let titleError = document.getElementById('erreur2');
let categoryListError = document.getElementById('erreur3');
//console.log('caterror %o', categoryListError)

//Vérification que les champs du formulaire soient bien rempli
function verif_form(){        
    if (inputFile.value ==""){
        uploadPhotoError.innerText ="Veuillez ajouter une photo";
        return false;
    }     
    if (document.getElementById('photoTitle').value ==""){
        titleError.innerText = "Veuillez entrer un titre";        
        return false;
    } else if (document.getElementById('photoTitle').value != ""){
        titleError.innerText = "";
    } 
    if (document.getElementById('categoryList').value == ""){
        categoryListError.innerText = "Veuillez indiquer une catégorie";
    } else if (document.getElementById('categoryList').value != ""){
        categoryListError.innerText = "";
    }  
}

// le formulaire est rempli je veux que le bouton valider soit de couleur bleu


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
