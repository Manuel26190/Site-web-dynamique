

const imageUrl = document.getElementById('input-file')
const title = document.getElementById('photoTitle')    
const select = document.getElementById('categoryList')

const btnValidModal2 = document.getElementById('btnValider');


title.addEventListener("input", () => {
    CheckForm()
})

function CheckForm (){
    if ( title.value !== "") {
        btnValidModal2.disabled = false;
    } else {
        btnValidModal2.disabled = true;
    }
};
CheckForm(); 




const formEl = document.getElementById('pictureForm');

formEl.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!title || !imageUrl || !select) {
        alert("Veuillez remplir toutles les champs du fomrulaire.");
        return;
    }

    const formData = new FormData(formEl);
    const data = new URLSearchParams(formData);
    let dataObj = Object.fromEntries(formData);
    let apiObj = {
        "id": 0,
        "title": "Bar New-York",
        "imageUrl": "string",
        "categoryId": "Objets",
        "userId": 0
      };

    for (let entry of data) {
        console.log(entry);
    }

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': 'bearer' + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(apiObj)
    }).then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));      
});

//function qui upload l'image et la fait apparaître dans la modale

const inputFile = document.getElementById('input-file');

inputFile.onchange = function (){

    const profilePicture = document.getElementById('profilePicture');    
    const labelFile = document.getElementById('labelFile');
    const imgSize = document.getElementById('imgSize');

    profilePicture.src = URL.createObjectURL(inputFile.files[0])
    profilePicture.style.width = '129px'; 
    profilePicture.style.height = '169px';
    //profilePicture.style.marginTop ='28px'; 
    inputFile.innerHTML = "";          
    labelFile.innerHTML = "";    
    imgSize.innerHTML = "";
};