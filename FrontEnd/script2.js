let dataTable2 = [];


fetch('http://localhost:5678/api/works/id')
    .then(res => res.json ())
    .then(function (values) {
        //console.log ('values', values)
        values.forEach(function (element) {
            dataTable2.push(element); //je veux stocker dans un tableau la data retournée             
        });
    });

    
//console.log('dataTable 2', dataTable2)
//console.log('dataTable2 ligne 1 ', dataTable2)


//Fonction qui affiche tous les travaux dans la fenêtre modale
function modalWorks (values) {

    let photosModal = document.querySelector('.photosModal');
    photosModal.innerHTML ='';

    values.forEach ( function (values){
        let figure = document.createElement('figure');

        let img = document.createElement('img');    
        img.setAttribute("src", values.imageUrl );
        img.classList.add('img-modal');
        
        let categoryId = document.createElement('p');
        categoryId.setAttribute('src', values.categoryId);

        let figcaption = document.createElement('figcaption');
        figcaption.innerHTML = 'éditer';

        const deleteProject = document.createElement('i');
        deleteProject.classList.add("fa-solid", "fa-trash-can");
            
//J'intègre à ma première photo le logo déplaçer 
        //if (i === 0){
           // const moveLogo = document.createElement('i');
            //moveLogo.classList.add("fa-solid", "fa-arrows-up-down-left-right");
            //figure.appendChild(moveLogo);            }             
        
        figure.append(deleteProject, img, figcaption);               
        photosModal.append(figure);

        //console.log('dataId %o', dataTable)

//Fonction qui supprime le travail en cliquant sur le logo delete
        deleteProject.addEventListener('click', function () {
            deleteWork(id);
            //figure.remove();
            //retirerElement(dataTable);
            
        })
        
    })  
         
}

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


