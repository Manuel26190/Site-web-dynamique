//Envoi du formulaire Login

// Je cible le formulaire dans la page HTML
const form = document.querySelector('#myForm');

// Évènement au "submit" du formulaire de connexion
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Récupération des champs du formulaire nécessaire pour la requête API
    let adminInfo = {
        email: form.elements.email.value,
        password: form.elements.password.value
    };
    

    // Requête POST asynchrone à l'API Swagger avec les informations nécessaire pour l'identification
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: 'post',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(adminInfo)
    });
    // Ce qu'il se passe si la requête envoyer a l'API est du statut 200 : D'abord récuperer les données reçues par l'API au format JSON
    if (response.ok) {
        const data = await response.json();        

        // Enregistrement du Token dans le local storage afin de pouvoir s'en servir pour la suite du Projet
        sessionStorage.setItem('token', data.token);        

        // Rediriger l'utilisateur sur la page d'accueil
        window.location.href = 'index.html'   
        
    } else { // Si requête négatif (statut autre que 200), envoyer un message d'alerte sur l'écran
        //alert("Erreur dans l’identifiant ou le mot de passe");
        const erreur = document.querySelector('#erreur');        
        erreur.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
        erreur.appendChild('myForm');
    } 
    event.stopPropagation();        
});



