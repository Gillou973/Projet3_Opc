// URL de l'API des travaux et des catégories
const worksApiUrl = 'http://localhost:5678/api/works';
const categoriesApiUrl = 'http://localhost:5678/api/categories';
/*
// Fonction dans galerie.js
function fetchWorks() {
    // Logique pour charger la galerie principale
    console.log('Galerie principale chargée');
  }
  // Assure-toi que la fonction est accessible globalement
  window.fetchWorks = fetchWorks;
*/

let allWorks = []; // Variable pour stocker tous les travaux récupérés de l'API

// Fonction pour récupérer tous les travaux de l'API
async function fetchWorks() {
    try {
        const response = await fetch(worksApiUrl);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des travaux');
        }
        allWorks = await response.json(); // Stocker les travaux récupérés
        displayWorks(allWorks); // Afficher tous les travaux par défaut
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour afficher les travaux dans la galerie
function displayWorks(works) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Vider la galerie avant de la remplir dynamiquement

    works.forEach(work => {
        // Créer un élément figure
        const figure = document.createElement('figure');

        // Créer l'image
        const img = document.createElement('img');
        img.src = work.imageUrl; // Utiliser l'URL de l'image depuis l'API
        img.alt = work.title; // Utiliser le titre pour l'attribut alt
        figure.appendChild(img);

        // Ajouter la légende (figcaption)
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title; // Utiliser le titre de l'API
        figure.appendChild(figcaption);

        // Ajouter la figure à la galerie
        gallery.appendChild(figure);
    });
}

// Fonction pour récupérer les catégories de l'API
async function fetchCategories() {
    try {
        const response = await fetch(categoriesApiUrl);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des catégories');
        }
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour afficher les catégories sous forme de menu
function displayCategories(categories) {
    const portfolioSection = document.querySelector('#portfolio');
    const categoriesMenu = document.createElement('div');
    categoriesMenu.classList.add('categories-menu');

    // Ajouter un bouton "Tous" pour afficher tous les travaux
    const allButton = document.createElement('button');
    allButton.textContent = 'Tous';
    allButton.addEventListener('click', () => filterWorksByCategory(null)); // Afficher tous les travaux au clic
    categoriesMenu.appendChild(allButton);

    // Créer un bouton pour chaque catégorie
    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.addEventListener('click', () => filterWorksByCategory(category.id)); // Filtrer par catégorie localement
        categoriesMenu.appendChild(button);
    });

    // Vérifier si l'utilisateur est connecté et masquer les filtres si nécessaire
    const token = localStorage.getItem('authToken');
    if (token) {
        categoriesMenu.style.display = 'none'; // Masquer les filtres si l'utilisateur est connecté
    }

    // Insérer le menu de catégories avant la galerie
    portfolioSection.insertBefore(categoriesMenu, document.querySelector('.gallery'));
}

// Fonction pour filtrer les travaux par catégorie localement
function filterWorksByCategory(categoryId) {
    const filteredWorks = categoryId ? allWorks.filter(work => work.categoryId === categoryId) : allWorks;
    displayWorks(filteredWorks); // Afficher les travaux filtrés
}

// Appeler les fonctions pour charger les travaux et les catégories lorsque la page se charge
document.addEventListener('DOMContentLoaded', () => {
    fetchWorks(); // Charger tous les travaux par défaut
    fetchCategories(); // Charger les catégories
});