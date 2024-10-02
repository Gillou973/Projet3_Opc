document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si un token est présent dans le localStorage
    const token = localStorage.getItem('authToken');

    const authLink = document.getElementById('auth-link'); // Lien de connexion/déconnexion
    const editButton = document.getElementById('btnModifier'); // Bouton "Modifier"
    const categoriesMenu = document.querySelector('.categories-menu'); // Menu de catégories
    const editModeBanner = document.getElementById('edit-mode-banner'); // Bandeau noir "Mode édition"
    const headerPaddingTop = document.querySelector('header'); 

    if (token) {
        // Si un token est présent (utilisateur connecté), afficher le bouton "Modifier", le bandeau noir et masquer les filtres de catégories
        authLink.innerHTML = '<a href="#" onclick="logout()">Logout</a>';
        editButton.style.display = 'inline-block'; // Afficher le bouton "Modifier"
        categoriesMenu.style.display = 'none'; // Masquer les filtres de catégories
        editModeBanner.style.display = 'block'; // Afficher le bandeau "Mode édition"
    } else {
        // Si aucun token (utilisateur non connecté), masquer le bouton "Modifier" et afficher les filtres de catégories
        authLink.innerHTML = '<a href="login.html">Login</a>';
        editButton.style.display = 'none'; // Cacher le bouton "Modifier"
        categoriesMenu.style.display = 'block'; // Afficher les filtres de catégories
        editModeBanner.style.display = 'none'; // Cacher le bandeau "Mode édition"
        headerPaddingTop.style.paddingTop = '0px';
    }
});

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('authToken'); // Supprimer le token du localStorage
    window.location.href = 'index.html'; // Rediriger vers la page de connexion
}