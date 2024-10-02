const headerPaddingTop = document.querySelector('header');
headerPaddingTop.style.paddingTop = '0px';


// Ajout d'un écouteur pour gérer la soumission du formulaire
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Appel API pour l'authentification
    const response = await loginApiCall(email, password);
    //return console.log(response);

    if (response.success) {

        showSuccess('Connexion réussie !');
        // Afficher un message de succès
        document.getElementById('message').textContent = 'Connexion réussie !';
        document.getElementById('message').style.color = 'green';

        // Sauvegarder le token si nécessaire et rediriger
        localStorage.setItem('authToken', response.token); // Stocker le token d'authentification
        setTimeout(function() {
            //window.location.href = "index.html";
            window.location.href = 'index.html'; // Redirection vers une autre page
        }, 1500);
        //window.location.href = 'index.html'; // Redirection vers une autre page
    } else {
        // Afficher un message d'erreur si l'authentification échoue
        document.getElementById('loginError').style.display = 'block';
    }
});

// Fonction pour faire l'appel à l'API d'authentification
async function loginApiCall(email, password) {
    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la connexion');
        }

        const data = await response.json();
        return { success: true, token: data.token }; // Retourner le token si succès
    } catch (error) {
        console.error('Erreur:', error);
        return { success: false }; // Retourner un succès faux en cas d'échec
    }
}



// Ajoute une fonction JavaScript pour afficher et masquer les notifications.
function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    
    // Créer l'élément notification
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Ajout de l'animation d'affichage
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
  
    // Retirer la notification après 3 secondes
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        container.removeChild(notification);
      }, 300);
    }, 1000);
  }
  
  // Fonction pour afficher une erreur
  function showError(message) {
    showNotification(message, 'error');
  }
  
  // Fonction pour afficher un succès
  function showSuccess(message) {
    showNotification(message, 'success');
  }
