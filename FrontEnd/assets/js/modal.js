// Sélection des éléments de la modale
const modal = document.getElementById("myModal");
const btnModifier = document.getElementById("btnModifier");
const closeModal = document.getElementsByClassName("close")[0];
const galleryView = document.getElementById("galleryView");
const addPhotoView = document.getElementById("addPhotoView");
const btnAddPhoto = document.getElementById("btnAddPhoto");
const btnValidate = document.getElementById("btnValidate");
const backArrow = document.getElementById("backArrow");

// API URL
const apiUrl = 'http://localhost:5678/api/works';



// Gestion de l'aperçu de la photo
// Afficher l’aperçu de l’image et cacher l’icône et le texte lorsque la photo est sélectionnée
const photoPreviewContainer = document.getElementById('photoPreviewContainer');
const photoPreviewText = document.getElementById('photoPreviewText');
const photoPreview = document.getElementById('photoPreview');
const photoUpload = document.getElementById('photoUpload');
const iconPreview = document.getElementById('iconPreview');
const infoText = document.getElementById('infoText');
const errorMessage = document.createElement('p'); // Pour afficher un message d'erreur
errorMessage.style.color = 'red';
photoPreviewContainer.appendChild(errorMessage);

photoPreviewContainer.addEventListener('click', () => {
  photoUpload.click(); // Ouvre le sélecteur de fichiers
});

photoUpload.addEventListener('change', function() {
  const file = this.files[0];
  const validTypes = ['image/jpeg', 'image/png']; // Types acceptés
  const maxSize = 4 * 1024 * 1024; // Taille maximale en octets (4 Mo)

  if (file) {
    // Vérifier le type de fichier
    if (!validTypes.includes(file.type)) {
      showError('Le format de l’image est invalide. Seuls les fichiers JPG et PNG sont acceptés.');
      //errorMessage.textContent = 'Veuillez sélectionner une image au format JPG ou PNG.';
      //resetPreview();
      resetPhotoPreview()

      return;
    }

    // Vérifier la taille du fichier
    if (file.size > maxSize) {
      showError('La taille de l’image dépasse 4 Mo. Veuillez choisir une image plus petite.');
      //errorMessage.textContent = 'La taille de l’image ne doit pas dépasser 4 Mo.';
      //resetPreview();
      resetPhotoPreview()
      return;
    }

    // Si tout est valide, on lit l'image
    const reader = new FileReader();
    reader.onload = function(event) {
      errorMessage.textContent = ''; // On efface le message d'erreur
      photoPreviewText.style.display = 'none'; // Masque le texte
      iconPreview.style.display = 'none'; // Masque l'icône
      infoText.style.display = 'none'; // Masque le Texte (jpg, png : 4mo max)
      photoPreview.style.display = 'block'; // Affiche l'aperçu
      photoPreview.src = event.target.result; // Affiche l'image sélectionnée
    };
    reader.readAsDataURL(file); // Lit l'image
  }
});
/*
function resetPreview() {
  photoPreviewText.style.display = 'block'; // Réaffiche le texte
  iconPreview.style.display = 'block'; // Réaffiche l'icône
  infoText.style.display = 'block'; // Réaffiche l'info texte
  photoPreview.style.display = 'none'; // Cache l'aperçu
  photoPreview.src = ''; // Réinitialise l'aperçu
}
*/

/*
// Gestion de l'aperçu de la photo
// Afficher l’aperçu de l’image et cacher l’icône et le texte lorsque la photo est sélectionnée
const photoPreviewContainer = document.getElementById('photoPreviewContainer');
const photoPreviewText = document.getElementById('photoPreviewText');
const photoPreview = document.getElementById('photoPreview');
const photoUpload = document.getElementById('photoUpload');
const iconPreview = document.getElementById('iconPreview');
const infoText = document.getElementById('infoText');

photoPreviewContainer.addEventListener('click', () => {
  photoUpload.click(); // Ouvre le sélecteur de fichiers
});

photoUpload.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      photoPreviewText.style.display = 'none'; // Masque le texte
      iconPreview.style.display = 'none'; // Masque l'icône
      infoText.style.display = 'none'; // Masque le Texte (jpg, png : 4mo max)
      photoPreview.style.display = 'block'; // Affiche l'aperçu
      photoPreview.src = event.target.result; // Affiche l'image sélectionnée
    };
    reader.readAsDataURL(file); // Lit l'image
  }
});
*/



// Appel à l'API pour récupérer les catégories dans la modal
async function loadCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Si un token est nécessaire
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories');
        }

        // Récupérer les données de l'API
        const categories = await response.json();

        // Sélecteur de catégorie dans la vue "Ajout photo"
        const categorySelect = document.getElementById('photoCategory');

        // Vider le contenu précédent
        categorySelect.innerHTML = '<option value="">Sélectionner une catégorie</option>';

        // Injecter chaque catégorie dans le select
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option); // Ajoute chaque catégorie
        });
    } catch (error) {
        console.error('Erreur lors du chargement des catégories :', error);
    }
}


// Fonction pour ouvrir la vue "Ajout photo" pour modifier une image existante
function openEditView(photoId, title, category) {
    // Affiche la vue "Ajout photo"
    galleryView.style.display = 'none';
    addPhotoView.style.display = 'flex';
  
    // Pré-remplir les champs avec les informations actuelles de la photo
    document.getElementById('photoTitle').value = title;
    document.getElementById('photoCategory').value = category;
    console.log(title);
    console.log(category);
}
  
// Fonction pour réinitialiser l'aperçu des photos après la validation
function resetPhotoPreview() {
    // Masquer l'image et afficher à nouveau l'icône et le texte
    photoPreview.style.display = 'none';
    photoPreview.src = ''; // Réinitialiser la source de l'image
    iconPreview.style.display = 'block'; // Réafficher l'icône
    photoPreviewText.style.display = 'flex'; // Réafficher le texte
    infoText.style.display = 'block'
    photoUpload.value = ''; // Réinitialiser l'input de fichier
    }
    

// Validation Vue 2 de la modale //
btnValidate.addEventListener('click', async (event) => {
    event.preventDefault(); // Empêcher le comportement par défaut du bouton

    // Récupérer les données du formulaire
    const fileInput = document.getElementById('photoUpload');
    const titleInput = document.getElementById('photoTitle');
    const categorySelect = document.getElementById('photoCategory');

    const file = fileInput.files[0];
    const title = titleInput.value;
    const categoryId = categorySelect.value;

    // Vérifier que tous les champs nécessaires sont remplis
    if (!file || !title || !categoryId) {
        showError('Veuillez remplir tous les champs et sélectionner une photo');
        return;
    }

    // Créer un objet FormData pour envoyer les données multipart/form-data
    const formData = new FormData();
    formData.append('image', file); // Fichier de la photo
    formData.append('title', title); // Titre de la photo
    formData.append('category', categoryId); // ID de la catégorie

    try {
        // Envoyer les données à l'API works
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Si nécessaire
            },
            body: formData // Envoyer les données avec FormData
        });

        if (response.ok) {
            const result = await response.json();
            showSuccess('Photo ajoutée avec succès');
            // Optionnel : mettre à jour la galerie après l'ajout
            loadGallery();

            // Fermer la modale ou effectuer d'autres actions après la validation
            //modal.style.display = 'none';
            
            if (typeof window.fetchWorks === 'function') {
                window.fetchWorks(); // Appel de la fonction
            } else {
                showError('La fonction fetchWorks n\'existe pas.');
            }

            // Réinitialiser le formulaire et revenir à la première vue
            resetForm();
        } else {
            throw new Error('Erreur lors de l\'ajout de la photo');
        }
    } catch (error) {
        showError('Une erreur est survenue lors de l\'ajout de la photo');
        console.error('Erreur lors de l\'envoi des données à l\'API :', error);
    }

    
});



function resetForm() {
    // Réinitialiser les champs du formulaire
    document.getElementById('photoUpload').value = '';
    document.getElementById('photoTitle').value = '';
    document.getElementById('photoCategory').value = '';

    // Réinitialiser l'aperçu de la photo si nécessaire
    const photoPreview = document.getElementById('photoPreview');
    photoPreview.src = '';
    photoPreview.style.display = 'none';
    document.getElementById('photoPreviewText').style.display = 'block';

    // Revenir à la première vue (Galerie photo)
    document.getElementById('addPhotoView').style.display = 'none';
    document.getElementById('galleryView').style.display = 'flex';
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
    }, 3000);
  }
  
  // Fonction pour afficher une erreur
  function showError(message) {
    showNotification(message, 'error');
  }
  
  // Fonction pour afficher un succès
  function showSuccess(message) {
    showNotification(message, 'success');
  }
  
  // Fonction pour supprimer une photo avec autorisation (Bearer token)
  async function deletePhoto(photoId) {
    const token = localStorage.getItem('authToken');
  
    // Vérification si le token est présent
    if (!token) {
      showError("Vous n'êtes pas authentifié. Veuillez vous connecter.");
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      // Vérifie si la réponse est OK
      if (response.ok) {
        showSuccess('Photo supprimée avec succès');
        loadGallery(); // Recharge la galerie
  
        if (typeof window.fetchWorks === 'function') {
          window.fetchWorks();
        } else {
          showError('Impossible de recharger les travaux, la fonction fetchWorks est introuvable.');
        }
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Une erreur est survenue lors de la suppression.');
      }
    } catch (error) {
      showError(`Erreur lors de la suppression : ${error.message}`);
    }
  }





// Charger la galerie photo lorsque la modale est ouverte
btnModifier.addEventListener('click', (event) => {
    event.preventDefault(); // Empêche la redirection par défaut du lien
    modal.style.display = 'flex';
    loadGallery()
    loadCategories(); // Charge les catégories dynamiquement
});



// Activer le scroll lorsque l’utilisateur survole la zone d’images et le désactiver lorsqu’il quitte cette zone.
const photoGallery = document.getElementById('photoGallery');

// Ajoute un événement pour activer le scroll au survol de la zone d'images
photoGallery.addEventListener('mouseenter', function() {
  photoGallery.style.overflowY = 'auto'; // Active le scroll
});

// Ajoute un événement pour désactiver le scroll lorsque l'utilisateur quitte la zone
photoGallery.addEventListener('mouseleave', function() {
  photoGallery.style.overflowY = 'hidden'; // Désactive le scroll
});



// Fermer la modale au clic sur la croix
closeModal.addEventListener('click', () => {
modal.style.display = 'none';
});


// Fermer la modale si l'utilisateur clique en dehors du contenu
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});  

  
  // Passer de la vue "Galerie photo" à la vue "Ajout photo"
  btnAddPhoto.addEventListener('click', () => {
    galleryView.style.display = 'none';
    addPhotoView.style.display = 'flex';
    // Réinitialiser le preview après validation
    resetPhotoPreview();
  });


// Retour à la galerie photo depuis la vue "Ajout photo"
backArrow.addEventListener('click', () => {
    addPhotoView.style.display = 'none';
    galleryView.style.display = 'flex';
    });
  


// Fonction async/await pour récupérer les images et les afficher dans la modale
async function loadGallery() {
    try{
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bear ${localStorage.getItem('authToken')}` // Token d'authentification si nécessaire
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des photos');
        }
        const data = await response.json();
        const photoGallery = document.getElementById('photoGallery');
        photoGallery.innerHTML = ''; // Vide la galerie avant de la remplir

        // Générer le HTML pour chaque photo et l'ajouter à la galerie
        data.forEach(photo => {
            // Crée l'élément HTML pour chaque photo
            const photoItem = document.createElement('div');
            photoItem.classList.add('photo-item');
    
            //Ajouter l'image et le titre
            photoItem.innerHTML = `
              <img src="${photo.imageUrl}" alt="${photo.title}" data-id="${photo.id}">
              <span class="delete-icon" data-id="${photo.id}"><i class="fa-solid fa-trash-can"></i></span>
              <!--<span class="delete-icon" data-id="${photo.id}">&times;</span>-->
            `;
            photoGallery.appendChild(photoItem);
    
            // Ajoute un listener pour cliquer sur l'image pour la modification
            const imgElement = photoItem.querySelector('img');
            imgElement.addEventListener('click', () => openEditView(photo.id, photo.title, photo.category));
    
            // Ajoute un listener pour cliquer sur l'icône de suppression
            const deleteIcon = photoItem.querySelector('.delete-icon');
            deleteIcon.addEventListener('click', (event) => {
              event.stopPropagation(); // Empêche l'activation de l'édition quand on clique sur l'icône
              deletePhoto(photo.id);
            });
        });

    } catch (error) {
        console.error('Erruer lors du chargement des photos :', error);
    }
};
