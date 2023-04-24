const imageUrl = document.getElementById('input-file');
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
    CheckForm(title, imageUrl, btnValidModal2)
});

//Fonction qui vérifie si l'utilisateur entre des données dans le champs ajout d'image du fomulaire
imageUrl.addEventListener("input", () => {
    CheckForm(title, imageUrl, btnValidModal2)
}); 

const formEl = document.getElementById('pictureForm');

//Fonction qui vérifie que les tout champs du fomulaire soient bien rempli 
//et qui envoie les donnéées du formulaire vers l'API au click du bouton valider
formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    const category = document.getElementById('categoryList');

    if (!title.value || !imageUrl.files || !category.value) {
        alert("Veuillez remplir toutles les champs du fomrulaire.");
        return;
    }    

    const formData = new FormData();
    formData.append('image-file', imageUrl.files[0]);
    formData.append('title', title.value);
    formData.append('category', category.value);

    //const data = new URLSearchParams(formData);
    //let dataObj = Object.fromEntries(formData);

    let apiObj = {
        "id": 0,
        "title": "Bar New-York",
        "imageUrl": "string",
        "categoryId": "Objets",
        "userId": 0
      };

    for (let entry of formData) {
        console.log(entry);
    }

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': 'bearer' + sessionStorage.getItem("token"),
        },
        body: formData
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));      
});

//function qui upload l'image et la fait apparaître dans la modale
imageUrl.onchange = function (){

    const profilePicture = document.getElementById('profilePicture');    
    const labelFile = document.getElementById('labelFile');
    const imgSize = document.getElementById('imgSize');

    profilePicture.src = URL.createObjectURL(imageUrl.files[0])
    profilePicture.style.width = '129px'; 
    profilePicture.style.height = '169px';    
    imageUrl.remove();          
    labelFile.remove();    
    imgSize.remove();
};