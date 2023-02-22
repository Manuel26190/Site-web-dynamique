
const figure2 = document.querySelector('.figure2');
const figure3 = document.querySelector('.figure3');
const figure4 = document.querySelector('.figure4');
const figure5 = document.querySelector('.figure5');
const figure6 = document.querySelector('.figure6');
const figure7 = document.querySelector('.figure7');
const figure8 = document.querySelector('.figure8');
const figure9 = document.querySelector('.figure9');
const figure10 = document.querySelector('.figure10');
const figure11 = document.querySelector('.figure11');

const figure = document.querySelector('.figure1')

fetch('http://localhost:5678/api/works')
.then ((response) => response.json())
.then ((data) => {
         
    const img1 = document.createElement("img");
    img1.innerHTML = img1.src = data[0].imageUrl;
    figure.appendChild(img1);  
    
    const img2 = document.createElement("img");
    img2.innerHTML = img2.src = data[1].imageUrl;
    figure2.appendChild(img2);
    

    const img3 = document.createElement("img");
    img3.src = data[2].imageUrl;
    figure3.appendChild(img3);

    const img4 = document.createElement("img");
    img4.src = data[3].imageUrl;
    figure4.appendChild(img4);

    const img5 = document.createElement("img");
    img5.src = data[4].imageUrl;
    figure5.appendChild(img5);

    const img6 = document.createElement("img");
    img6.src = data[5].imageUrl;
    figure6.appendChild(img6);

    const img7 = document.createElement("img");
    img7.src = data[6].imageUrl;
    figure7.appendChild(img7);

    const img8 = document.createElement("img");
    img8.src = data[7].imageUrl;
    figure8.appendChild(img8);

    const img9 = document.createElement("img");
    img9.src = data[8].imageUrl;
    figure9.appendChild(img9);

    const img10 = document.createElement("img");
    img10.src = data[9].imageUrl;
    figure10.appendChild(img10);

    const img11 = document.createElement("img");
    img11.src = data[10].imageUrl;
    figure11.appendChild(img11);

    

    
} )


    