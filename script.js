// Gestion du panier
const panierDiv = document.getElementById("panier");
const boutonOuvrir = document.getElementById("ouvrirPanier");
const boutonFermer = document.getElementById("fermerPanier");
const contenuPanier = document.getElementById("contenuPanier");
const totalPrix = document.getElementById("totalPrix");
const messagePanier = document.getElementById("message-panier"); 

// Liste pour stocker les articles ajoutés au panier
var panier = {};

// Fonction pour afficher le panier
function afficherPanier() {
    contenuPanier.innerHTML = ""; 
    var total = 0;

    // Parcours des articles du panier
    for (var produit in panier) {
        const { prix, quantite, image } = panier[produit];
        total += prix * quantite;

        // Créer un élément pour chaque produit
        const produitElement = document.createElement("div");
        produitElement.classList.add("article-panier");
        produitElement.innerHTML = `
            <img src="${image}" alt="${produit}" class="image-panier" />
            <div class="details-produit">
                <p><strong>${produit}</strong></p>
                <p>${prix} MAD x ${quantite}</p>
                <div>
                    <button class="btn-augmenter" data-produit="${produit}">+</button>
                    <button class="btn-diminuer" data-produit="${produit}">-</button>
                </div>
            </div>
        `;
        contenuPanier.appendChild(produitElement);
    }

    totalPrix.textContent = `Total : ${total} MAD`;
}

// Ajouter un produit au panier
const iconesAjouter = document.getElementsByClassName("icon-ajouter");

// Ajouter l'événement pour chaque icône
for (let i = 0; i < iconesAjouter.length; i++) {
    iconesAjouter[i].addEventListener("click", function(e) {
        const produit = e.target.dataset.produit;
        const prix = parseFloat(e.target.dataset.prix);
        const image = e.target.dataset.image;

        // Ajouter ou mettre à jour le produit dans le panier
        if (panier[produit]) {
            panier[produit].quantite += 1;
        } else {
            panier[produit] = { prix: prix, quantite: 1, image: image };
        }

        afficherPanier(); 

        // Afficher la notification après avoir ajouté le produit
        messagePanier.style.display = "block";
        setTimeout(function() {
            messagePanier.style.display = "none";
        }, 2000);
    });
}

// Ajouter des événements pour augmenter ou diminuer la quantité
contenuPanier.addEventListener("click", function(e) {
    // Si le bouton "augmenter" est cliqué
    if (e.target.classList.contains("btn-augmenter")) {
        const produit = e.target.dataset.produit;
        panier[produit].quantite += 1;
        afficherPanier();
    }

    // Si le bouton "diminuer" est cliqué
    if (e.target.classList.contains("btn-diminuer")) {
        const produit = e.target.dataset.produit;
        if (panier[produit].quantite > 1) {
            panier[produit].quantite -= 1;
        } else {
            delete panier[produit];
        }
        afficherPanier();
    }
});

// Fonction pour gérer le scroll et ajuster la position du panier
function gererScroll() {
    const scrollPosition = window.scrollY;
    panierDiv.style.top = (scrollPosition + 10) + "px";
}

// Ajouter l'événement scroll
window.addEventListener("scroll", gererScroll);

// Ouvrir le panier
function ouvrirPanier() {
    panierDiv.classList.add("visible");
}

// Fermer le panier
function fermerPanier() {
    console.log("Bouton fermer cliqué");
    panierDiv.classList.remove("visible");
}

// Ajouter les événements pour ouvrir et fermer le panier
boutonOuvrir.addEventListener("click", ouvrirPanier);
boutonFermer.addEventListener("click", fermerPanier);
