function addData() {
    const title = document.getElementById('photoTitle').value;
    const imageUrl = document.getElementById('input-file').files[0];
    const select = document.getElementById('categoryList');
    //const options = select.options;
    const categoryIds = {
        "1": 1,
        "2": 2,
        "3": 3
    }

    //const categoryId = categoryIds[options[select.selectedIndex].value];

    if (!title || !imageUrl || !select) {
     alert('Veuillez remplir tout les champs du formulaire');
     }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('image', imageUrl);
    formData.append('category', select.value);

    for (var pair of formData.entries()) {
        console.log("clés %o valeur %o", pair[0], pair[1] )    
    }

    let token = sessionStorage.getItem("token");


    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer" + token
        },
        body: formData
})
    .then(function (response){
        if (response.ok) {
            //closeModal2();
            alert("L'ajout du nouveau projet a fonctionné");
            return response.json();        
        } else {
            throw new Error("Réponse négative du serveur");
        }
    })
    .then(function () {
        //dataTable.push(data);
        //displayWorks(dataTable);
        //modalWorks(dataTable);
    })
    .catch(function (error) {
     console.error("Error adding data", error);
        alert("Une erreur est survenue lors de l'ajout des éléments. Veuillez réessayer ou joindre l'équipe si le problème perciste." )
    });
};

const btnValidModal2 = document.getElementById('btnValider');
    

    btnValidModal2.addEventListener('click', function (event) {
        event.preventDefault();
        addData();
        
    });


//Je cible les différents champs du fomulaire ajout d'image 
const pictureForm = document.getElementById('pictureForm');
const profilePicture = document.getElementById('profilePicture');
const inputFile = document.getElementById('input-file');
const labelFile = document.getElementById('labelFile');
const imgSize = document.getElementById('imgSize');

//function qui upload l'image et la fait apparaître dans la modale
inputFile.onchange = function (){
    profilePicture.src = URL.createObjectURL(inputFile.files[0])
    profilePicture.style.width = '129px'; 
    profilePicture.style.height = '169px';
    //profilePicture.style.marginTop ='28px'; 
    inputFile.innerHTML = "";          
    labelFile.innerHTML = "";    
    imgSize.innerHTML = "";
}
