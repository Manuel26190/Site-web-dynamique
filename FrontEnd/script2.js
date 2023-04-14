
const formElem = document.getElementById('pictureForm');


formElem.onsubmit = async (e) => {
    e.preventDefault();
    
    let token = sessionStorage.getItem('token', token);
    console.log(token);

    let response = await fetch(urlApi, {
      method: 'POST',
      body: new FormData(formElem),
      headers: { 
        Authorization: "Bearer " + token,        
      }
      
    });

    let result = await response.json();

    alert(result.message);
  };




/*

const pictureForm2 = document.getElementById('pictureForm');

pictureForm2.addEventListener('submit', function (e) {
    e.preventDefault();

    let formData = new FormData(pictureForm2);

    const fileUpload = formData.get('upload');
    const title = formData.get('title');    
    const category = formData.get('categorylist');


//console.log('formdata', formData);
});

*/
/*
async function fetchUsers (token = sessionStorage.getItem("token")) {

    const formData = new FormData(pictureForm);

    //formData.append('image', inputFile.files[0], inputFile.name);
    formData.append('title', photoTitle.value);
    formData.append('category', categoryList.value);
    
    
    const res = Object.fromEntries(formData);//permet de transformer une liste de paires de clés/valeurs en un objet.
    const payload = JSON.stringify(res);
    //console.log('payload %o',payload);

    console.log(token);

    for (item of formData) {
        //console.log( item[0], item[1]);
    }
*/

/*

    const r = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token,
            "Accept": "apllication/json",
            "Content-Type": "multipart/form-data"
        },
    })
    
    if (r.ok === true) {
        return r.json();         
    }
    throw new Error('impossible de contacter le serveur')
}

fetchUsers().then(users => console.log(users))



pictureForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    SendWork();
    verif_form();           
});  

const SendWork = (token = sessionStorage.getItem("token")) => {
    const formData = new FormData(pictureForm);

    formData.append('image', inputFile.files[0], inputFile.name);
    formData.append('title', photoTitle.value);
    formData.append('category', categoryList.value);
    
    
    const res = Object.fromEntries(formData);//permet de transformer une liste de paires de clés/valeurs en un objet.
    const payload = JSON.stringify(res);
    //console.log('payload %o',payload);

    console.log(token);

    for (item of formData) {
        //console.log( item[0], item[1]);
    }

    
};

*/

    




 