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
