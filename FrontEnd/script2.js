
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


    


let token = sessionStorage.getItem("token");


fetch('http://localhost:5678/api/works', {
        method: "POST",
        body: formData,
               
    })
    .then(res => res.json())
    .then(res => console.log(res));

 